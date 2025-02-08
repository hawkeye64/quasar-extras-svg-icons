<template>
  <div>
    <q-dialog ref="dialogRef" v-model="showDialog">
      <q-card class="q-pa-md">
        <div class="row justify-center items-center" style="min-width: 400px; min-height: 300px">
          <q-icon :name="currentPath" size="128px" class="q-pa-xs" :class="colorClasses" />
          <span class="full-width text-center" style="font-size: 28px">{{ currentName }}</span>

          <div class="row justify-center">
            <div
              v-for="color in colors"
              :key="color"
              :class="colorClass(color)"
              style="width: 20px; height: 20px"
              @click.stop="changeColor(color)"
              @mouseenter.stop="changeColor(color)"
            ></div>
            <q-toggle v-model="inverted" label="Invert colors" />
          </div>

          <q-separator />

          <q-btn-group push>
            <q-btn push :icon="mdiContentCopy" @click="onCopyName(currentPath, currentName)">
              <q-tooltip>Copy name to clipboard</q-tooltip>
            </q-btn>
            <q-btn push label="SVG" @click="onCopySvg(currentPath, currentName)">
              <q-tooltip>Copy SVG to clipboard</q-tooltip>
            </q-btn>
          </q-btn-group>
        </div>
      </q-card>
    </q-dialog>
    <div class="row justify-evenly items-center">
      <q-select
        v-model="icon"
        dense
        outlined
        :options="iconSets"
        label="Select Icon set"
        style="width: 280px; margin: 2px"
      />
      <span>Totals: {{ filteredCount }}/{{ iconCount }}</span>
      <q-input
        borderless
        dense
        outlined
        debounce="300"
        clearable
        v-model="filter"
        placeholder="Search"
        style="margin: 2px"
      >
        <template v-slot:append>
          <q-icon v-if="!filter" :name="mdiCardSearchOutline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center">
      <q-intersection v-for="(path, name) in icons" :key="name" once class="intersetion-icon-box">
        <div class="row justify-center icon-box" @click="onClick(path, name)">
          <q-icon :name="path" size="md" class="q-pa-xs column" />
          <div class="full-width text-center ellipsis" style="font-size: 9px">
            {{ name }}
          </div>
        </div>
      </q-intersection>
    </div>

    <div class="icons-footer" />

    <!-- <q-page-scroller expand position="bottom" :scroll-offset="150" :offset="[0, 0]">
      <div class="col cursor-pointer q-pa-sm text-center glass">
        <q-icon :name="mdiChevronUp" size="lg" />
      </div>
    </q-page-scroller> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, markRaw } from 'vue'
import { useQuasar, copyToClipboard } from 'quasar'
import {
  mdiCardSearchOutline,
  // mdiChevronUp,
  mdiContentCopy,
} from '@quasar/extras/mdi-v6'

const modules = import.meta.glob('../../../node_modules/quasar-extras-svg-icons/**/index.mjs')

type IconSet = {
  [key: string]: string
}

type ModuleImportInterface = Record<string, string>

