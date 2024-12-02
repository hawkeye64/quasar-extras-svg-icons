const packageName = "@coreui/icons";
const distName = "coreui-icons-v3";
const iconSetName = "CoreUI Icons";
const prefix = "";
const iconPath = "/svg";
const svgPath = "/*.svg";
// const license = 'https://github.com/atisawd/boxicons#License'

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

const svgFolder = resolve(
  __dirname,
  `../node_modules/${packageName}/${iconPath}/`
);
const subfolders = [
  {
    name: "free",
    alt: "",
  },
  {
    name: "brand",
    alt: "Brand",
  },
  {
    name: "flag",
    alt: "Flag",
  },
];
// const folders = tinyglobby.globSync(svgFolder + '/*')

subfolders.forEach((folder) => {
  const svgFiles = tinyglobby.globSync(svgFolder + "/" + folder.name + svgPath);

  svgFiles.forEach((file) => {
    const name = defaultNameMapper(file, prefix /* + folder.alt */);

    if (iconNames.has(name)) {
      return;
    }

    try {
      const { svgDef, typeDef } = extract(file, name);
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

// copySync(
//   resolve(__dirname, `../node_modules/${ packageName }/LICENSE`),
//   resolve(__dirname, `../${ distName }/LICENSE.md`)
// )

// write the JSON file
const file = resolve(__dirname, join("..", distName, "icons.json"));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

const end = new Date();

console.log(
  `${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`
);

process.send &&
  process.send({ distName, iconNames: [...iconNames], time: end - start });
