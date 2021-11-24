const packageName = '@vaadin/icons'
const distName = 'vaadin-icons'
const iconSetName = 'Vaadin Icons'
const prefix = 'vaadin'


// ------------

const glob = require('glob')
const { copySync, readFileSync } = require('fs-extra')
const { resolve } = require('path')
const nameRegex = /(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/
const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extractSvg, writeExports } = require('./utils')

const svgFolder = resolve(__dirname, `../../node_modules/${ packageName }/`)
const svgFile = readFileSync(svgFolder + '/iconset.js', 'utf8')
const svgFiles = svgFile.split('\n')
const iconNames = new Set()

const svgExports = []
const typeExports = []

svgFiles.forEach(line => {
  if (line.startsWith('<g id="')) {
    const svgName = line.match(nameRegex)[ 0 ]

    // build the svg
    const content = '<svg viewBox="0 0 16 16">' + line + '</svg>'

    // create the name
    const name = defaultNameMapper(svgName, prefix)

    if (iconNames.has(name)) {
      return
    }

    try {
      const { svgDef, typeDef } = extractSvg(content, name)
      svgExports.push(svgDef)
      typeExports.push(typeDef)
  
      iconNames.add(name)
    }
    catch(err) {
      console.error(err)
      skipped.push(name)
    }
  }
})

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `../../node_modules/${ packageName }/LICENSE`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

const end = new Date()

console.log(`${ iconSetName } done (${ end - start }ms)`)