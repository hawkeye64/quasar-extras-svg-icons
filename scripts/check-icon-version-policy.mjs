import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const maxEntriesPerFamily = 2

const roots = [
  {
    label: 'generated icon folders',
    directory: 'icons',
    pick(entry, directory) {
      if (entry === 'build' || entry === 'node_modules' || entry === 'test-d') {
        return null
      }

      return statSync(join(directory, entry)).isDirectory() ? entry : null
    },
  },
  {
    label: 'icon build scripts',
    directory: 'icons/build',
    pick(entry) {
      return entry.endsWith('.ts') === true && entry !== 'index.ts' ? entry.slice(0, -3) : null
    },
  },
]

function getFamilyName(entry) {
  return entry.replace(/-v\d+$/, '')
}

function getVersion(entry) {
  const match = entry.match(/-v(\d+)$/)

  return match === null ? 0 : Number(match[1])
}

function collectGroups({ directory, pick }) {
  const groups = new Map()

  for (const entry of readdirSync(directory)) {
    const name = pick(entry, directory)

    if (name === null) {
      continue
    }

    const family = getFamilyName(name)
    const entries = groups.get(family) ?? []

    entries.push(name)
    groups.set(family, entries)
  }

  return groups
}

const violations = []

for (const root of roots) {
  const groups = collectGroups(root)

  for (const [family, entries] of groups) {
    if (entries.length <= maxEntriesPerFamily) {
      continue
    }

    violations.push({
      label: root.label,
      family,
      entries: entries.sort((left, right) => getVersion(left) - getVersion(right)),
    })
  }
}

if (violations.length > 0) {
  console.error(
    `Icon version policy failed: keep at most ${maxEntriesPerFamily} entries per icon family.`,
  )

  for (const { label, family, entries } of violations) {
    console.error(`- ${label}: ${family}: ${entries.join(', ')}`)
  }

  process.exitCode = 1
} else {
  console.log(`Icon version policy passed: no family has more than ${maxEntriesPerFamily} entries.`)
}