const $q = useQuasar()
const icon = ref<IconSet>()
const iconSets: IconSet[] = [
  { label: 'Akar Icons', value: 'akar-icons' },
  { label: 'Ant Design Icons', value: 'ant-design-icons' },
  { label: 'Box Icons', value: 'box-icons' },
  { label: 'Brand Icons', value: 'brand-icons' },
  { label: 'Brandico Icons', value: 'brandico-icons' },
  { label: 'Bytesize Icons', value: 'bytesize-icons' },
  { label: 'Carbon Icons v11', value: 'carbon-icons-v11' },
  { label: 'Carbon Icons', value: 'carbon-icons' },
  { label: 'Carbon Pictograms v12', value: 'carbon-pictograms-v12' },
  { label: 'Carbon Pictograms', value: 'carbon-pictograms' },
  { label: 'Clarity Icons v6', value: 'clarity-icons-v6' },
  { label: 'Clarity Icons', value: 'clarity-icons' },
  { label: 'Codicons', value: 'codicons' },
  { label: 'Cool Icons v4', value: 'cool-icons-v4' },
  { label: 'Cool Icons v2', value: 'cool-icons' },
  { label: 'CoreUI Icons v3', value: 'coreui-icons-v3' },
  { label: 'CoreUI Icons', value: 'coreui-icons' },
  { label: 'Country Flag Icons', value: 'country-flag-icons' },
  { label: 'Dashicons', value: 'dashicons' },
  { label: 'Dev Icons', value: 'dev-icons' },
  { label: 'Drip Icons', value: 'drip-icons' },
  { label: 'Elusive Icons', value: 'elusive-icons' },
  { label: 'Entypo+ Icons', value: 'entypo-icons' },
  { label: 'Evil Icons', value: 'evil-icons' },
  { label: 'Feather Icons', value: 'feather-icons' },
  { label: 'Flat Color Icons (Icons8)', value: 'flat-color-icons' },
  { label: 'FlatUI Icons', value: 'flatui-icons' },
  { label: 'FluentUI System Icons', value: 'fluentui-system-icons' },
  { label: 'Fontisto Icons', value: 'fontisto-icons' },
  { label: 'Foundation Icons', value: 'foundation-icons' },
  { label: 'Geom Icons', value: 'geom-icons' },
  { label: 'GitLab Icons v2', value: 'gitlab-icons-v2' },
  { label: 'GitLab Icons', value: 'gitlab-icons' },
  { label: 'Glyphs Brands', value: 'glyphs-brands' },
  { label: 'Glyphs Core Icons', value: 'glyphs-core-icons' },
  { label: 'Grid Icons', value: 'grid-icons' },
  { label: 'Hero Icons v2', value: 'hero-icons-v2' },
  { label: 'Hero Icons', value: 'hero-icons' },
  { label: 'Health Icons v2', value: 'health-icons-v2' },
  { label: 'Health Icons v1', value: 'health-icons-v1' },
  { label: 'Health Icons', value: 'health-icons' },
  { label: 'Icomoon Free Icons', value: 'icomoon-free-icons' },
  { label: 'Iconoir v7', value: 'iconoir-icons-v7' },
  { label: 'Iconoir v6', value: 'iconoir-icons-v6' },
  { label: 'Iconoir v5', value: 'iconoir-icons-v5' },
  { label: 'IconPark Icons', value: 'iconpark-icons' },
  { label: 'Ikonate', value: 'ikonate' },
  { label: 'Ikons', value: 'ikons' },
  { label: 'Jam Icons', value: 'jam-icons' },
  { label: 'Keyrune Icons', value: 'keyrune-icons' },
  { label: 'Linear Icons', value: 'linear-icons' },
  { label: 'Linecons', value: 'linecons' },
  { label: 'Maki Icons (Mapbox) v8', value: 'maki-icons-v8' },
  { label: 'Maki Icons (Mapbox)', value: 'maki-icons' },
  { label: 'Map Icons', value: 'map-icons' },
  { label: 'Material Icon Theme v5', value: 'material-icon-theme-v5' },
  { label: 'Material Line Icons v2', value: 'material-line-icons-v2' },
  { label: 'Material Line Icons v1', value: 'material-line-icons-v1' },
  { label: 'Material Line Icons', value: 'material-line-icons' },
  { label: 'Material Theme Icons v3', value: 'material-theme-icons' },
  { label: 'Material Theme Icons', value: 'material-theme-icons-v3' },
  { label: 'Modern Icons', value: 'modern-icons' },
  { label: 'Octicons v19', value: 'oct-icons-v19' },
  { label: 'Octicons v18', value: 'oct-icons-v18' },
  { label: 'Octicons v17', value: 'oct-icons-v17' },
  { label: 'Open Iconic', value: 'open-iconic' },
  { label: 'Openmoji Icons v15', value: 'openmoji-icons-v15' },
  { label: 'Openmoji Icons v14', value: 'openmoji-icons-v14' },
  { label: 'Openmoji Icons', value: 'openmoji-icons' },
  { label: 'Phosphor Icons v2', value: 'phosphor-icons-v2' },
  { label: 'Phosphor Icons', value: 'phosphor-icons' },
  { label: 'Pixelart Icons', value: 'pixelart-icons' },
  { label: 'Polaris (Shopify) Icons v9', value: 'polaris-icons-v9' },
  { label: 'Prime Icons v7', value: 'prime-icons-v7' },
  { label: 'Prime Icons v6', value: 'prime-icons-v6' },
  { label: 'Prime Icons', value: 'prime-icons' },
  { label: 'Radix-UI Icons', value: 'radix-ui-icons' },
  { label: 'Remix Icons v4', value: 'remix-icons-v4' },
  { label: 'Remix Icons v3', value: 'remix-icons-v3' },
  { label: 'Remix Icons', value: 'remix-icons' },
  { label: 'Simple Icons v14', value: 'simple-icons-v14' },
  { label: 'Simple Icons v13', value: 'simple-icons-v13' },
  { label: 'Simple Icons v12', value: 'simple-icons-v12' },
  { label: 'Simple Line Icons', value: 'simple-line-icons' },
  { label: 'Stroke 7 Icons (Pixeden)', value: 'stroke7-icons' },
  { label: 'System UIcons', value: 'system-uicons' },
  { label: 'Subway Icons', value: 'subway-icons' },
  { label: 'Tabler Icons v3', value: 'tabler-icons-v3' },
  { label: 'Tabler Icons v2', value: 'tabler-icons-v2' },
  { label: 'Tabler Icons', value: 'tabler-icons' },
  { label: 'Teeny Icons', value: 'teeny-icons' },
  { label: 'Typicons', value: 'typ-icons' },
  { label: 'UIW Icons', value: 'uiw-icons' },
  { label: 'Unicons', value: 'unicons' },
  { label: 'Vaadin Icons v24', value: 'vaadin-icons-v24' },
  { label: 'Vaadin Icons v23', value: 'vaadin-icons-v23' },
  { label: 'Vaadin Icons', value: 'vaadin-icons' },
  { label: 'Weather Icons', value: 'weather-icons' },
  { label: 'Webfont Medical Icons', value: 'webfont-medical-icons' },
  { label: 'Windows Icons', value: 'windows-icons' },
  { label: 'Zond Icons', value: 'zond-icons' },
]

