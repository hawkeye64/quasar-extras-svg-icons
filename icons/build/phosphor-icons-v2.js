const packageName = "phosphor-icons";
const packagePath = "../../packages/phosphor-icons";
const distName = "phosphor-icons-v2";
const iconSetName = "Phosphor Icons";
const prefix = "pp";
const iconPath = "core/assets";
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

const svgFolder = resolve(__dirname, `${packagePath}/${iconPath}/`);

const subfolders = [
  {
    name: "bold",
    alt: "",
  },
  {
    name: "duotone",
    alt: "",
  },
  {
    name: "fill",
    alt: "",
  },
  {
    name: "light",
    alt: "",
  },
  {
    name: "regular",
    alt: "",
  },
  {
    name: "thin",
    alt: "",
  },
];

subfolders.forEach((folder) => {
  const dir = resolve(svgFolder, folder.name);
  console.log(dir);
  const svgFiles = glob.sync(dir + svgPath);

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
      console.error(err);
      skipped.push(name);
    }
  });
});

const { version } = require(join(packagePath, "package.json"));
writeExports(
  iconSetName,
  version,
  distFolder,
  svgExports,
  typeExports,
  skipped
);

copySync(
  resolve(__dirname, `${packagePath}/LICENSE`),
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
