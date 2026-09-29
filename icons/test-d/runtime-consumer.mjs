import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

import { akarAir } from 'quasar-extras-svg-icons/akar-icons'
import { codiAccount } from 'quasar-extras-svg-icons/codicons'
import { lnrAlarm } from 'quasar-extras-svg-icons/linear-icons'
import { lucideActivity } from 'quasar-extras-svg-icons/lucide-icons'
import * as materialThemeIcons from 'quasar-extras-svg-icons/material-icon-theme-v5'
import * as tablerIcons from 'quasar-extras-svg-icons/tabler-icons-v3'

for (const icon of [akarAir, codiAccount, lnrAlarm, lucideActivity]) {
  if (typeof icon !== 'string' || icon.length === 0) {
    throw new Error('Expected generated icon exports to be non-empty strings.')
  }
}

if (lnrAlarm.includes('#000000') || !lnrAlarm.includes('currentColor')) {
  throw new Error('Expected Linear Icons exports to use currentColor.')
}

for (const [name, icon] of Object.entries(materialThemeIcons)) {
  if (icon.includes('url(')) {
    throw new Error(`Expected ${name} to render without discarded SVG definitions.`)
  }
}

// A catalog entry can have a valid type and still depend on a discarded SVG
// definition. Check every shipped family, including historical snapshots.
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
for (const [entry, config] of Object.entries(manifest.exports)) {
  if (typeof config !== 'object' || !config.import) continue
  const set = entry.slice(2)
  const directory = new URL(`../${set}/`, import.meta.url)
  const names = JSON.parse(readFileSync(new URL('icons.json', directory), 'utf8')).sort()
  const icons = await import(new URL('index.mjs', directory).href)
  assert.deepEqual(Object.keys(icons).sort(), names, `${set}: export/list mismatch`)
  const declarations = readFileSync(new URL('index.d.ts', directory), 'utf8')
  const declaredNames = [...declarations.matchAll(/export declare const (\w+)/g)]
    .map((match) => match[1])
    .sort()
  assert.deepEqual(declaredNames, names, `${set}: declaration/list mismatch`)
  const readme = new URL('README.md', directory)
  if (existsSync(readme)) {
    for (const [, name] of readFileSync(readme, 'utf8').matchAll(/^\| `(\w+)` \|/gm)) {
      assert.ok(!names.includes(name), `${set}/${name}: documented exclusion is still exported`)
    }
  }
  for (const [name, icon] of Object.entries(icons)) {
    assert.equal(typeof icon, 'string', name)
    assert.ok(icon.length > 0, name)
    assert.doesNotMatch(icon, /url\(/i, `${set}/${name}: unresolved SVG definition`)
    assert.doesNotMatch(icon, /var\(--ci-primary-color\s+currentcolor\)/i, name)
    assert.doesNotMatch(icon, /fill-opacity:0\.18\.3|isolation:isolatefill:|fill-opacity:1fill:/, name)
  }
}

if (!materialThemeIcons.matThemeLean.includes(';fill:#448aff;')) {
  throw new Error('Expected Material Icon Theme Lean to preserve its blue fill.')
}

// Tabler's invisible canvas path must not cover the visible artwork.
for (const [name, icon] of Object.entries(tablerIcons)) {
  for (const path of icon.split('&&')) {
    const [d, style = ''] = path.split('@@')
    if (d !== 'M0 0h24v24H0z') continue

    const declarations = Object.fromEntries(
      style
        .split(';')
        .filter(Boolean)
        .map((declaration) => declaration.split(':')),
    )
    if (declarations.fill !== 'none' || declarations.stroke !== 'none') {
      throw new Error(`Expected ${name}'s canvas path to remain invisible.`)
    }
  }
}
