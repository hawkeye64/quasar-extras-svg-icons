import {
  defaultNameMapper,
  extract,
  getDirname,
  join,
  resolve,
  tinyglobby,
  writeExports,
  writeFileSync,
} from "./utils/index.js";

const __dirname = getDirname(import.meta.url);

const packageName = "coolicons";
const distName = "cool-icons-v4";
const iconSetName = "Cool Icons";
const prefix = "cool";
const iconPath = "coolicons SVG";
const svgPath = "/**/*.svg";
const version = "4.1";

// ------------

const start = Date.now();

const skipped: string[] = [];
const distFolder = resolve(__dirname, `../${distName}`);

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`);
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath);
const iconNames = new Set<string>();

const svgExports: string[] = [];
const typeExports: string[] = [];

const stylesFilter = [
  {
    from: "fill:none;fill:black;",
    to: "fill:currentColor;",
  },
];

svgFiles.forEach((file) => {
  let name = defaultNameMapper(file, prefix);

  if (iconNames.has(name)) {
    return;
  }

  if (name.endsWith("-")) {
    name = name.replace("-", "");
  }

  try {
    const { svgDef, typeDef } = extract(file, name, { stylesFilter });
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
});

writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped);

// copySync(
//   resolve(__dirname, `../node_modules/${packageName}/LICENSE`),
//   resolve(__dirname, `../${distName}/LICENSE.md`)
// )

// write the JSON file
const file = resolve(__dirname, join("..", distName, "icons.json"));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

const end = Date.now();

console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`);

if (process.send) {
  process.send({ distName, iconNames: [...iconNames], time: end - start });
}
