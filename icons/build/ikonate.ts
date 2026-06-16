import {
  copySync,
  defaultNameMapper,
  extract,
  getDirname,
  join,
  resolve,
  tinyglobby,
  writeExports,
  writeFileSync,
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

const packageName = 'ikonate'
const distName = 'ikonate'
const iconSetName = 'Ikonate'
const prefix = 'ikonate'
const iconPath = '/icons'
const svgPath = '/*.svg'

// ------------

const start = Date.now()

const skipped: string[] = []
const distFolder = resolve(__dirname, `../${distName}`)

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`)
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath)
const iconNames = new Set<string>()

const svgExports: string[] = []
const typeExports: string[] = []

function stylesFilter(strAttributes: string) {
  strAttributes = strAttributes.replace(/fill:none;stroke:black;/, 'fill:none;stroke:currentColor;')
  strAttributes = strAttributes.replace(/stroke-width:2;/, '') // only ikonateArrowDownCircle
  // user is expected to set these attributes up, but we'll do it instead right here
  if (strAttributes.indexOf('fill:') === -1) strAttributes += 'fill:none;'
  if (strAttributes.indexOf('stroke:') === -1) strAttributes += 'stroke:currentColor;'
  // if (strAttributes.indexOf('stroke-width:') === -1) strAttributes += 'stroke-width:.5;'
  // if (strAttributes.indexOf('stroke-linecap:') === -1) strAttributes += 'stroke-linecap:square;'
  // if (strAttributes.indexOf('stroke-linejoin:') === -1) strAttributes += 'stroke-linejoin:miter;'
  return strAttributes
}

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(file, name, { stylesFilter })
    svgExports.push(svgDef)
    typeExports.push(typeDef)

    iconNames.add(name)
  } catch (err) {
    console.error(
      `[Error] "${name}" could not be parsed:`,
      err instanceof Error ? err.message : String(err),
    )
    skipped.push(name)
  }
})

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `../node_modules/${packageName}/LICENSE`),
  resolve(__dirname, `../${distName}/LICENSE.md`),
)

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'))
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), 'utf-8')

const end = Date.now()

console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`)

if (process.send) {
  process.send({ distName, iconNames: [...iconNames], time: end - start })
}
