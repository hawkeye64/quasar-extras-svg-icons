import {
  copySync,
  defaultNameMapper,
  extractSvg,
  getDirname,
  join,
  mkdirSync,
  readFileSync,
  resolve,
  writeExports,
  writeFileSync,
} from "./utils/index.js";

const __dirname = getDirname(import.meta.url);

const packageName = "@vaadin/icons";
const distName = "vaadin-icons-v25";
const iconSetName = "Vaadin Icons v25";
const prefix = "vaadin";

// ------------

const nameRegex = /(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/;
const start = Date.now();

const skipped: string[] = [];
const distFolder = resolve(__dirname, `../${distName}`);
mkdirSync(distFolder, { recursive: true });

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/`);
const svgFile = readFileSync(svgFolder + "/vaadin-iconset.js", "utf8");
const svgFiles = svgFile.split("\n");
const iconNames = new Set<string>();

const svgExports: string[] = [];
const typeExports: string[] = [];

function filterName(name: string) {
  return name.replace("vaadin:", "");
}

svgFiles.forEach((line: string) => {
  if (line.startsWith('<g id="')) {
    const svgName = line.match(nameRegex)?.[0];

    if (svgName === void 0) {
      return;
    }

    // build the svg
    const content = '<svg viewBox="0 0 16 16">' + line + "</svg>";

    // create the name
    const name = defaultNameMapper(svgName, prefix, { filterName });

    if (iconNames.has(name)) {
      return;
    }

    try {
      const { svgDef, typeDef } = extractSvg(content, name);
      svgExports.push(svgDef);
      typeExports.push(typeDef);

      iconNames.add(name);
    } catch (err) {
      console.error(
        `[Error] "${name}" could not be parsed:`,
        err instanceof Error ? err.message : String(err),
      );
      skipped.push(name);
    }
  }
});

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped);

copySync(
  resolve(__dirname, `../node_modules/${packageName}/LICENSE`),
  resolve(__dirname, `../${distName}/LICENSE.md`),
);

// write the JSON file
const file = resolve(__dirname, join("..", distName, "icons.json"));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

const end = Date.now();

console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`);

if (process.send) {
  process.send({ distName, iconNames: [...iconNames], time: end - start });
}