const importedIcons = ref<ModuleImportInterface | null>(null)
const filter = ref<string>('')
const dialogRef = ref()
const showDialog = ref<boolean>(false)
const currentPath = ref<string>('')
const currentName = ref<string>('')
const textColor = ref<string>('black')
const colors = [
  'black',
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
]
const inverted = ref<boolean>(false)

const colorClasses = computed(() => {
  let color = ''
  let bgColor = 'bg-white'
  if (inverted.value) {
    color += 'bg-' + textColor.value
    bgColor = 'text-white'
  } else {
    color += 'text-' + textColor.value
  }
  if (textColor.value !== 'black') color += '-8'
  return color + ' ' + bgColor
})

const icons = computed(() => {
  const vals: Record<string, string> = {}
  const filterValue = filter.value && importedIcons.value ? filter.value.toLowerCase() : ''
  if (importedIcons.value) {
    Object.keys(importedIcons.value).forEach((name) => {
      if (filterValue === '' || name.toLowerCase().indexOf(filterValue) > -1) {
        vals[name] = importedIcons.value![name] as string
      }
    })
  }
  return vals
})

const filteredCount = computed(() => Object.keys(icons.value).length)
const iconCount = computed(() =>
  importedIcons.value ? Object.keys(importedIcons.value).length : 0,
)

watch(icon, async (val) => {
  if (!val) {
    importedIcons.value = null
    return
  }

  const now = new Date()
  const modulePath = `../../../node_modules/quasar-extras-svg-icons/${val.value}/index.mjs`
  if (modules[modulePath]) {
    const svgFile = (await modules[modulePath]()) as Record<string, string>
    importedIcons.value = markRaw(svgFile)
    console.log(`${val.value} Load (ms):`, new Date().getTime() - now.getTime())
    await nextTick()
    console.log(`${val.value} Render (ms):`, new Date().getTime() - now.getTime())
  } else {
    console.error(`Module not found: ${modulePath}`)
  }
})

const colorClass = (color: string) => {
  let newColor = 'bg-' + color
  if (color !== 'black') newColor += '-8'
  if (textColor.value === color) {
    newColor += ' active-color'
  }
  return newColor
}

const changeColor = (color: string) => {
  textColor.value = color
}

const onClick = (path: string, name: string) => {
  currentPath.value = path
  currentName.value = name
  showDialog.value = true
}

const onCopyName = (path: string, name: string) => {
  copyToClipboard(name).then(() => {
    $q.notify({
      message: `'${name}' copied to clipboard`,
      icon: path,
      color: 'white',
      textColor: 'primary',
    })
    showDialog.value = false
  })
}

const onCopySvg = (path: string, name: string) => {
  copyToClipboard(path).then(() => {
    $q.notify({
      message: `'${name}' SVG copied to clipboard`,
      icon: path,
      color: 'white',
      textColor: 'primary',
    })
    showDialog.value = false
  })
}
</script>

<style lang="scss">
.active-color {
  border: 1px dashed white;
}

.icon-box {
  color: #616161;
  border-radius: 4px;
  max-width: 200px;
  width: 100%;
  height: 60px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.14);
  }
}

body.body--dark {
  .icon-box {
    color: #fefefe;
  }
}

.intersetion-icon-box {
  border: 1px solid #cacaca;
  margin: 2px;
  border-radius: 4px;
  max-width: 200px;
  width: 100%;
  height: 60px;
}

.icons-footer {
  height: 60px;
}
</style>
