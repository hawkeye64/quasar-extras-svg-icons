import { akarAir } from 'quasar-extras-svg-icons/akar-icons'
import { codiAccount } from 'quasar-extras-svg-icons/codicons'
import { lnrAlarm } from 'quasar-extras-svg-icons/linear-icons'
import { lucideActivity } from 'quasar-extras-svg-icons/lucide-icons'
import * as tablerIcons from 'quasar-extras-svg-icons/tabler-icons-v3'

for (const icon of [akarAir, codiAccount, lnrAlarm, lucideActivity]) {
  if (typeof icon !== 'string' || icon.length === 0) {
    throw new Error('Expected generated icon exports to be non-empty strings.')
  }
}

if (lnrAlarm.includes('#000000') || !lnrAlarm.includes('currentColor')) {
  throw new Error('Expected Linear Icons exports to use currentColor.')
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
