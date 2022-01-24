const packageName = 'healthicons'
const packagePath = '../../packages/healthicons'
const distName = 'health-icons'
const iconSetName = 'Health Icons'
const prefix = 'health'
const iconPath = '/public/icons/svg'
const svgPath = '/**/*.svg'

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

const myFilters = [
  {
    from: /#[3]{3,6}/g,
    to: 'currentColor'
  },
  {
    from: /white/g,
    to: 'none'
  }
]

function preFilters (name, content) {
  // See: https://github.com/hawkeye64/quasar-extras-svg-icons/issues/16
  myFilters.forEach(filter => {
    content = content.replace(filter.from, filter.to)
  })
  
  return content
}

const svgFolder = resolve(__dirname, `${ packagePath }/${ iconPath }/`)
const subfolders = [
  {
    name: 'filled',
    alt: 'Filled'
  },
  {
    name: 'negative',
    alt: 'Negative'
  },
  {
    name: 'outline',
    alt: 'Outline'
  }
]

function filterName (name) {
  if (name === '!') {
    // found in 'typography' folder
    // there's already a 'quastion_mark'
    // so  we'll follow that convention
    return 'exclamation_mark'
  }
  return name
}


subfolders.forEach(folder => {
  const dir = resolve(svgFolder, folder.name)
  const svgFiles = glob.sync(dir + svgPath)

  svgFiles.forEach(file => {
    const name = defaultNameMapper(file, prefix + folder.alt, { filterName })
  
    if (iconNames.has(name)) {
      return
    }

    try {
      const { svgDef, typeDef } = extract(file, name, { preFilters })
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

const { version } = require(join(packagePath, 'package.json'))
writeExports(iconSetName, version, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `${ packagePath }/LICENSE`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'))
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), 'utf-8')

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)

process.send && process.send({ distName, iconNames: [...iconNames], time: end - start })
