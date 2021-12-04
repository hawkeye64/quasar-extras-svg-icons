const packageName = '@ant-design/icons-svg'
const distName = 'ant-design-icons'
const iconSetName = 'Ant Design Icons'
const prefix = 'ant'
const iconPath = 'inline-svg'
const svgPath = '/*.svg'
const license = 'https://github.com/ant-design/ant-design-icons/blob/master/LICENSE'

// ------------

const glob = require('glob')
const { copySync } = require('fs-extra')
const { resolve } = require('path')

const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extract, writeExports } = require('./utils')

const iconNames = new Set()

const svgExports = []
const typeExports = []

const stylesFilter = [
  {
    from: 'fill:#333;',
    to: 'fill:currentColor;'
  }
]

const svgFolder = resolve(__dirname, `../../node_modules/${ packageName }/${ iconPath }/`)
const subfolders = [
  {
    name: 'outlined',
    alt: 'Outlined'
  },
  {
    name: 'filled',
    alt: 'Filled'
  },
  {
    name: 'twotone',
    alt: 'TwoTone'
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
})

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

// copySync(
//   resolve(__dirname, `../../node_modules/${ packageName }/LICENSE`),
//   resolve(__dirname, `../${ distName }/LICENSE.md`)
// )

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)
