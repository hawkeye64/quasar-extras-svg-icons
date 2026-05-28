import {
  copySync,
  defaultNameMapper,
  extract,
  getDirname,
  join,
  readFileSync,
  resolve,
  tinyglobby,
  writeExports,
  writeFileSync,
} from "./utils/index.js";

const __dirname = getDirname(import.meta.url);

const packagePath = "../../packages/healthicons";
const distName = "health-icons-v2";
const iconSetName = "Health Icons";
const prefix = "health";
const iconPath = "/public/icons/svg";
const svgPath = "/**/*.svg";

// ------------

const start = Date.now();

const skipped: string[] = [];
const distFolder = resolve(__dirname, `../${distName}`);

const iconNames = new Set<string>();

const svgExports: string[] = [];
const typeExports: string[] = [];

const myFilters = [
  {
    from: /#[3]{3,6}/g,
    to: "currentColor",
  },
  {
    from: /white/g,
    to: "none",
  },
];

function preFilters(name: string, content: string) {
  // See: https://github.com/hawkeye64/quasar-extras-svg-icons/issues/16
  myFilters.forEach((filter) => {
    content = content.replace(filter.from, filter.to);
  });

  return content;
}

const svgFolder = resolve(__dirname, `${packagePath}/${iconPath}/`);
const subfolders = [
  {
    name: "filled",
    alt: "Filled",
  },
  {
    name: "negative",
    alt: "Negative",
  },
  {
    name: "outline",
    alt: "Outline",
  },
];

function filterName(name: string) {
  if (name === "!") {
    // found in 'typography' folder
    // there's already a 'quastion_mark'
    // so  we'll follow that convention
    return "exclamation_mark";
  }
  return name;
}

subfolders.forEach((folder) => {
  const dir = resolve(svgFolder, folder.name);
  const svgFiles: string[] = tinyglobby.globSync(dir + svgPath);

  svgFiles.forEach((file) => {
    const name = defaultNameMapper(file, prefix + folder.alt, { filterName });

    if (iconNames.has(name)) {
      return;
    }

    try {
      const { svgDef, typeDef } = extract(file, name, { preFilters });
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

const { version } = JSON.parse(
  readFileSync(resolve(__dirname, packagePath, "package.json"), "utf-8"),
) as {
  version: string;
};
writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped);

copySync(
  resolve(__dirname, `${packagePath}/LICENSE`),
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
