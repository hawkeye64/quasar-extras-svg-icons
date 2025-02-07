const xmldom = require("@xmldom/xmldom");
const { optimize } = require("svgo");
const { resolve, basename } = require("path");
const { readFileSync, writeFileSync } = require("fs");

const Parser = new xmldom.DOMParser();

const cjsReplaceRE = /export const /g;
const typeExceptions = [
  "g",
  "svg",
  "defs",
  "style",
  "title",
  "clipPath",
  "desc",
  "mask",
  "linearGradient",
  "radialGradient",
  "stop",
  "metadata",
  "sodipodi:namedview",
  "rdf:RDF",
  "cc:Work",
  "dc:title",
  "dc:type",
  "dc:format",
  "text",
  "animate",
  "switch",
];
const noChildren = ["clipPath"];

// Helper Functions
/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @param {Array} arr - The array to be chunked.
 * @param {number} [size=2] - The size of each chunk.
 * @returns {Array[]} - An array of chunked arrays.
 */
const chunkArray = (arr, size = 2) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

/**
 * Calculates a value based on a given base value.
 *
 * If the input value ends with a '%', it is treated as a percentage and the
 * value is calculated as a percentage of the base value. Otherwise, the input
 * value is returned as a number.
 *
 * @param {string} val - The input value to be calculated.
 * @param {number} base - The base value to use for percentage calculations.
 * @returns {number} - The calculated value.
 */
const calcValue = (val, base) =>
  /%$/.test(val) ? (parseFloat(val) * base) / 100 : +val;

/**
 * Retrieves the specified attributes from an HTML element and returns them as an object.
 *
 * @param {Element} el - The HTML element to retrieve the attributes from.
 * @param {string[]} list - The list of attribute names to retrieve.
 * @returns {Object} - An object containing the specified attributes and their values.
 */
const getAttributes = (el, list) =>
  list.reduce(
    (attrs, name) => ({
      ...attrs,
      [name]: parseFloat(el.getAttribute(name) || 0),
    }),
    {}
  );

/**
 * Recursively retrieves the attributes of an HTML element and its parent elements,
 * and returns them as a string of CSS-style attribute-value pairs.
 *
 * @param {Element} el - The HTML element to retrieve the attributes from.
 * @returns {string} - A string of CSS-style attribute-value pairs.
 */
const getRecursiveAttributes = (el) =>
  el.parentNode?.attributes
    ? `${getRecursiveAttributes(el.parentNode)}${getAttributesAsStyle(el)}`
    : getAttributesAsStyle(el);

/**
 * Retrieves the attributes of an HTML element as a string of CSS-style attribute-value pairs,
 * excluding certain predefined attributes.
 *
 * @param {Element} el - The HTML element to retrieve the attributes from.
 * @returns {string} - A string of CSS-style attribute-value pairs.
 */
const getAttributesAsStyle = (el) => {
  const exceptions = new Set([
    "aria-hidden",
    "aria-label",
    "aria-labelledby",
    "baseProfile",
    "class",
    "clip-path",
    "cx",
    "cy",
    "d",
    "data-du",
    "data-name",
    "data-tags",
    "enable-background",
    "focusable",
    "height",
    "id",
    "mask",
    "name",
    "points",
    "r",
    "role",
    "rx",
    "ry",
    "style",
    "transform",
    "version",
    "viewBox",
    "width",
    "x",
    "x1",
    "x2",
    "xml:space",
    "xmlns",
    "xmlns:xlink",
    "y",
    "y1",
    "y2",
  ]);

  return Array.from(el.attributes)
    .filter(({ namespaceURI }) => namespaceURI === null)
    .filter(({ nodeName }) => !exceptions.has(nodeName))
    .map(({ nodeName, nodeValue }) => `${nodeName}:${nodeValue};`)
    .join("");
};

/**
 * Recursively retrieves the transform attribute values from the given element and its parent elements.
 * @param {Element} el - The element to start the recursive search from.
 * @returns {string} - The concatenated transform attribute values from the element and its parent elements.
 */
const getRecursiveTransforms = (el) =>
  el.parentNode?.attributes
    ? `${getRecursiveTransforms(el.parentNode)}${
        el.getAttribute("transform") || ""
      }`
    : el.getAttribute("transform") || "";

