const packageName = "line-md";
const distName = "material-line-icons-v1";
const iconSetName = "Material Line Icons";
const prefix = "matLine";
const iconPath = "svg";
const svgPath = "/*.svg";

// ------------

const glob = require("glob");
const { writeFileSync } = require("fs");
const { copySync } = require("fs-extra");
const { resolve, join } = require("path");

const start = new Date();

const excluded = ["matLineLoadingAltLoop"];
const skipped = [];
const distFolder = resolve(__dirname, `../${distName}`);
const { defaultNameMapper, extract, writeExports } = require("./utils");

const svgFolder = resolve(
  __dirname,
  `../node_modules/${packageName}/${iconPath}/`
);
const svgFiles = glob.sync(svgFolder + svgPath);
const iconNames = new Set();

const svgExports = [];
const typeExports = [];

const stylesFilter = [
  {
    from: /stroke-dasharray:\d+;/g,
    to: "",
  },
  {
    from: /stroke-dashoffset:\d+;/g,
    to: "",
  },
  {
    from: "fill-opacity:0",
    to: "fill-opacity:0.18",
  },
];

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix);

  if (iconNames.has(name)) {
    return;
  }

  if (excluded.includes(name)) {
    skipped.push(name);
    return;
  }

  try {
    const { svgDef, typeDef } = extract(file, name, { stylesFilter });
    svgExports.push(svgDef);
    typeExports.push(typeDef);

    iconNames.add(name);
  } catch (err) {
    console.error(err);
    skipped.push(name);
  }
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
  resolve(__dirname, `../node_modules/${packageName}/license.txt`),
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
