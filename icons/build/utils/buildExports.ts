import * as fs from 'node:fs'
import * as path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readJson, writeJson } from 'fs-extra/esm'

const __dirname = dirname(fileURLToPath(import.meta.url))

const baseFolder = path.resolve(__dirname, '../..') // Use resolve for clarity

// Files and folders to skip
const skips = new Set([
  'build',
  'node_modules',
  'index.js',
  'index.mjs',
  'jsconfig.json',
  'LICENSE',
  'package.json',
  'README.md',
  'yarn.lock',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
])

const extensionList = [
  { prop: 'types', ext: '.d.ts' },
  { prop: 'import', ext: '.mjs' },
]

/**
 * Reads subfolders from the base folder while skipping specified files/folders.
 * @param {string} baseFolder - The folder to read.
 * @param {Set<string>} skips - A set of folder/file names to skip.
 * @returns {Promise<string[]>} - An array of folder names.
 */
async function readFolders(baseFolder: string, skips: Set<string> = new Set()) {
  try {
    const files = await fs.promises.readdir(baseFolder, {
      withFileTypes: true,
    })
    return files
      .filter((file) => file.isDirectory() && !skips.has(file.name) && !file.name.startsWith('.'))
      .map((file) => file.name)
  } catch (err) {
    throw new Error(
      'Error reading directory: ' + (err instanceof Error ? err.message : String(err)),
    )
  }
}

/**
 * Removes generated CommonJS entrypoints from icon folders.
 * @param {string[]} folders - An array of folder names.
 * @returns {Promise<void>}
 */
async function removeCommonJsIndexes(folders: string[]) {
  await Promise.all(
    folders.map((folder) =>
      fs.promises.rm(path.join(baseFolder, folder, 'index.js'), { force: true }),
    ),
  )
}

/**
 * Generates an exports object for the folders with valid index files.
 * @param {string[]} folders - An array of folder names.
 * @returns {Object} - The exports object.
 */
function generateExports(folders: string[]) {
  const exports: Record<string, string | Record<string, string>> = { '.': './index.mjs' }

  for (const folder of folders) {
    const exportDefinition = extensionList.reduce(
      (acc, { prop, ext }) => {
        const filePath = path.join(baseFolder, folder, `index${ext}`)
        if (fs.existsSync(filePath)) {
          acc[prop] = `./${folder}/index${ext}`
        }
        return acc
      },
      {} as Record<string, string>,
    )

    if (Object.keys(exportDefinition).length > 0) {
      exports[`./${folder}`] = exportDefinition
    }
  }

  exports['./*/icons.json'] = './*/icons.json'
  exports['./package.json'] = './package.json'

  return exports
}

/**
 * Updates the package.json file with the generated exports object.
 * @param {Object} exports - The exports object to write to package.json.
 * @returns {Promise<void>}
 */
async function updatePackageJson(exports: Record<string, string | Record<string, string>>) {
  try {
    const packageJsonPath = path.join(baseFolder, 'package.json')
    const packageJson = await readJson(packageJsonPath)
    packageJson.main = 'index.mjs'
    packageJson.exports = exports
    await writeJson(packageJsonPath, packageJson, { spaces: 2 })
  } catch (err) {
    throw new Error(
      'Error updating package.json: ' + (err instanceof Error ? err.message : String(err)),
    )
  }
}

/**
 * Main function to update package.json exports based on folder structure.
 */
;(async () => {
  try {
    const folders = await readFolders(baseFolder, skips)
    await removeCommonJsIndexes(folders)
    const exports = generateExports(folders)
    await updatePackageJson(exports)
    console.log('Package.json updated successfully.')
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err))
    process.exitCode = 1
  }
})()
