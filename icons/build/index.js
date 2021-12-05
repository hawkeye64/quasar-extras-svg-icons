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
  const iconSets = {}

  function handleChild (child) {
    return new Promise((resolve, reject) => {
      // watch for exit event
      child.on('exit', (code, signal) => {
        resolve()
      })

      // watch for message event
      child.on('message', message => {
        iconSets[ message.distName ] = message.iconNames
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
  runJob('./carbon-icons.js')
  runJob('./carbon-pictograms.js')
  runJob('./codicons.js')
  runJob('./cool-icons.js')
  runJob('./country-flag-icons.js')
  runJob('./entypo-icons.js')
  runJob('./fluentui-system-icons.js')
  runJob('./health-icons.js')
  runJob('./hero-icons.js')
  runJob('./grid-icons.js')
  runJob('./icomoon-free-icons.js')
  runJob('./iconoir-icons.js')
  runJob('./jam-icons.js')
  runJob('./material-line-icons.js')
  runJob('./webfont-medical-icons.js')
  runJob('./oct-icons.js')
  runJob('./pixelart-icons.js')
  runJob('./prime-icons.js')
  runJob('./radix-ui-icons.js')
  runJob('./remix-icons.js')
  runJob('./simple-icons.js')
  runJob('./system-uicons.js')
  runJob('./teeny-icons.js')
  runJob('./tabler-icons.js')
  runJob('./uiw-icons.js')
  runJob('./unicons.js')
  runJob('./vaadin-icons.js')
  runJob('./weather-icons.js')
  runJob('./zond-icons.js')

  //wait for queue to be done
  await queue.wait({ empty: true })

  // log the statistics
  console.log(`Total Time: ${ totalTime }ms`)
  console.log('Icon Count:', totalIcons)

  // write the JSON file
  const file = resolve(__dirname, '../icon-info.json')
  writeFileSync(file, JSON.stringify(iconSets, null, 2), 'utf-8')
}

generate()
