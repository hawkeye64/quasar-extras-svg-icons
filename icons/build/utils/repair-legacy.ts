import { writeExclusions } from './exclusions.js'
import { getDirname, readFileSync, resolve, writeFileSync } from './index.js'

const root = resolve(getDirname(import.meta.url), '../..')

/** Historical catalogs are retained snapshots without an active upstream builder. */
export function repairLegacyIcons(): void {
  const exclusions: Record<string, Record<string, string>> = JSON.parse(
    readFileSync(resolve(root, 'build/legacy-exclusions.json'), 'utf8'),
  )
  for (const set of [...Object.keys(exclusions), 'clarity-icons']) {
    const folder = resolve(root, set)
    const excluded = exclusions[set] ?? {}
    const names = new Set(Object.keys(excluded))
    for (const entry of ['index.mjs', 'index.d.ts']) {
      const file = resolve(folder, entry)
      let content = readFileSync(file, 'utf8')
        .split('\n')
        .filter((line) => {
          const name = line.match(/^export (?:declare )?const (\w+)/)?.[1]
          return name === undefined || !names.has(name)
        })
        .join('\n')
      if (set === 'coreui-icons') {
        content = content.replace(
          /var\(--ci-primary-color current[Cc]olor\)/g,
          'var(--ci-primary-color, currentColor)',
        )
      }
      if (set === 'clarity-icons') {
        content = content.replace(/isolation:isolatefill:/g, 'isolation:isolate;fill:')
      }
      if (set.startsWith('material-theme-icons')) {
        content = content.replace(/fill-opacity:1fill:/g, 'fill-opacity:1;fill:')
      }
      writeFileSync(file, content)
    }
    const listFile = resolve(folder, 'icons.json')
    const list: string[] = JSON.parse(readFileSync(listFile, 'utf8'))
    writeFileSync(
      listFile,
      JSON.stringify(
        list.filter((name) => !names.has(name)),
        null,
        2,
      ),
    )
    writeExclusions(folder, excluded)
  }
}
