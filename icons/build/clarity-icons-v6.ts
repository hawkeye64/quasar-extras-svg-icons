import {
  basename,
  defaultNameMapper,
  extractSvg,
  getDirname,
  join,
  resolve,
  tinyglobby,
  writeExports,
  writeFileSync,
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

const packageName = '@cds/core'
const distName = 'clarity-icons-v6'
const iconSetName = 'Clarity Icons'
const prefix = 'clarity'
const iconPath = '/icon/shapes'
const svgPath = '/*.js'

const start = Date.now()

const skipped: string[] = []
const distFolder = resolve(__dirname, `../${distName}`)

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`)
const svgFiles: string[] = tinyglobby.globSync(svgFolder + svgPath)
const iconNames = new Set<string>()

const svgExports: string[] = []
const typeExports: string[] = []

async function processFiles() {
  for (const file of svgFiles) {
    const jsFile = basename(file, '.js')
    let name = defaultNameMapper(jsFile, prefix)

    let accessor = name.slice(prefix.length)
    accessor = accessor.charAt(0).toLowerCase() + accessor.slice(1) + 'Icon'

    const filePath = resolve(svgFolder, jsFile + '.js')
    const icons = await import(filePath)
    const items = icons[accessor][1]
    let svg
    // 'clarityVmBugInverse' is the only one like this...
    if (typeof items === 'string') {
      if (iconNames.has(name)) {
        continue
      }

      svg = items
      // why do some have surrounding svg tag and some don't?
      if (!svg.startsWith('<svg')) {
        svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">' +
          svg +
          '</svg>'
      }

      try {
        // console.log(name, svg)
        const { svgDef, typeDef } = extractSvg(svg, name)
        svgExports.push(svgDef)
        typeExports.push(typeDef)

        iconNames.add(name)
      } catch (err) {
        console.error(
          `[Error] "${name}" could not be parsed:`,
          err instanceof Error ? err.message : String(err),
        )
        skipped.push(name)
      }
    } else {
      const keys = Object.keys(items)
      for (const key of keys) {
        if (key.endsWith('Alerted') || key.endsWith('Badged')) continue

        name = defaultNameMapper(`${jsFile}-${key}`, prefix)

        if (iconNames.has(name)) {
          continue
        }

        let svg = items[key]
        // quite a few have this issue
        // also height="5"" <- notice two double quotes on end, which breaks dom parser
        svg = svg.replace('</g><g id="Layer_5" data-name="Layer 5">', '').replace('""', '"')

        // why do some have surrounding svg tag and some don't?
        if (!svg.startsWith('<svg')) {
          svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">' +
            svg +
            '</svg>'
        }

        try {
          // console.log(name, svg)
          const { svgDef, typeDef } = extractSvg(svg, name)
          svgExports.push(svgDef)
          typeExports.push(typeDef)

          iconNames.add(name)
        } catch (err) {
          console.error(
            `[Error] "${name}" could not be parsed:`,
            err instanceof Error ? err.message : String(err),
          )
          skipped.push(name)
        }
      }
    }
  }
}

async function run() {
  await processFiles()

  writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped)

  // copySync(
  //   resolve(__dirname, `../node_modules/${packageName}/LICENSE`),
  //   resolve(__dirname, `../${distName}/LICENSE.md`)
  // )

  // write the JSON file
  const file = resolve(__dirname, join('..', distName, 'icons.json'))
  writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), 'utf-8')

  const end = Date.now()

  console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`)

  if (process.send) {
    process.send({ distName, iconNames: [...iconNames], time: end - start })
  }
}

run()
