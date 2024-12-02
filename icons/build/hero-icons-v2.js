const packageName = "heroicons";
const distName = "hero-icons-v2";
const iconSetName = "Hero Icons";
const prefix = "hero";
const iconPath = "";
const svgPath = "/*.svg";

// ------------

const tinyglobby = require("tinyglobby");
const { writeFileSync } = require("fs");
const { copySync } = require("fs-extra");
const { resolve, join } = require("path");

const start = new Date();

const skipped = [];
const distFolder = resolve(__dirname, `../${distName}`);
const { defaultNameMapper, extract, writeExports } = require("./utils");

const iconNames = new Set();

const svgExports = [];
const typeExports = [];

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/`);

const subfolders = [
  {
    name: "20",
  },
  {
    name: "24",
  },
];

const subfolders2 = [
  {
    name: "outline",
    alt: "Outline",
  },
  {
    name: "solid",
    alt: "Solid",
  },
];

const svgFiles = [];

subfolders.forEach((folder) => {
  subfolders2.forEach((folder2) => {
    const dir = resolve(svgFolder, folder.name, folder2.name);
    const svgFiles = tinyglobby.globSync(dir + svgPath);

    svgFiles.forEach((file) => {
      const name = defaultNameMapper(file, prefix + folder2.alt + folder.name);

      if (iconNames.has(name)) {
        return;
      }

      try {
        const { svgDef, typeDef } = extract(file, name);
        svgExports.push(svgDef);
        typeExports.push(typeDef);

        iconNames.add(name);
      } catch (err) {
        console.error(`[Error] "${name}" could not be parsed:`, err.message);
        skipped.push(name);
      }
    });
  });
});

writeExports(
  iconSetName,
  packageName,
  distFolder,
  svgExports,
  typeExports,
  skipped
);

copySync(
  resolve(__dirname, `../node_modules/${packageName}/LICENSE`),
  resolve(__dirname, `../${distName}/LICENSE.md`)
);

// write the JSON file
const file = resolve(__dirname, join("..", distName, "icons.json"));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

const end = new Date();

console.log(
  `${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`
);

process.send &&
  process.send({ distName, iconNames: [...iconNames], time: end - start });
