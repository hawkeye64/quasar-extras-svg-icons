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

const packageName = "pixeden-stroke-7-icon";
const distName = "stroke7-icons";
const iconSetName = "Stroke 7 Icons (Pixeden)";
const prefix = "strk7";
const iconPath = "/pe-icon-7-stroke/svg";
const svgPath = "/*.svg";

// ------------

const start = Date.now();

const skipped: string[] = [];
const distFolder = resolve(__dirname, `../${distName}`);

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`);
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath);
const iconNames = new Set<string>();

const svgExports: string[] = [];
const typeExports: string[] = [];

function stylesFilter(strAttributes: string) {
  strAttributes = strAttributes.replace(/fill:#000000/g, "fill:currentColor;");
  return strAttributes;
}

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix);

  if (iconNames.has(name)) {
    return;
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

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped);

// copySync(
//   resolve(__dirname, `../node_modules/${ packageName }/LICENSE.md`),
//   resolve(__dirname, `../${ distName }/LICENSE.md`)
// )

// write the JSON file
const file = resolve(__dirname, join("..", distName, "icons.json"));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

const end = Date.now();

console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`);

if (process.send) {
  process.send({ distName, iconNames: [...iconNames], time: end - start });
}
