const packageName = 'openmoji'
const distName = 'openmoji-icons'
const iconSetName = 'Openmoji Icons'
const prefix = 'om'
const iconPath = ''
const svgPath = '/**/*.svg'

// ------------

const glob = require('glob')
const { writeFileSync } = require('fs')
const { copySync } = require('fs-extra')
const { resolve, join } = require('path')

const start = new Date()

const skipped = []
const distFolder = resolve(__dirname, `../${ distName }`)
const { defaultNameMapper, extract, writeExports, kebabToCamelCase } = require('./utils')

const iconNames = new Set()

const svgExports = []
const typeExports = []

const openmojiJsonPath = resolve(__dirname, `../../node_modules/${ packageName }/data/openmoji.json`)
const openmojiJson = require(openmojiJsonPath)

const svgFolder = resolve(__dirname, `../../node_modules/${ packageName }/${ iconPath }/`)

function findMatchingEmoji (json, key) {
  return json.find(obj => obj.hexcode === key)
}

function filterName (baseName) {
  const match = findMatchingEmoji(openmojiJson, baseName)
  if (match) {
    baseName = match.annotation.replace(/\(|\)|\&|\:|\’|\“|\”|\"|\!/g, '').replace(/Å/, 'A').replace(/#/, 'Hash').replace('*', 'Star').replace(/,/g, '-').replace(/ /g, '-').toLowerCase()
  }
  return baseName
}

const folders = [
  'color',
  'black'
]

// exclude anything that ended up as a box (didn't translate very well to a "black" icon)
const excludedSvg = [
  '\'M5 17 H67 V55 H5 V17z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72\'',
  '\'M5.0834 17 H67.0834 V55 H5.0834 V17z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72\'',
  '\'M17 17 H55 V55 H17 V17z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72\'',
  '\'M67 17H5V55H67V17Z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72\'',
  '\'M67 17H5V55H67V17Z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72\'',
  '\'M59.0349,60h-46.07A.9679.9679,0,0,1,12,59.0349v-46.07A.9679.9679,0,0,1,12.9651,12h46.07A.9679.9679,0,0,1,60,12.9651v46.07A.9679.9679,0,0,1,59.0349,60Z@@fill:none;stroke:currentColor;stroke-linejoin:round;stroke-width:2;|0 0 72 72\''
  
]

for (const folder of folders) {
  function postFilters (svg) {
    svg = svg.replace(/M0 0z/g, 'M0 0z@@fill:none;stroke:none;&&')

    if (folder === 'black') {
      svg = svg
      .replace(/stroke:#000000;/g, 'stroke:currentColor;')
      .replace(/stroke:#000;/g, 'stroke:currentColor;')
      .replace(/fill:#000000;/g, 'fill:currentColor;')
      .replace(/fill:#000;/g, 'fill:currentColor;')
    }
    return svg
  }

  const iconFolder = join(svgFolder, folder)

  // get root SVG
  const svgFiles = glob.sync(iconFolder + svgPath)

  for (const file of svgFiles) {
    let name = defaultNameMapper(file, `${ prefix }${ folder === 'color' ? 'c' : '' }`, { filterName })

    if (iconNames.has(name)) {
      // de-dupe duplicates
      name += 'Alt'
    }

    if (folder === 'black') {
      // No inferred paths
      if (name === 'omFlagNepal') continue
    }

    try {
      const { svgDef, typeDef } = extract(file, name, { postFilters })

      if (folder === 'black') {
        const match = svgDef.match(/'(.*?)'/g)
        // most 'black' flags or 'black' skin-tones squares have no content
        if (excludedSvg.includes(match[ 0 ])) {
          continue
        }
      }

      svgExports.push(svgDef)
      typeExports.push(typeDef)

      iconNames.add(name)
    }
    catch(err) {
      console.error(err)
      skipped.push(name)
    }
  }
}

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

copySync(
  resolve(__dirname, `../../node_modules/${ packageName }/LICENSE.txt`),
  resolve(__dirname, `../${ distName }/LICENSE.md`)
)

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'))
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), 'utf-8')

const end = new Date()

console.log(`${ iconSetName } (count: ${ iconNames.size }) done (${ end - start }ms)`)

process.send && process.send({ distName, iconNames: [...iconNames], time: end - start })
