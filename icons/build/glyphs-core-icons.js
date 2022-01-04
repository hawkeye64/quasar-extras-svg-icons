const packageName = '@glyphs/core'
const distName = 'glyphs-core-icons'
const iconSetName = 'Glyphs Core Icons'
const prefix = 'glyphsCore'
const iconPath = ''
const svgPath = '/*.svg'
const license = 'https://github.com/ant-design/ant-design-icons/blob/master/LICENSE'

// ------------

const glob = require('glob')
const { writeFileSync } = require('fs')
const { copySync } = require('fs-extra')
const { resolve, join } = require('path')

const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const iconNames = new Set()

const svgExports = []
const typeExports = []

const stylesFilter = [
  {
    from: /#C2CCDE/gi,
    to: 'currentColor'
  }
]

const svgFolder = resolve(__dirname, `../../node_modules/${ packageName }/${ iconPath }/`)

const subfolders = [
  {
    name: 'bold',
    alt: 'Bold'
  },
  {
    name: 'duo',
    alt: 'Duo'
  },
  {
    name: 'outline',
    alt: 'Outline'
  },
  {
    name: 'path',
    alt: 'Thin'
  },
  {
    name: 'poly',
    alt: 'Poly'
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
      const { svgDef, typeDef } = extract(file, name, folder.name !== 'poly' ? { stylesFilter } : {})
      // const { svgDef, typeDef } = extract(file, name)
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

// copySync(
//   resolve(__dirname, `../../node_modules/${ packageName }/LICENSE`),
//   resolve(__dirname, `../${ distName }/LICENSE.md`)
// )

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'))
writeFileSync(file, JSON.stringify([...iconNames], null, 2), 'utf-8')

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)

process.send && process.send({ distName, iconNames: [...iconNames], time: end - start })
