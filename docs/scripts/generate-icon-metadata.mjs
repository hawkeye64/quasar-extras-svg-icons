import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(scriptDir, "..");
const repoRoot = resolve(docsDir, "..");
const iconsDir = join(repoRoot, "icons");
const outputFile = join(docsDir, "src/utils/icon-set-metadata.ts");

const prefixesByFolder = {
  "akar-icons": ["akar"],
  "ant-design-icons": ["antOutlined", "antFilled", "antTwoTone"],
  "box-icons": ["bx", "bxl", "bxs"],
  "brand-icons": ["brnd"],
  "brandico-icons": ["brico"],
  "bytesize-icons": ["byte"],
  "carbon-icons": ["carbon"],
  "carbon-icons-v11": ["carbon"],
  "carbon-pictograms": ["carpic"],
  "carbon-pictograms-v12": ["carpic"],
  "clarity-icons": ["clarity"],
  "clarity-icons-v6": ["clarity"],
  codicons: ["codi"],
  "cool-icons": ["cool"],
  "cool-icons-v4": ["cool"],
  "coreui-icons": ["cui", "cib", "cif"],
  "coreui-icons-v3": ["cui", "cib", "cif"],
  "country-flag-icons": ["flag"],
  dashicons: ["dash"],
  "dev-icons": ["dev"],
  "drip-icons": ["drip"],
  "elusive-icons": ["eli"],
  "entypo-icons": ["entypo"],
  "evil-icons": ["ei"],
  "feather-icons": ["feather"],
  "flat-color-icons": ["fci"],
  "flatui-icons": ["flat"],
  "fluentui-system-icons": ["fui"],
  "fontisto-icons": ["fontisto"],
  "foundation-icons": ["fi"],
  "geom-icons": ["geom"],
  "gitlab-icons": ["gitlab"],
  "gitlab-icons-v3": ["gitlab"],
  "glyphs-brands": ["glyphsBrandsThin", "glyphsBrandsSolid"],
  "glyphs-core-icons": [
    "glyphsCoreBold",
    "glyphsCoreDuo",
    "glyphsCoreOutline",
    "glyphsCoreThin",
    "glyphsCorePoly",
  ],
  "grid-icons": ["gridicons"],
  "health-icons": ["healthFilled", "healthOutline"],
  "health-icons-v1": ["healthFilled", "healthOutline"],
  "health-icons-v2": ["healthFilled", "healthOutline"],
  "hero-icons": ["heroOutline", "heroSolid"],
  "hero-icons-v2": ["heroOutline24", "heroSolid20", "heroSolid24"],
  "icomoon-free-icons": ["icomoonFree"],
  "iconoir-icons-v5": ["ico"],
  "iconoir-icons-v6": ["ico"],
  "iconoir-icons-v7": ["icoRegular", "icoSolid"],
  "iconpark-icons": ["ip"],
  ikonate: ["ikonate"],
  ikons: ["ikons"],
  "jam-icons": ["jam"],
  "keyrune-icons": ["keyrune"],
  "linear-icons": ["lnr"],
  linecons: ["line"],
  "maki-icons": ["maki"],
  "maki-icons-v8": ["maki"],
  "map-icons": ["map"],
  "material-icon-theme-v5": ["matTheme"],
  "material-line-icons": ["matLine"],
  "material-line-icons-v1": ["matLine"],
  "material-theme-icons": ["mti"],
  "material-theme-icons-v3": ["mti"],
  "modern-icons": ["modern"],
  "oct-icons-v17": ["oct"],
  "oct-icons-v18": ["oct"],
  "oct-icons-v19": ["oct"],
  "open-iconic": ["oi"],
  "openmoji-icons": ["omc"],
  "openmoji-icons-v14": ["omc"],
  "openmoji-icons-v15": ["omc"],
  "phosphor-icons": ["pp"],
  "phosphor-icons-v2": ["pp"],
  "pixelart-icons": ["pix"],
  "polaris-icons-v9": ["pol"],
  "prime-icons": ["prime"],
  "prime-icons-v6": ["prime"],
  "prime-icons-v7": ["prime"],
  "radix-ui-icons": ["radix"],
  "remix-icons": ["rem"],
  "remix-icons-v3": ["rem"],
  "remix-icons-v4": ["rem"],
  "simple-icons-v12": ["sim"],
  "simple-icons-v13": ["sim"],
  "simple-icons-v14": ["sim"],
  "simple-icons-v15": ["sim"],
  "simple-line-icons": ["sli"],
  "stroke7-icons": ["strk7"],
  "subway-icons": ["sub"],
  "system-uicons": ["sui"],
  "tabler-icons": ["tab", "tabBrand"],
  "tabler-icons-v2": ["tab", "tabBrand"],
  "tabler-icons-v3": ["tabFilled", "tabOutline"],
  "teeny-icons": ["teenyOutline", "teenySolid"],
  "typ-icons": ["typ"],
  "uiw-icons": ["uiw"],
  unicons: ["uni", "uniLine", "uniSolid", "uniThin"],
  "vaadin-icons": ["vaadin"],
  "vaadin-icons-v23": ["vaadin"],
  "vaadin-icons-v24": ["vaadin"],
  "weather-icons": ["wi"],
  "webfont-medical-icons": ["wmed"],
  "windows-icons": ["appbar"],
  "zond-icons": ["zond"],
};

