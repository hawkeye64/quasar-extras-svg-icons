const packageName = 'iconoir'
const distName = 'iconoir-icons'
const iconSetName = 'Iconoir Icons'
const prefix = 'ico'
const iconPath = 'icons'
const svgPath = '/*.svg'

// ------------

const glob = require('glob')
const { copySync } = require('fs-extra')
const { resolve } = require('path')

const start = new Date()

let skipped = []
const distFolder = resolve(__dirname, `../${distName}`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const svgFolder = resolve(__dirname, `../../node_modules/${packageName}/${iconPath}/`)
const svgFiles = glob.sync(svgFolder + svgPath)
const iconNames = new Set()

const svgExports = []
const typeExports = []

// icons that need to be excluded from SVGO optimization
const excluded = [
  'icoBasketBallAlt',
  'icoGoogleDriveCheck',
  'icoPenConnectBluetooth',
  'icoPhoneDelete',
  'icoRemoveUser',
  'icoStroller'
]

const stylesFilter = [
  {
    from: 'fill:currentColor;',
    to: 'fill:none;'
  }
]

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(file, name, { excluded, stylesFilter })
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
  resolve(__dirname, `../../node_modules/${packageName}/LICENSE`),
  resolve(__dirname, `../${distName}/LICENSE.md`)
)

const end = new Date()

console.log(`${iconSetName} done (${end - start}ms)`)
