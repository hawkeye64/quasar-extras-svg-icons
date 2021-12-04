const packageName = 'entypo'
const distName = 'entypo-icons'
const iconSetName = 'Entypo Icons'
const prefix = 'entypo'
const iconPath = 'src'
const svgPath = '/**/*.svg'
// const license = 'https://github.com/atisawd/boxicons#License'

// ------------

const glob = require('glob')
const { copySync } = require('fs-extra')
const { resolve } = require('path')

const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const svgFolder = resolve(__dirname, `../../node_modules/${ packageName }/${ iconPath }/`)
const svgFiles = glob.sync(svgFolder + svgPath)
const iconNames = new Set()

const svgExports = []
const typeExports = []

function filterName (name) {
  if (name === 'entypo-google+with-circle' || name === 'entypo-google+') {
    return name.replace('+', '')
  }
  else if (name === 'entypoResize100%') {
    return name.replace('%', '')
  }
  return name
}

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix, { filterName })

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
  resolve(__dirname, `../../node_modules/${ packageName }/LICENSE.md`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)
