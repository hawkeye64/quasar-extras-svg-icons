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
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

const packagePath = '../../packages/IconPark'
const distName = 'iconpark-icons'
const iconSetName = 'IconPark Icons'
const prefix = 'ip'
const iconPath = '/source'
const svgPath = '/**/*.svg'

// ------------

const start = Date.now()

const skipped: string[] = []
const distFolder = resolve(__dirname, `../${distName}`)

const svgFolder = resolve(__dirname, join(packagePath, iconPath))
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath)
const iconNames = new Set<string>()

const svgExports: string[] = []
const typeExports: string[] = []

const stylesFilter = [
  {
    from: /black/gi,
    to: 'currentColor',
  },
  {
    from: /fill:#2F88FF/,
    to: 'fill:currentColor;fill-opacity:0.6;',
  },
  {
    from: /fill:#43CCF8/,
    to: 'fill:currentColor;fill-opacity:0.6;',
  },
  {
    from: /stroke:#000000/,
    to: 'stroke:currentColor;',
  },
]

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    // const { svgDef, typeDef } = extract(file, name, { stylesFilter, viewBoxFilter, postFilters })
    const { svgDef, typeDef } = extract(file, name, { stylesFilter })
    // const { svgDef, typeDef } = extract(file, name)
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

const { version } = JSON.parse(
  readFileSync(resolve(__dirname, packagePath, 'package.json'), 'utf-8'),
) as {
  version: string
}
writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `${packagePath}/LICENSE`),
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