// function getCurvePath(x, y, rx, ry) {
//   return `A${rx},${ry},0,0,1,${x},${y}`;
// }

// SVG Decoders
/**
 * An object containing functions to decode various SVG element types into path data.
 * These decoders are used to convert SVG elements into a standardized path format that can be rendered.
 */
const decoders = {
  svg: () => "", // Nothing here. This is needed to grab any attributes on svg tag..

  path: (el) => {
    const points = el.getAttribute("d")?.trim();
    if (!points) throw new Error("No points found in path");
    return points.startsWith("m") ? "M0 0z" + points : points;
  },

  circle: (el) => {
    const { cx = 0, cy = 0, r } = getAttributes(el, ["cx", "cy", "r"]);
    return `M${cx} ${cy} m-${r}, 0 a${r},${r} 0 1,0 ${
      r * 2
    },0 a${r},${r} 0 1,0 ${-r * 2},0`;
  },

  ellipse: (el) => {
    const {
      cx = 0,
      cy = 0,
      rx,
      ry,
    } = getAttributes(el, ["cx", "cy", "rx", "ry"]);
    return `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${
      2 * rx
    },0 a${rx},${ry} 0 1,0 ${-2 * rx},0Z`;
  },

  polygon: (el) => decoders.polyline(el) + "z",

  polyline: (el) => {
    const points = el.getAttribute("points") || "";
    const pairs = chunkArray(points.split(/[\s,]+/).filter(Boolean), 2);
    return pairs
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
      .join(" ");
  },

  rect: (el) => {
    const att = getAttributes(el, ["x", "y", "width", "height", "rx", "ry"]);
    const w = +att.width;
    const h = +att.height;
    const x = att.x ? +att.x : 0;
    const y = att.y ? +att.y : 0;
    let rx = att.rx || "auto";
    let ry = att.ry || "auto";
    if (rx === "auto" && ry === "auto") {
      rx = ry = 0;
    } else if (rx !== "auto" && ry === "auto") {
      rx = ry = calcValue(rx, w);
    } else if (ry !== "auto" && rx === "auto") {
      ry = rx = calcValue(ry, h);
    } else {
      rx = calcValue(rx, w);
      ry = calcValue(ry, h);
    }
    if (rx > w / 2) {
      rx = w / 2;
    }
    if (ry > h / 2) {
      ry = h / 2;
    }
    const hasCurves = rx > 0 && ry > 0;
    return [
      `M${x + rx} ${y}`,
      `H${x + w - rx}`,
      ...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x + w} ${y + ry}`] : []),
      `V${y + h - ry}`,
      ...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x + w - rx} ${y + h}`] : []),
      `H${x + rx}`,
      ...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x} ${y + h - ry}`] : []),
      `V${y + ry}`,
      ...(hasCurves ? [`A${rx} ${ry} 0 0 1 ${x + rx} ${y}`] : []),
      "z",
    ].join(" ");
  },

  line: (el) => {
    const {
      x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
    } = getAttributes(el, ["x1", "y1", "x2", "y2"]);
    return `M${x1},${y1}L${x2},${y2}`;
  },
};

/**
 * Parses the DOM of an SVG file and extracts paths, styles, and transformations.
 *
 * @param {string} name - The name of the SVG.
 * @param {HTMLElement} el - The root element of the SVG.
 * @param {Array} pathsDefinitions - An array to store the extracted paths, styles, and transformations.
 * @param {Object} options - Additional options for parsing.
 * @param {Array|Function} options.stylesFilter - Filters to apply to the styles of the SVG elements.
 * @param {Function} options.stylesFilter.from - The pattern to replace in the styles.
 * @param {Function} options.stylesFilter.to - The replacement pattern for the styles.
 * @param {Function} options.viewBoxFilter - A function to filter the viewBox attribute of the SVG.
 * @returns {void}
 */
function parseDom(name, el, pathsDefinitions, options) {
  const type = el.nodeName;

  if (el.getAttribute === void 0 || el.getAttribute("opacity") === "0") {
    return;
  }

  if (typeExceptions.includes(type) === false) {
    if (decoders[type] === void 0) {
      console.error(`Encountered unsupported tag: "${type}" in ${name}`);
      throw new Error(`Unsupported tag: "${type}" in ${name}`);
    }

    const style = el.getAttribute("style") || "";
    let strAttributes = (style + getRecursiveAttributes(el)).replace(
      /;;/g,
      ";"
    );

    // any styles filters?
    if (options?.stylesFilter) {
      if (
        Array.isArray(options.stylesFilter) &&
        options.stylesFilter.length > 0
      ) {
        options.stylesFilter.forEach((filter) => {
          strAttributes = strAttributes.replace(filter.from, filter.to);
        });
      } else if (typeof options.stylesFilter === "function") {
        strAttributes = options.stylesFilter(strAttributes);
      }
    }

    // This must come after filter function above
    // don't allow fill to be both 'none' and 'currentColor'
    // this is common because of the inheritance of 'fill:none' from an 'svg' tag
    if (
      strAttributes.indexOf("fill:none;") >= 0 &&
      strAttributes.indexOf("fill:currentColor;") >= 0
    ) {
      strAttributes = strAttributes.replace(/fill:none;/, "");
    }

    const arrAttributes = strAttributes.split(";");
    const combinedStyles = new Set(arrAttributes);

    const transform = getRecursiveTransforms(el);

    const paths = {
      path: decoders[type](el),
      style: Array.from(combinedStyles).join(";"),
      transform: transform,
    };

    if (paths.path.length > 0) {
      pathsDefinitions.push(paths);
    }
  }

  if (noChildren.includes(type) === false) {
    Array.from(el.childNodes).forEach((child) => {
      parseDom(name, child, pathsDefinitions, options);
    });
  }
}

/**
 * Generates a viewBox string from the width and height attributes of an SVG element.
 *
 * If the SVG element has both width and height attributes, this function will return a viewBox string in the format "0 0 {width} {height}".
 * If the SVG element is missing either the width or height attribute, this function will return an empty string.
 *
 * @param {Element} el - The SVG element to extract the width and height from.
 * @returns {string} The viewBox string, or an empty string if the width or height is missing.
 */
function getWidthHeightAsViewbox(el) {
  const att = getAttributes(el, ["width", "height"]);
  if (att.width && att.height) {
    return `0 0 ${att.width} ${att.height}`;
  }
  return "";
}

/**
 * Parses the content of an SVG file and extracts the path definitions, styles, and transforms.
 *
 * This function takes the name of the SVG file, the content of the SVG file, and optional options object. It returns an object with the following properties:
 *
 * - `viewBox`: The viewBox string of the SVG, or an empty string if the viewBox is not specified and the width and height attributes are missing.
 * - `paths`: A string containing the path definitions, styles, and transforms for the SVG.
 *
 * The function first parses the SVG content into a DOM document, then extracts the viewBox and calls the `parseDom` function to recursively parse the DOM and extract the path definitions, styles, and transforms. If any errors occur during parsing, the function will throw an error.
 *
 * @param {string} name - The name of the SVG file.
 * @param {string} content - The content of the SVG file.
 * @param {object} [options] - An optional options object.
 * @param {function} [options.viewBoxFilter] - A function that can be used to filter the viewBox string.
 * @returns {object} An object with the `viewBox` and `paths` properties.
 */
function parseSvgContent(name, content, options) {
  let viewBox;
  const pathsDefinitions = [];

  try {
    const dom = Parser.parseFromString(content, "text/xml");

    viewBox = dom.documentElement.getAttribute("viewBox");

    if (!viewBox) {
      // check if there is width and height
      viewBox = getWidthHeightAsViewbox(dom.documentElement);
    }

    if (
      viewBox &&
      options?.viewBoxFilter &&
      typeof options.viewBoxFilter === "function"
    ) {
      viewBox = options.viewBoxFilter(viewBox);
    }

    parseDom(name, dom.documentElement, pathsDefinitions, options);
    // console.log(content);
  } catch (err) {
    console.error(`[Error] "${name}" could not be parsed:`, err.message);
    // console.error(content);
    throw err;
  }

  if (pathsDefinitions.length === 0) {
    throw new Error(`Could not infer any paths for "${name}"`);
  }

  const tmpView = `|${viewBox}`;

  const result = {
    viewBox: viewBox !== "0 0 24 24" && tmpView !== "|" ? tmpView : "",
  };

  if (pathsDefinitions.every((def) => !def.style && !def.transform)) {
    result.paths = pathsDefinitions.map((def) => def.path).join("");
  } else {
    result.paths = pathsDefinitions
      .map((def) => {
        let stylePart = def.style ? `@@${def.style}` : ""; // Include style only if it is non-empty
        let transformPart = def.transform ? `@@${def.transform}` : ""; // Include transform only if it is non-empty

        // If style is empty but transform is not, we need a special case
        if (!def.style && def.transform) {
          stylePart = "@@"; // Empty style needs to output "@@" when transform exists
        }

        // Combine path with stylePart and transformPart
        return `${def.path}${stylePart}${transformPart}`;
      })
      .join("&&");
  }

  return result;
}

/**
 * Generates a banner string for an icon set with the specified name and version or package name.
 *
 * @param {string} iconSetName - The name of the icon set.
 * @param {string} versionOrPackageName - The version or package name of the icon set.
 * @returns {string} The generated banner string.
 */
function getBanner(iconSetName, versionOrPackageName) {
  const version =
    versionOrPackageName === "" || versionOrPackageName.match(/^\d/)
      ? versionOrPackageName === ""
        ? versionOrPackageName
        : "v" + versionOrPackageName
      : "v" +
        require(resolve(
          __dirname,
          `../../node_modules/${versionOrPackageName}/package.json`
        )).version;

  return `/* ${iconSetName} ${version} */\n\n`;
}

/**
 * Generates a name for an SVG icon based on the file path and options.
 *
 * @param {string} filePath - The file path of the SVG icon.
 * @param {string} [prefix] - An optional prefix to prepend to the icon name.
 * @param {object} [options] - An optional object with options for name generation.
 * @param {function} [options.filterName] - A function to filter the icon name.
 * @returns {string} The generated icon name.
 */
module.exports.defaultNameMapper = (filePath, prefix, options) => {
  let baseName = basename(filePath, ".svg");

  if (baseName.endsWith(" ")) {
    console.log(baseName + " ends with space");
    baseName = baseName.trim();
  }

  if (options?.filterName && typeof options.filterName === "function") {
    baseName = options.filterName(baseName);
  }

  let name = ((prefix ? prefix + "-" : "") + baseName)
    .replace(/_|%|\+|\./g, "-")
    .replace(/\s|-{2,}/g, "-")
    .replace(/(-\w)/g, (m) => m[1].toUpperCase());
  if (
    name.charAt(name.length - 1) === "-" ||
    name.charAt(name.length - 1) === " "
  ) {
    name = name.slice(0, name.length - 1);
  }
  return name;
};

/**
 * Extracts and optimizes SVG content from a file.
 *
 * This function performs the following tasks:
 * - Cleans up the SVG content by removing unnecessary whitespace and newline characters.
 * - Removes the DOCTYPE declaration, which can cause issues with the XML parser.
 * - Applies any pre-filters specified in the `options` object to the SVG content.
 * - Checks if the icon is excluded from optimization based on the `options.excluded` list.
 * - Optimizes the SVG content using the `parseSvgContent` function.
 * - Applies any post-filters specified in the `options` object to the optimized SVG paths.
 * - Returns an object containing the optimized SVG definition and type definition.
 *
 * @param {string} content - The SVG content to be extracted and optimized.
 * @param {string} name - The name of the SVG icon.
 * @param {object} [options] - An optional object with options for the extraction and optimization process.
 * @param {function|object[]} [options.preFilters] - A function or an array of objects with `from` and `to` properties to apply as pre-filters.
 * @param {string[]} [options.excluded] - An array of icon names to exclude from optimization.
 * @param {function|object[]} [options.postFilters] - A function or an array of objects with `from` and `to` properties to apply as post-filters.
 * @returns {object} An object containing the optimized SVG definition and type definition.
 */
function extractSvg(content, name, options = {}) {
  // Why is it some SVG has something like this? 'height="2""' - a pain!
  // Fix it up for the parser. Seems to be an Icomoon/Inkscape issue.
  // Another found: '<rect" x="14"'
  content = content
    .replace(/"2""/g, '"2"')
    .replace(/ "/g, '"')
    .replace(/rect" /g, "rect ");

  // any svg preFilters?
  if (options?.preFilters) {
    if (typeof options.preFilters === "function") {
      content = options.preFilters(name, content);
    } else if (options.preFilters.length > 0) {
      options.preFilters.forEach((filter) => {
        content = content.replace(filter.from, filter.to);
      });
    }
  }

  // any excluded icons from SVGO?
  let isExcluded = false;
  if (options?.excluded && options.excluded.length > 0) {
    isExcluded = options.excluded.includes(name);
  }

  let result;
  // if (!isExcluded) {
  //   const { data } = optimize(content, {
  //     plugins: [
  //       {
  //         name: 'preset-default',
  //         params: {
  //           overrides: {
  //             removeViewBox: false
  //           }
  //         }
  //       }
  //     ]
  //   })
  //   result = data
  // }

  const optimizedSvgContent = result || content;
  const { paths, viewBox } = parseSvgContent(
    name,
    optimizedSvgContent,
    options
  );
  let paths2 = paths;
  // any svg postFilters?
  if (options?.postFilters) {
    if (Array.isArray(options.postFilters) && options.postFilters.length > 0) {
      options.postFilters.forEach((filter) => {
        paths2 = paths2.replace(filter.from, filter.to);
      });
    } else if (typeof options.postFilters === "function") {
      paths2 = options.postFilters(paths2);
    }
  }

  const path = paths2
    .replace(/[\r\n]+/gi, ",")
    .replace(/\s+/g, " ") // multiple whitespace with 1 space
    // .replace(/\t/g, ' ')
    .replace(/,,/gi, ",")
    .replace(/, /gi, " ")
    .replace(/ z/g, "z")
    .replace(/fill:none;fill:currentColor;/g, "fill:currentColor;");

  return {
    svgDef: `export const ${name} = '${path}${viewBox}'`,
    typeDef: `export declare const ${name}: string;`,
  };
}

module.exports.extractSvg = extractSvg;

/**
 * Extracts SVG content from a file and performs cleanup on the SVG.
 *
 * @param {string} filePath - The file path of the SVG file.
 * @param {string} name - The name of the SVG icon.
 * @param {object} options - Additional options for processing the SVG.
 * @returns {object} - An object containing the SVG definition and type definition.
 */
module.exports.extract = (filePath, name, options) => {
  let content = readFileSync(filePath, "utf-8");

  // clean up SVG a bit by removing unnecessary whitespace and newline characters
  content = content.replace(/\n+/g, "\n").replace(/\s+/g, " ").trim();

  // With xmldom 0.9.5 the parsing is stricter and many
  // iconsets have malformed DOCTYPE if done with Illustrator
  content = content.replace(/<!DOCTYPE[^>]*>/g, "");

  return extractSvg(content, name, options);
};

/**
 * Writes the exported SVG and type definitions to the specified distribution folder.
 *
 * @param {string} iconSetName - The name of the icon set.
 * @param {string} versionOrPackageName - The version or package name of the icon set.
 * @param {string} distFolder - The distribution folder path.
 * @param {string[]} svgExports - The array of SVG exports.
 * @param {string[]} typeExports - The array of type exports.
 * @param {string[]} skipped - The array of skipped icons.
 */
module.exports.writeExports = (
  iconSetName,
  versionOrPackageName,
  distFolder,
  svgExports,
  typeExports,
  skipped
) => {
  if (svgExports.length === 0) {
    console.log(`WARNING. ${iconSetName} skipped completely`);
  } else {
    const banner = getBanner(iconSetName, versionOrPackageName);
    const distIndex = `${distFolder}/index`;

    const content = banner + svgExports.sort().join("\n");

    writeFileSync(
      `${distIndex}.js`,
      content.replace(cjsReplaceRE, "module.exports."),
      "utf-8"
    );
    writeFileSync(`${distIndex}.mjs`, content, "utf-8");
    writeFileSync(
      `${distIndex}.d.ts`,
      banner + typeExports.sort().join("\n"),
      "utf-8"
    );

    if (skipped.length > 0) {
      console.log(`${iconSetName} - skipped (${skipped.length}): ${skipped}`);
    }
  }
};

/**
 * Waits for the specified delay in milliseconds.
 *
 * @param {number} [delay=0] - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

module.exports.sleep = sleep;

/**
 * Waits until a specified test function returns a predicate that evaluates to true, or the maximum number of tries is reached.
 *
 * @param {Object} test - An object with `predicate` and `result` properties. The `predicate` function should return a boolean indicating whether the test has passed.
 * @param {Object} [options] - Options for the wait operation.
 * @param {number} [options.delay=5000] - The delay in milliseconds between each try.
 * @param {number} [options.tries=-1] - The maximum number of tries. If set to -1, it will try indefinitely.
 * @returns {Promise<any>} The result of the successful test.
 * @throws {Error} If the maximum number of tries is reached without the test passing.
 */
const waitUntil = async (test, options = {}) => {
  const { delay = 5e3, tries = -1 } = options;
  const { predicate, result } = await test();

  if (predicate) {
    return result;
  }

  if (tries - 1 === 0) {
    throw new Error("tries limit reached");
  }

  await sleep(delay);
  return waitUntil(test, { ...options, tries: tries > 0 ? tries - 1 : tries });
};

module.exports.waitUntil = waitUntil;

/**
 * Retries a function a specified number of times, catching and handling any errors that occur.
 *
 * @param {Function} tryFunction - The function to be retried.
 * @param {Object} [options] - Options for the retry operation.
 * @param {number} [options.retries=3] - The maximum number of times to retry the function.
 * @returns {Promise<any>} The result of the successful function call.
 * @throws {Error} If the maximum number of retries is reached without a successful function call.
 */
const retry = async (tryFunction, options = {}) => {
  const { retries = 3 } = options;

  let tries = 0;
  let output = null;
  let exitErr = null;

  const bail = (err) => {
    exitErr = err;
  };

  while (tries < retries) {
    tries += 1;
    try {
      // eslint-disable-next-line no-await-in-loop
      output = await tryFunction({ tries, bail });
      break;
    } catch (err) {
      if (tries >= retries) {
        throw err;
      }
    }
  }

  if (exitErr) {
    throw exitErr;
  }

  return output;
};

module.exports.retry = retry;

/**
 * A queue that processes tasks concurrently, with the ability to retry failed tasks.
 *
 * The `Queue` class manages a queue of tasks and processes them concurrently, up to a specified concurrency limit. If a task fails, it can be retried a specified number of times. The class also provides a `wait` method that allows the caller to wait for all tasks to complete.
 *
 * @class Queue
 * @param {Function} worker - The function that will be called to process each task.
 * @param {Object} [options] - Options for the queue.
 * @param {number} [options.concurrency=1] - The maximum number of tasks to process concurrently.
 */
class Queue {
  pendingEntries = [];

  inFlight = 0;

  err = null;

  constructor(worker, options = {}) {
    this.worker = worker;
    this.concurrency = options.concurrency || 1;
  }

  push = (entries) => {
    this.pendingEntries = this.pendingEntries.concat(entries);
    this.process();
  };

  process = () => {
    const scheduled = this.pendingEntries.splice(
      0,
      this.concurrency - this.inFlight
    );
    this.inFlight += scheduled.length;
    scheduled.forEach(async (task) => {
      try {
        await this.worker(task);
      } catch (err) {
        this.err = err;
      } finally {
        this.inFlight -= 1;
      }

      if (this.pendingEntries.length > 0) {
        this.process();
      }
    });
  };

  wait = (options = {}) =>
    waitUntil(
      () => {
        if (this.err) {
          this.pendingEntries = [];
          throw this.err;
        }

        return {
          predicate: options.empty
            ? this.inFlight === 0 && this.pendingEntries.length === 0
            : this.concurrency > this.pendingEntries.length,
        };
      },
      {
        delay: 50,
      }
    );
}

module.exports.Queue = Queue;
