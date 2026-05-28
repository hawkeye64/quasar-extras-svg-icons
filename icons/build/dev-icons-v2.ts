import {
  defaultNameMapper,
  extractSvg,
  getDirname,
  join,
  mkdirSync,
  readFileSync,
  resolve,
  writeExports,
  writeFileSync,
} from "./utils/index.js";

const __dirname = getDirname(import.meta.url);

const packageName = "devicons";
const distName = "dev-icons-v2";
const iconSetName = "Devicons";
const prefix = "dev";

// ------------

const start = Date.now();

const skipped: string[] = [];
const distFolder = resolve(__dirname, `../${distName}`);
mkdirSync(distFolder, { recursive: true });

const spritePath = resolve(__dirname, `../node_modules/${packageName}/dist/sprite-symbol.svg`);
const spriteContent = readFileSync(spritePath, "utf8");
const iconNames = new Set<string>();

const svgExports: string[] = [];
const typeExports: string[] = [];

function stylesFilter(strAttributes: string) {
  return strAttributes.replace(/fill:#444444;/, "fill:currentColor;");
}

for (const match of spriteContent.matchAll(/<symbol\b([^>]*)>(.*?)<\/symbol>/g)) {
  const [, attrs, innerContent] = match;
  const id = attrs.match(/\bid="([^"]+)"/)?.[1];

  if (!id) {
    continue;
  }

  const name = defaultNameMapper(`${id}.svg`, prefix);

  if (iconNames.has(name)) {
    continue;
  }

  try {
    const svgContent = `<svg ${attrs}>${innerContent}</svg>`;
    const { svgDef, typeDef } = extractSvg(svgContent, name, { stylesFilter });
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
}

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped);

// write the JSON file
const file = resolve(__dirname, join("..", distName, "icons.json"));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

const end = Date.now();

console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`);

if (process.send) {
  process.send({ distName, iconNames: [...iconNames], time: end - start });
}
