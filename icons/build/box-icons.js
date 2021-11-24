const packageName = 'boxicons'
const distName = 'box-icons'
const iconSetName = 'Box Icons'
const prefix = 'box'
const iconPath = 'svg'
const svgPath = '/**/*.svg'
const license = 'https://github.com/atisawd/boxicons#License'

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

const options = {
  filters: [
    {
      from: '<defs><path id="a" d="M4 2.24h42V22H4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath>',
      to: ''
    },
    {
      from: '<defs><path id="a" d="M-22 2.24h42V22h-42z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath>',
      to: ''
    }
  ]
}

const usesFilter = [
  'boxBxsDroplet',
  'boxBxsHot'
]

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    const { svgDef, typeDef } = extract(file, name, usesFilter.includes(name) ? options : {})
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

// copySync(
//   resolve(__dirname, `../../node_modules/${packageName}/LICENSE`),
//   resolve(__dirname, `../${distName}/LICENSE.md`)
// )

const end = new Date()

console.log(`${ iconSetName } done (${ end - start }ms)`)
