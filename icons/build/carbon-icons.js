const packageName = '@carbon/icons'
const distName = 'carbon-icons'
const iconSetName = 'Carbon Icons'
const prefix = 'carbon'
const iconPath = 'svg'
const svgPath = '/**/*.svg'

// ------------

const glob = require('glob')
const { copySync } = require('fs-extra')
const { resolve, join } = require('path')

const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const svgFolder = resolve(__dirname, `../../node_modules/${ packageName }/${ iconPath }/`)
const svgFiles = glob.sync(svgFolder + svgPath)
const iconNames = new Set()

const svgExports = []
const typeExports = []

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(file, name)
    svgExports.push(svgDef)
    typeExports.push(typeDef)

    iconNames.add(name)
  }
  catch(err) {
    console.error(err)
    skipped.push(name)
  }
})

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `../../node_modules/${ packageName }/LICENSE`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

const end = new Date()

console.log(`${ iconSetName } done (${ end - start }ms)`)