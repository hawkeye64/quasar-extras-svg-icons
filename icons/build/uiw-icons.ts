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

const packagePath = '../../packages/uiw-icons'
const distName = 'uiw-icons'
const iconSetName = 'UIW Icons'
const prefix = 'uiw'
const iconPath = 'icon'
const svgPath = '/*.svg'

// ------------

const start = Date.now()

const skipped: string[] = []
const distFolder = resolve(__dirname, `../${distName}`)

const svgFolder = resolve(__dirname, join(packagePath, iconPath))
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath)
const iconNames = new Set<string>()

const svgExports: string[] = []
const typeExports: string[] = []

const piePreFilters = [
  {
    from: /<use fill="#555" xlink:href="#pie-chart-a"\/>/,
    to: '',
  },
  {
    from: /id="pie-chart-a"/,
    to: 'style="fill:currentColor"',
  },
  {
    from: /<defs>/,
    to: '',
  },
  {
    from: /<\/defs>/,
    to: '',
  },
]

const preFilters = [
  {
    from: /#555/,
    to: 'currentColor',
  },
]

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(
      file,
      name,
      name === 'uiwPieChart' ? { preFilters: piePreFilters } : { preFilters },
    )
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
