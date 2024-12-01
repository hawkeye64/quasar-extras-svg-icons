const packageName = "@tabler/icons";
const distName = "tabler-icons-v3";
const iconSetName = "Tabler Icons";
const prefix = "tab";
const iconPath = "icons";
const svgPath = "/*.svg";

// ------------

const glob = require("glob");
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

const svgFolder = resolve(
  __dirname,
  `../node_modules/${packageName}/${iconPath}/`
);

const subfolders = [
  {
    name: "filled",
    alt: "Filled",
  },
  {
    name: "outline",
    alt: "Outline",
  },
];

const postFilters = [
  {
    from: "M0 0z",
    to: "",
  },
];

subfolders.forEach((folder) => {
  const dir = resolve(svgFolder, folder.name);
  const svgFiles = glob.sync(dir + svgPath);

  svgFiles.forEach((file) => {
    const name = defaultNameMapper(file, prefix + folder.alt);

    if (iconNames.has(name)) {
      return;
    }

    try {
      const { svgDef, typeDef } = extract(file, name, { postFilters });
      svgExports.push(svgDef);
      typeExports.push(typeDef);

      iconNames.add(name);
    } catch (err) {
      console.error(err);
      skipped.push(name);
    }
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
