import { fork } from 'node:child_process'
import { cpus } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Queue, retry, sleep } from './utils/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const maxJobCount = cpus().length - 1 || 1
const tsxExecArgv = ['--import', 'tsx']
const iconScripts = [
  'akar-icons',
  'ant-design-icons',
  'box-icons',
  'brand-icons',
  'brandico-icons',
  'bytesize-icons',
  'carbon-icons-v11',
  'carbon-pictograms-v12',
  'clarity-icons-v6',
  'codicons',
  'cool-icons-v4',
  'coreui-icons-v3',
  'country-flag-icons',
  'dashicons',
  'drip-icons',
  'dev-icons-v2',
  'elusive-icons',
  'entypo-icons',
  'evil-icons',
  'feather-icons',
  'flat-color-icons',
  'flatui-icons',
  'fluentui-system-icons',
  'fontisto-icons',
  'foundation-icons',
  'geom-icons',
  'gitlab-icons-v3',
  'glyphs-brands',
  'glyphs-core-icons',
  'grid-icons',
  'health-icons-v2',
  'hero-icons-v2',
  'icomoon-free-icons',
  'iconoir-icons-v7',
  'iconpark-icons',
  'ikonate',
  'ikons',
  'jam-icons',
  'keyrune-icons',
  'linear-icons',
  'linecons',
  'maki-icons-v8',
  'map-icons',
  'material-icon-theme-v5',
  'modern-icons',
  'oct-icons-v19',
  'open-iconic',
  'openmoji-icons-v17',
  'phosphor-icons-v2',
  'pixelart-icons-v2',
  'polaris-icons-v9',
  'prime-icons-v7',
  'radix-ui-icons',
  'remix-icons-v4',
  'simple-icons-v16',
  'simple-line-icons',
  'stroke7-icons',
  'subway-icons',
  'system-uicons',
  'tabler-icons-v3',
  'teeny-icons',
  'typ-icons',
  'uiw-icons',
  'unicons',
  'vaadin-icons-v25',
  'weather-icons',
  'webfont-medical-icons',
  'windows-icons',
  'zond-icons',
]

/**
 * Generates and processes icon scripts, either in parallel or sequentially.
 * This function manages the icon generation process, including queuing jobs,
 * running scripts, building exports, and logging performance metrics.
 *
 * @async
 * @function generate
 * @returns {Promise<void>} A promise that resolves when all icon generation and processing is complete.
 * @throws {Error} If any of the icon scripts or the export builder fails.
 */
async function generate() {
  const startTime = Date.now()
  let totalIcons = 0
  let totalBuildTime = 0

  const queue = new Queue<string>(
    async (scriptFile: string) => {
      await retry(async ({ tries }: { tries: number }) => {
        await sleep((tries - 1) * 100)
        const child = fork(join(__dirname, `${scriptFile}.ts`), {
          execArgv: tsxExecArgv,
        })

        await new Promise<void>((resolve, reject) => {
          child.on('message', (message: { iconNames: string[]; time: number }) => {
            totalIcons += message.iconNames.length
            totalBuildTime += message.time
          })
          child.on('exit', (code: number | null) => {
            if (code === 0) {
              resolve()
            } else {
              reject(new Error(`Script ${scriptFile} failed with code ${code}`))
            }
          })
        })
      })
    },
    { concurrency: maxJobCount },
  )

  // Enqueue all jobs. The queue also handles single-core environments with
  // concurrency 1, so every builder runs through the same child-process path.
  for (const script of iconScripts) {
    queue.push(script)
  }

  // Wait for all jobs to complete
  await queue.wait({ empty: true })

  // Run the export builder
  await retry(async ({ tries }: { tries: number }) => {
    await sleep((tries - 1) * 100)
    const buildChild = fork(join(__dirname, './utils/buildExports.ts'), {
      execArgv: tsxExecArgv,
    })
    await new Promise<void>((resolve, reject) => {
      buildChild.on('exit', (code: number | null) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`Build exports failed with code ${code}`))
        }
      })
    })
  })

  // Ensure everything is completed before logging totals
  const endTime = Date.now()
  console.log(`Total Run Time: ${endTime - startTime}ms`)
  console.log(`Total Build Time: ${totalBuildTime}ms`)
  console.log(`Total Saved Time: ${totalBuildTime - (endTime - startTime)}ms`)
  console.log(`Total Icons Built: ${totalIcons}`)
}

generate().catch((err) => console.error(err))
