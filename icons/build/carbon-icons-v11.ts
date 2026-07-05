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

const packageName = '@carbon/icons'
const distName = 'carbon-icons-v11'
const iconSetName = 'Carbon Icons'
const prefix = 'carbon'
const iconPath = 'svg'
const svgPath = '/*.svg'

// ------------

const start = Date.now()

const skipped: string[] = []
const distFolder = resolve(__dirname, `../${distName}`)
const fileOverrides = new Map<string, string>([
  [
    'carbon32CalendarAddAlt',
    resolve(__dirname, './overrides/carbon-icons-v11/calendar--add--alt.svg'),
  ],
  ['carbon32CalendarAdd', resolve(__dirname, './overrides/carbon-icons-v11/calendar--add.svg')],
  [
    'carbon32DataQualityDefinition',
    resolve(__dirname, './overrides/carbon-icons-v11/data-quality-definition.svg'),
  ],
  [
    'carbon32RuleDataQuality',
    resolve(__dirname, './overrides/carbon-icons-v11/rule--data-quality.svg'),
  ],
  [
    'carbon32WorkflowAutomation',
    resolve(__dirname, './overrides/carbon-icons-v11/workflow-automation.svg'),
  ],
])

const iconNames = new Set<string>()

const svgExports: string[] = []
const typeExports: string[] = []

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`)

// get root SVG
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath)

svgFiles.forEach((file) => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(fileOverrides.get(name) ?? file, name)
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

const subfolders = [
  {
    name: '16',
    alt: '16',
  },
  {
    name: '20',
    alt: '20',
  },
  {
    name: '24',
    alt: '24',
  },
  {
    name: '32',
    alt: '32',
  },
]

subfolders.forEach((folder) => {
  const dir = resolve(svgFolder, folder.name)
  svgFiles.length = 0
  svgFiles.push(...tinyglobby.globSync(dir + '/**/*.svg'))

  svgFiles.forEach((file) => {
    const name = defaultNameMapper(file, prefix + folder.alt)

    if (iconNames.has(name)) {
      return
    }

    try {
      const { svgDef, typeDef } = extract(fileOverrides.get(name) ?? file, name)
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
