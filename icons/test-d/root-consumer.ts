import { akarAir } from 'quasar-extras-svg-icons/akar-icons'
import { codiAccount } from 'quasar-extras-svg-icons/codicons'
import { coolLineRegularActivity } from 'quasar-extras-svg-icons/cool-icons-v5'
import { lucideActivity } from 'quasar-extras-svg-icons/lucide-icons'
import { tabFilledAccessible } from 'quasar-extras-svg-icons/tabler-icons-v3'

const icons: string[] = [
  akarAir,
  codiAccount,
  coolLineRegularActivity,
  lucideActivity,
  tabFilledAccessible,
]

icons.forEach((icon) => {
  if (icon.length === 0) {
    throw new Error('Icon export should not be empty.')
  }
})
