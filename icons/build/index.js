const { writeFileSync } = require('fs')
const cpus = require('os').cpus().length
const parallel = cpus > 1
const maxJobCount = cpus - 1 || 1
const run = parallel ? require('child_process').fork : require
const { resolve, join } = require('path')
const { Queue, sleep, retry } = require('./utils')

async function generate () {
  let totalTime = 0
  let totalIcons = 0
  // const iconSets = {}
  const start = new Date()

  function handleChild (child) {
    return new Promise((resolve, reject) => {
      // watch for exit event
      child.on('exit', (code, signal) => {
        resolve()
      })

      // watch for message event
      child.on('message', message => {
        // iconSets[ message.distName ] = message.iconNames
        totalIcons += message.iconNames.length
        totalTime += message.time
      })
    })
  }

  const queue = new Queue(
    async (scriptFile) => {
      await retry(async ({ tries }) => {
        await sleep((tries - 1) * 100)
        const child = run(join(__dirname, scriptFile))
        await handleChild(child)
      })
    },
    { concurrency: maxJobCount },
  )

  function runJob (scriptFile) {
    if (parallel) {
      queue.push(scriptFile)
      return
    }
    return run(join(__dirname, scriptFile))
  }

  runJob('./akar-icons.js')
  runJob('./ant-design-icons.js')
  runJob('./box-icons.js')
  runJob('./brand-icons.js')
  runJob('./brandico-icons.js')
  runJob('./bytesize-icons.js')
  runJob('./carbon-icons.js')
  runJob('./carbon-pictograms.js')
  runJob('./clarity-icons.js')
  runJob('./codicons.js')
  runJob('./cool-icons.js')
  runJob('./coreui-icons.js')
  runJob('./country-flag-icons.js')
  runJob('./drip-icons.js')
  runJob('./dev-icons.js')
  runJob('./elusive-icons.js')
  runJob('./entypo-icons.js')
  runJob('./evil-icons.js')
  runJob('./feather-icons.js')
  runJob('./flat-color-icons.js')
  runJob('./flatui-icons.js')
  runJob('./fluentui-system-icons.js')
  runJob('./fontisto-icons.js')
  runJob('./foundation-icons.js')
  runJob('./geom-icons.js')
  runJob('./gitlab-icons.js')
  runJob('./glyphs-brands.js')
  runJob('./glyphs-core-icons.js')
  runJob('./grid-icons.js')
  runJob('./health-icons.js')
  runJob('./hero-icons.js')
  runJob('./icomoon-free-icons.js')
  runJob('./iconoir-icons.js')
  runJob('./iconpark-icons.js')
  runJob('./ikonate.js')
  runJob('./ikons.js')
  runJob('./jam-icons.js')
  runJob('./linear-icons.js')
  runJob('./linecons.js')
  runJob('./maki-icons.js')
  runJob('./map-icons.js')
  runJob('./material-line-icons.js')
  runJob('./material-theme-icons.js')
  runJob('./modern-icons.js')
  runJob('./oct-icons.js')
  runJob('./open-iconic.js')
  runJob('./openmoji-icons.js')
  runJob('./phosphor-icons.js')
  runJob('./pixelart-icons.js')
  runJob('./prime-icons.js')
  runJob('./radix-ui-icons.js')
  runJob('./remix-icons.js')
  runJob('./simple-icons.js')
  runJob('./simple-line-icons.js')
  runJob('./stroke7-icons.js')
  runJob('./subway-icons.js')
  runJob('./system-uicons.js')
  runJob('./tabler-icons.js')
  runJob('./teeny-icons.js')
  runJob('./typ-icons.js')
  runJob('./uiw-icons.js')
  runJob('./unicons.js')
  runJob('./vaadin-icons.js')
  runJob('./weather-icons.js')
  runJob('./webfont-medical-icons.js')
  runJob('./windows-icons.js')
  runJob('./zond-icons.js')

  //wait for queue to be done
  await queue.wait({ empty: true })

  // write the JSON file
  // const file = resolve(__dirname, '../all-icons.json')
  // writeFileSync(file, JSON.stringify(iconSets, null, 2), 'utf-8')
  
  const end = new Date()
  const runtime = end - start

  // log the statistics
  console.log(`Total Run Time: ${ runtime }ms`)
  console.log(`Total Build Time: ${ totalTime }ms`)
  console.log(`Saved Build Time: ${ totalTime - runtime }ms`)
  console.log('Total Icon Count:', totalIcons)

}

generate()