function getHeader(content) {
  return content.match(/^\/\*\s*(.*?)\s*\*\//)?.[1]?.trim() ?? "Unknown Icon Set v0.0.0";
}

function parseNameAndVersion(header) {
  const match = header.match(/^(.*?)\s+v([^v]+)$/);

  if (match) {
    return {
      name: match[1]?.trim() ?? header,
      version: match[2]?.trim() ?? "0.0.0",
    };
  }

  return {
    name: header,
    version: "0.0.0",
  };
}

function getExportNames(content) {
  return [...content.matchAll(/export declare const ([A-Za-z0-9_]+)/g)]
    .map((match) => match[1])
    .filter((name) => name !== undefined);
}

function inferPrefixes(exportNames) {
  return [
    ...new Set(exportNames.map((exportName) => exportName.match(/^[a-z]+/)?.[0]).filter(Boolean)),
  ].sort();
}

function getIconFolders() {
  return readdirSync(iconsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(iconsDir, entry.name, "index.d.ts")))
    .map((entry) => entry.name)
    .sort();
}

function buildMetadata(folder) {
  const content = readFileSync(join(iconsDir, folder, "index.d.ts"), "utf8");
  const { name, version } = parseNameAndVersion(getHeader(content));
  const exportNames = getExportNames(content);

  return {
    folder,
    iconCount: exportNames.length,
    importPath: `quasar-extras-svg-icons/${folder}`,
    name,
    prefixes: prefixesByFolder[folder] ?? inferPrefixes(exportNames),
    selectLabel: `${name} (${version})`,
    version,
  };
}

function quote(value) {
  return JSON.stringify(value);
}

function renderStringArray(values) {
  const items = values.map(quote);
  const inline = `[${items.join(", ")}]`;

  if (inline.length <= 72) {
    return inline;
  }

  return `[\n${items.map((item) => `      ${item},`).join("\n")}\n    ]`;
}

function renderMetadataRow(row) {
  return `  {
    folder: ${quote(row.folder)},
    iconCount: ${row.iconCount},
    importPath: ${quote(row.importPath)},
    name: ${quote(row.name)},
    prefixes: ${renderStringArray(row.prefixes)},
    selectLabel: ${quote(row.selectLabel)},
    version: ${quote(row.version)},
  }`;
}

const metadata = getIconFolders()
  .map(buildMetadata)
  .sort((a, b) => a.name.localeCompare(b.name) || b.version.localeCompare(a.version));

const file = `export type IconSetMetadata = {
  folder: string;
  iconCount: number;
  importPath: string;
  name: string;
  prefixes: string[];
  selectLabel: string;
  version: string;
};

// Generated by docs/scripts/generate-icon-metadata.mjs. Do not edit by hand.
export const iconSetMetadata = [
${metadata.map(renderMetadataRow).join(",\n")},
] satisfies IconSetMetadata[];
`;

writeFileSync(outputFile, file, "utf8");
console.log(`Generated ${metadata.length} icon-set metadata rows.`);
