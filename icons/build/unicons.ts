import {
  copySync,
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

const packageName = "@iconscout/unicons";
const distName = "unicons";
const iconSetName = "Unicons";
const prefix = "uni";
const iconPath = "svg";
const svgPath = "/*.svg";
// const license = 'https://github.com/atisawd/boxicons#License'

// ------------

const start = Date.now();

const skipped: string[] = [];
const distFolder = resolve(__dirname, `../${distName}`);

const iconNames = new Set<string>();

const svgExports: string[] = [];
const typeExports: string[] = [];

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`);
const subfolders = [
  {
    name: "line",
    alt: "",
  },
  {
    name: "solid",
    alt: "Solid",
  },
  {
    name: "thinline",
    alt: "Thin",
  },
];
// const folders = tinyglobby.globSync(svgFolder + '/*')

subfolders.forEach((folder) => {
  const svgFiles: string[] = tinyglobby.globSync(svgFolder + "/" + folder.name + svgPath);

  svgFiles.forEach((file) => {
    const name = defaultNameMapper(file, prefix + folder.alt);

    if (iconNames.has(name)) {
      return;
    }

    try {
      const { svgDef, typeDef } = extract(file, name);
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
