const xmldom = require("@xmldom/xmldom");
const Parser = new xmldom.DOMParser();
const { optimize } = require("svgo");

const { resolve, basename } = require("path");
const { readFileSync, writeFileSync } = require("fs");

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

function chunkArray(arr, size = 2) {
  const results = [];
  while (arr.length) {
    results.push(arr.splice(0, size));
  }
  return results;
}

function calcValue(val, base) {
  return /%$/.test(val) ? (val.replace("%", "") * 100) / base : +val;
}

function getAttributes(el, list) {
  const att = {};

  list.forEach((name) => {
    att[name] = parseFloat(el.getAttribute(name) || 0);
  });

  return att;
}

function getCurvePath(x, y, rx, ry) {
  return `A${rx},${ry},0,0,1,${x},${y}`;
}

const decoders = {
  svg(el) {
    // Nothing here. This is needed to grab any attributes on svg tag..
  },

  path(el) {
    const points = el.getAttribute("d").trim();
    // return points
    return (points.charAt(0) === "m" ? "M0 0z" : "") + points;
  },

  circle(el) {
    const att = getAttributes(el, ["cx", "cy", "r"]);
    if (!att.cx) att.cx = 0;
    if (!att.cy) att.cy = 0;
    return `M${att.cx} ${att.cy} m-${att.r}, 0 a${att.r},${att.r} 0 1,0 ${
      att.r * 2
    },0 a${att.r},${att.r} 0 1,0 ${att.r * -2},0`;
  },

  ellipse(el) {
    const att = getAttributes(el, ["cx", "cy", "rx", "ry"]);
    if (!att.cx) att.cx = 0;
    if (!att.cy) att.cy = 0;
    return (
      "M" +
      (att.cx - att.rx) +
      "," +
      att.cy +
      "a" +
      att.rx +
      "," +
      att.ry +
      " 0 1,0 " +
      2 * att.rx +
      ",0" +
      "a" +
      att.rx +
      "," +
      att.ry +
      " 0 1,0" +
      -2 * att.rx +
      ",0Z"
    );
  },

  polygon(el) {
    return this.polyline(el) + "z";
  },

  polyline(el) {
    const points = el.getAttribute("points");
    const pointsArray = points
      .replace(/  /g, " ")
      .trim()
      .split(/\s+|,/)
      .reduce((arr, point) => {
        return [...arr, ...(point.includes(",") ? point.split(",") : [point])];
      }, []);

    const pairs = chunkArray(pointsArray, 2);
    return pairs
      .map(([x, y], i) => {
        return `${i === 0 ? "M" : "L"}${x} ${y}`;
      })
      .join(" ");
  },

  rect(el) {
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

  line(el) {
    const att = getAttributes(el, ["x1", "x2", "y1", "y2"]);
    Object.keys(att).forEach((key) => {
      if (isNaN(att[key])) att[key] = 0;
    });
    return "M" + att.x1 + "," + att.y1 + "L" + att.x2 + "," + att.y2;
  },
};

function getAttributesAsStyle(el) {
  const exceptions = [
    "d",
    "style",
    "width",
    "height",
    "rx",
    "ry",
    "r",
    "x",
    "y",
    "x1",
    "y1",
    "x2",
    "y2",
    "cx",
    "cy",
    "points",
    "class",
    "xmlns",
    "xmlns:xlink",
    "viewBox",
    "id",
    "name",
    "transform",
    "data-name",
    "aria-hidden",
    "aria-label",
    "clip-path",
    "xml:space",
    "id",
    "version",
    "enable-background",
    "mask",
    "focusable",
    "baseProfile",
    "aria-labelledby",
    "role",
    "xmlns:dc",
    "xmlns:svg",
    "xmlns:cc",
    "xmlns:rdf",
    "xmlns:sodipodi",
    "xmlns:inkscape",
    "inkscape:version",
    "sodipodi:docname",
    "inkscape:connector-curvature",
    "data-tags",
    "data-du",
    "sodipodi:nodetypes",
  ];
  let styleString = "";
  for (let i = 0; i < el.attributes.length; ++i) {
    const attr = el.attributes[i];
    if (exceptions.includes(attr.nodeName) !== true) {
      styleString += `${attr.nodeName}:${attr.nodeValue};`;
    }
  }
  return styleString;
}

function getRecursiveAttributes(el) {
  let attributes = "";
  if (el.parentNode?.attributes) {
    attributes += getRecursiveAttributes(el.parentNode);
  }

  attributes += getAttributesAsStyle(el);

  return attributes;
}

function getRecursiveTransforms(el) {
  let transforms = "";
  if (el.parentNode?.attributes) {
    transforms += getRecursiveTransforms(el.parentNode);
  }

  transforms += el.getAttribute("transform");

  return transforms;
}

function parseDom(name, el, pathsDefinitions, options) {
  const type = el.nodeName;

  if (el.getAttribute === void 0 || el.getAttribute("opacity") === "0") {
    return;
  }

  if (typeExceptions.includes(type) === false) {
    if (decoders[type] === void 0) {
      // throw new Error(`Encountered unsupported tag type: "${type}"`)
      console.error(`Encountered unsupported tag type: "${type}" in ${name}`);
      return;
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
    // ths is common because of the inheritance of 'fill:none' from an 'svg' tag
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

function getWidthHeightAsViewbox(el) {
  const att = getAttributes(el, ["width", "height"]);
  if (att.width && att.height) {
    return `0 0 ${att.width} ${att.height}`;
  }
  return "";
}

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
  } catch (err) {
    console.error(`[Error] "${name}" could not be parsed:`, err);
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
        return (
          def.path +
          (def.style ? `@@${def.style}` : def.transform ? "@@" : "") +
          (def.transform ? `@@${def.transform}` : "")
        );
      })
      .join("&&");
  }

  return result;
}

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

module.exports.extract = (filePath, name, options) => {
  const content = readFileSync(filePath, "utf-8");

  return extractSvg(content, name, options);
};

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

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

module.exports.sleep = sleep;

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
