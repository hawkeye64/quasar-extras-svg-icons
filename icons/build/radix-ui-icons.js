const packageName = '@radix-ui/icons'
const packagePath = '../../packages/radix-ui-icons/packages/radix-icons'
const distName = 'radix-ui-icons'
const iconSetName = 'Radix-UI Icons'
const prefix = 'radix'
const iconPath = 'icons'
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
const svgFiles = glob.sync(join(svgFolder, svgPath))
const iconNames = new Set()

const svgExports = []
const typeExports = []

const postFilters = [
  {
    from: 'fill:none;fill-rule:evenodd;clip-rule:evenodd;fill:currentColor;',
    to: 'fill-rule:evenodd;clip-rule:evenodd;fill:currentColor;'
  }
]

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(file, name, { postFilters })
    svgExports.push(svgDef)
    typeExports.push(typeDef)

    iconNames.add(name)
  }
  catch(err) {
    console.error(err)
    skipped.push(name)
  }
})

const { version } = require(join(svgFolder, '../package.json'))
writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped)

// copySync(
//   resolve(__dirname, `${ packagePath }/LICENSE`),
//   resolve(__dirname, `../${ distName }/LICENSE.md`)
// )

const end = new Date()

console.log(`${ iconSetName } done (${ end - start }ms)`)