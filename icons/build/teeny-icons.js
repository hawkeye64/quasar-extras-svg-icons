const packageName = 'teenyicons'
const distName = 'teeny-icons'
const iconSetName = 'Teeny Icons'
const prefix = 'teeny'
const iconPath = ''
const svgPath = '/*.svg'

// ------------

const glob = require('glob')
const { copySync } = require('fs-extra')
const { resolve } = require('path')

const start = new Date()

let skipped = []
const distFolder = resolve(__dirname, `../${distName}`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const iconNames = new Set()

const svgExports = []
const typeExports = []

const svgFolder = resolve(__dirname, `../../node_modules/${packageName}/${iconPath}/`)
const subfolders = [
  {
    name: 'outline',
    alt: 'Outline'
  },
  {
    name: 'solid',
    alt: 'Solid'
  }
]

subfolders.forEach(folder => {
  const dir = resolve(svgFolder, folder.name)
  const svgFiles = glob.sync(dir + svgPath)

  svgFiles.forEach(file => {
    const name = defaultNameMapper(file, prefix + folder.alt)
  
    if (iconNames.has(name)) {
      return
    }
  
    try {
      const { svgDef, typeDef } = extract(file, name, false)
      svgExports.push(svgDef)
      typeExports.push(typeDef)
  
      iconNames.add(name)
    }
    catch(err) {
      console.error(err)
      skipped.push(name)
    }
  })
})

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `../../node_modules/${packageName}/LICENSE`),
  resolve(__dirname, `../${distName}/LICENSE.md`)
)

const end = new Date()

console.log(`${iconSetName} done (${end - start}ms)`)
