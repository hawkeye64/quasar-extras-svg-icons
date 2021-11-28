const packageName = '@uiw/icons'
const packagePath = '../../packages/uiw-icons'
const distName = 'uiw-icons'
const iconSetName = 'UIW Icons'
const prefix = 'uiw'
const iconPath = 'icon'
const svgPath = '/*.svg'

// ------------

const glob = require('glob')
const { copySync } = require('fs-extra')
const { resolve, join } = require('path')

const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const svgFolder = resolve(__dirname, join(packagePath, iconPath))
const svgFiles = glob.sync(svgFolder + svgPath)
const iconNames = new Set()

const svgExports = []
const typeExports = []

const preFilters = [
  {
    from: /<use fill="#555" xlink:href="#pie-chart-a"\/>/,
    to: ''
  },
  {
    from: /id="pie-chart-a"/,
    to: 'style="fill:currentColor"'
  },
  {
    from: /<defs>/,
    to: ''
  },
  {
    from: /<\/defs>/,
    to: ''
  }
]

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(file, name, name === 'uiwPieChart' ? { preFilters } : {})
    svgExports.push(svgDef)
    typeExports.push(typeDef)

    iconNames.add(name)
  }
  catch(err) {
    console.error(err)
    skipped.push(name)
  }
})

const { version } = require(join(packagePath, 'package.json'))
writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `${ packagePath }/LICENSE`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

const end = new Date()

console.log(`${ iconSetName } done (${ end - start }ms)`)
