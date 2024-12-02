const packageName = "@uiw/icons";
const packagePath = "../../packages/uiw-icons";
const distName = "uiw-icons";
const iconSetName = "UIW Icons";
const prefix = "uiw";
const iconPath = "icon";
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

const svgFolder = resolve(__dirname, join(packagePath, iconPath));
const svgFiles = tinyglobby.globSync(svgFolder + svgPath);
const iconNames = new Set();

const svgExports = [];
const typeExports = [];

const piePreFilters = [
  {
    from: /<use fill="#555" xlink:href="#pie-chart-a"\/>/,
    to: "",
  },
  {
    from: /id="pie-chart-a"/,
    to: 'style="fill:currentColor"',
  },
  {
    from: /<defs>/,
    to: "",
  },
  {
    from: /<\/defs>/,
    to: "",
  },
];

const preFilters = [
  {
    from: /#555/,
    to: "currentColor",
  },
];

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix);

  if (iconNames.has(name)) {
    return;
  }

  try {
    const { svgDef, typeDef } = extract(
      file,
      name,
      name === "uiwPieChart" ? { preFilters: piePreFilters } : { preFilters }
    );
    svgExports.push(svgDef);
    typeExports.push(typeDef);

    iconNames.add(name);
  } catch (err) {
    console.error(`[Error] "${name}" could not be parsed:`, err.message);
    skipped.push(name);
  }
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
