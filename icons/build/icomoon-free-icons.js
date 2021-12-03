const packageName = 'icomoon-free-npm'
const distName = 'icomoon-free-icons'
const iconSetName = 'Icomoon Free Icons'
const prefix = 'icomoon-free'
const iconPath = 'SVG'
const svgPath = '/*.svg'
const renameRegex = /\d{3}-([?:\S]+)/

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

function filterName (name) {
  return name.match(renameRegex)[ 1 ]
}

const preFilters = [
  {
    from: /#000000/g,
    to: 'currentColor;'
  }
]

svgFiles.forEach(file => {
  const name = defaultNameMapper(file, prefix, { filterName })

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

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `../../node_modules/${ packageName }/License.txt`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

const end = new Date()

console.log(`${ iconSetName } done (${ end - start }ms)`)
