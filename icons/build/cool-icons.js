const packageName = 'coolicons'
const distName = 'cool-icons'
const iconSetName = 'Cool Icons'
const prefix = 'cool'
const iconPath = 'coolicons v2.5 SVG'
const svgPath = '/**/*.svg'
const license = 'https://github.com/krystonschwarze/coolicons#license'
const version = '2.5.0'

// ------------

const glob = require('glob')
const { writeFileSync } = require('fs')
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

const stylesFilter = [
  {
    from: 'fill:none;fill:black;',
    to: 'fill:currentColor;'
  }
]

svgFiles.forEach(file => {
  let name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  if (name.endsWith('-')) {
    name = name.replace('-', '')
  }

  try {
    const { svgDef, typeDef } = extract(file, name, { stylesFilter })
    svgExports.push(svgDef)
    typeExports.push(typeDef)

    iconNames.add(name)
  }
  catch(err) {
    console.error(err)
    skipped.push(name)
  }
})

writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped)

// copySync(
//   resolve(__dirname, `../../node_modules/${packageName}/LICENSE`),
//   resolve(__dirname, `../${distName}/LICENSE.md`)
// )

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'))
writeFileSync(file, JSON.stringify([...iconNames], null, 2), 'utf-8')

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)

process.send && process.send({ distName, iconNames: [...iconNames], time: end - start })
