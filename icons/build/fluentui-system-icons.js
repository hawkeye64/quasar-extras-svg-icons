const packageName = '@fluentui/svg-icons'
const distName = 'fluentui-system-icons'
const iconSetName = 'FluentUI System Icons'
const prefix = 'fui'
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

// No license
// But, GitHub has one: https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE
// copySync(
//   resolve(__dirname, `../../node_modules/${packageName}/LICENSE`),
//   resolve(__dirname, `../${packageName}/LICENSE.md`)
// )

const end = new Date()

console.log(`${iconSetName} done (${end - start}ms)`)
