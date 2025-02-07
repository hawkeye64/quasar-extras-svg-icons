const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const baseFolder = path.resolve(__dirname, "../.."); // Use resolve for clarity

// Files and folders to skip
const skips = new Set([
  "build",
  "node_modules",
  "index.js",
  "jsconfig.json",
  "LICENSE",
  "package.json",
  "README.md",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
]);

const extensionList = [
  { prop: "types", ext: ".d.ts" },
  { prop: "import", ext: ".mjs" },
  { prop: "require", ext: ".js" },
];

/**
 * Reads subfolders from the base folder while skipping specified files/folders.
 * @param {string} baseFolder - The folder to read.
 * @param {Set<string>} skips - A set of folder/file names to skip.
 * @returns {Promise<string[]>} - An array of folder names.
 */
async function readFolders(baseFolder, skips = []) {
  try {
    const files = await fs.promises.readdir(baseFolder, {
      withFileTypes: true,
    });
    return files
      .filter(
        (file) =>
          file.isDirectory() &&
          !skips.has(file.name) &&
          !file.name.startsWith(".")
      )
      .map((file) => file.name);
  } catch (err) {
    throw new Error("Error reading directory: " + err.message);
  }
}

/**
 * Generates an exports object for the folders with valid index files.
 * @param {string[]} folders - An array of folder names.
 * @returns {Object} - The exports object.
 */
function generateExports(folders) {
  const exports = { ".": "./index.js" };

  for (const folder of folders) {
    const exportDefinition = extensionList.reduce((acc, { prop, ext }) => {
      const filePath = path.join(baseFolder, folder, `index${ext}`);
      if (fs.existsSync(filePath)) {
        acc[prop] = `./${folder}/index${ext}`;
      }
      return acc;
    }, {});

    if (Object.keys(exportDefinition).length > 0) {
      exports[`./${folder}`] = exportDefinition;
    }
  }

  exports["./*"] = "./*";
  return exports;
}

/**
 * Updates the package.json file with the generated exports object.
 * @param {Object} exports - The exports object to write to package.json.
 * @returns {Promise<void>}
 */
async function updatePackageJson(exports) {
  try {
    const packageJsonPath = path.join(baseFolder, "package.json");
    const packageJson = await fse.readJson(packageJsonPath);
    packageJson.exports = exports;
    await fse.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  } catch (err) {
    throw new Error("Error updating package.json: " + err.message);
  }
}

/**
 * Main function to update package.json exports based on folder structure.
 */
(async () => {
  try {
    const folders = await readFolders(baseFolder, skips);
    const exports = generateExports(folders);
    await updatePackageJson(exports);
    console.log("Package.json updated successfully.");
  } catch (err) {
    console.error(err.message);
  }
})();
