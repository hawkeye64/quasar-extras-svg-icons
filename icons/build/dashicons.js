const packageName = 'dashicons'
const packagePath = '../../packages/dashicons'
const distName = 'dashicons'
const iconSetName = 'Dash Icons'
const prefix = 'dash'
const iconPath = 'svg-min'
const svgPath = '/*.svg'

// ------------

const glob = require('glob')
const { writeFileSync } = require('fs')
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

const preFilters = [
  {
    from: /black|#020202/g,
    to: 'currentColor;'
  }
]

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix)

  if (iconNames.has(name)) {
    return
  }

  try {
    // const { svgDef, typeDef } = extract(file, name, { preFilters })
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

const { version } = require(join(packagePath, 'package.json'))
writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `${ packagePath }/gpl.txt`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'))
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), 'utf-8')

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)

process.send && process.send({ distName, iconNames: [...iconNames], time: end - start })
