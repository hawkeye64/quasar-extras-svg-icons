<template>
  <div class="fit">
    <q-dialog ref="dialogRef" v-model="showDialog">
      <q-card class="q-pa-md">

        <div class="row justify-center items-center" style="min-width: 400px; min-height: 300px;">
          <q-icon :name="currentPath" size="128px" class="q-pa-xs" :class="colorClasses" />
          <span class="full-width text-center" style="font-size: 28px;">{{ currentName }}</span>

          <div class="row justify-center">
            <div v-for="color in colors" :key="color" :class="colorClass(color)" style="width: 20px; height: 20px;" @click.stop="changeColor(color)" @mouseenter.stop="changeColor(color)"></div>
            <q-toggle v-model="inverted" label="Invert colors"
      />
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
      <q-select v-model="icon" dense outlined :options="iconSets" label="Select Icon set" style="width: 280px; margin: 2px;"/>
      <span>Totals: {{ filteredCount }}/{{ iconCount }}</span>
      <q-input borderless dense outlined debounce="300" clearable v-model="filter" placeholder="Search" style="margin: 2px;">
        <template v-slot:append>
          <q-icon v-if="!filter" :name="mdiCardSearchOutline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center">
      <q-intersection
        v-for="(path, name) in icons"
        :key="name"
        once
        class="intersetion-icon-box"
      >
        <div class="row justify-center icon-box" @click="onClick(path, name)">
          <q-icon :name="path" size="md" class="q-pa-xs column" />
          <div class="full-width text-center ellipsis" style="font-size: 9px;">{{ name }}</div>
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

<script>
import { defineComponent, markRaw } from 'vue'
import { copyToClipboard } from 'quasar'
import { mdiCardSearchOutline, mdiChevronUp, mdiContentCopy } from '@quasar/extras/mdi-v6'

export default defineComponent({
  name: 'SvgIconViewer',

  data () {
    return {
      mdiCardSearchOutline,
      mdiChevronUp,
      mdiContentCopy,
      icon: null,
      iconSets: [
        { label: 'Akar Icons', value: 'akar-icons' },
        { label: 'Ant Design Icons', value: 'ant-design-icons' },
        { label: 'Box Icons', value: 'box-icons' },
        { label: 'Bytesize Icons', value: 'bytesize-icons' },
        { label: 'Carbon Icons', value: 'carbon-icons' },
        { label: 'Carbon Pictograms', value: 'carbon-pictograms' },
        { label: 'Codicons', value: 'codicons' },
        { label: 'Cool Icons', value: 'cool-icons' },
        { label: 'Country Flag Icons', value: 'country-flag-icons' },
        { label: 'Entypo+ Icons', value: 'entypo-icons' },
        { label: 'Evil Icons', value: 'evil-icons' },
        { label: 'Feather Icons', value: 'feather-icons' },
        { label: 'FluentUI System Icons', value: 'fluentui-system-icons' },
        { label: 'Grid Icons', value: 'grid-icons' },
        { label: 'Hero Icons', value: 'hero-icons' },
        { label: 'Health Icons', value: 'health-icons' },
        { label: 'Icomoon Free Icons', value: 'icomoon-free-icons' },
        { label: 'Iconoir', value: 'iconoir-icons' },
        { label: 'Jam Icons', value: 'jam-icons' },
        { label: 'Material Line Icons', value: 'material-line-icons' },
        { label: 'Octicons', value: 'oct-icons' },
        { label: 'Open Iconic', value: 'open-iconic' },
        { label: 'Pixelart Icons', value: 'pixelart-icons' },
        { label: 'Prime Icons', value: 'prime-icons' },
        { label: 'Radix-UI Icons', value: 'radix-ui-icons' },
        { label: 'Remix Icon', value: 'remix-icons' },
        { label: 'Simple Icons', value: 'simple-icons' },
        { label: 'Simple Line Icons', value: 'simple-line-icons' },
        { label: 'System UIcons', value: 'system-uicons' },
        { label: 'Tabler Icons', value: 'tabler-icons' },
        { label: 'Teeny Icons', value: 'teeny-icons' },
        { label: 'UIW Icons', value: 'uiw-icons' },
        { label: 'Unicons', value: 'unicons' },
        { label: 'Vaadin Icons', value: 'vaadin-icons' },
        { label: 'Weather Icons', value: 'weather-icons' },
        { label: 'Webfont Medical Icons', value: 'webfont-medical-icons' },
        { label: 'Zond Icons', value: 'zond-icons' },
      ],
      importedIcons: null,
      filter: '',
      dialogRef: null,
      showDialog: false,
      currentPath: '',
      currentName: '',
      textColor: 'black',
      colors: [
        'black',
        'red', 'pink', 'purple', 'deep-purple', 'indigo',
        'blue', 'light-blue', 'cyan', 'teal', 'green',
        'light-green', 'lime', 'yellow', 'amber', 'orange',
        'deep-orange', 'brown', 'grey', 'blue-grey'
      ],
      inverted: false
    }
  },

  computed: {
    colorClasses () {
      let color = ''
      let bgColor = 'bg-white'
      if (this.inverted) {
        color += 'bg-' + this.textColor
        bgColor = 'text-white'
      }
      else {
        color += 'text-' + this.textColor
      }
      if (this.textColor !== 'black') color += '-8'
      return color + ' ' + bgColor
    },
    icons () {
      const vals = {}
      const filter = this.filter && this.importedIcons ? this.filter.toLowerCase() : ''
      Object.keys(this.importedIcons ? this.importedIcons : {}).forEach(name => {
        if (filter === '' || name.toLowerCase().indexOf(filter) > -1) {
          vals[ name ] = this.importedIcons[ name ]
        }
      })
      return vals
    },
    filteredCount () {
      return Object.keys(this.icons).length
    },
    iconCount () {
      return this.importedIcons ? Object.keys(this.importedIcons).length : 0
    }
  },

  watch: {
    icon (val) {
      if (!val) {
        this.importedIcons = null
        return
      }

      let now = new Date()
      import(
        /* webpackChunkName: "[request]" */
        /* webpackInclude: /index\.js$/ */
        /* webpackExclude: /build$/ */
        'quasar-extras-svg-icons/' + val.value
      ).then(async svgFile => {
        this.importedIcons = markRaw(svgFile)
        console.log(`${ val.value } Load (ms):`, new Date() - now)
        now = new Date()
        await this.$nextTick()
        console.log(`${ val.value } Render (ms):`, new Date() - now)
      })
    }
  },

  methods: {
    colorClass (color) {
      let newColor = 'bg-' + color
      if (color !== 'black') newColor += '-8'
      if (this.textColor === color) {
        newColor += ' active-color'
      }
      return newColor
    },

    changeColor (color) {
      this.textColor = color
    },

    onClick (path, name) {
      this.currentPath = path
      this.currentName = name
      this.showDialog = true
      // console.log(this.currentName, this.currentPath)
      // this.dialogRef.show()
    },

    onCopyName (path, name) {
      copyToClipboard(name)
        .then(() => {
          this.$q.notify({
            message: `'${ name }' copied to clipboard`,
            icon: path,
            color: 'white',
            textColor: 'primary'
          })
          this.showDialog = false
        })
    },

    onCopySvg (path, name) {
      copyToClipboard(path)
        .then(() => {
          this.$q.notify({
            message: `'${ name }' SVG copied to clipboard`,
            icon: path,
            color: 'white',
            textColor: 'primary'
          })
          this.showDialog = false
        })
    }
  }
})
</script>

<style lang="sass">
.active-color
  border: 1px dashed white

.icon-box
  border-radius: 4px
  max-width: 200px
  width: 100%
  height: 60px
  cursor: pointer
  &:hover
    background: rgba(0,0,0,.14)

.intersetion-icon-box
  border: 1px solid #cacaca
  margin: 2px
  border-radius: 4px
  max-width: 200px
  width: 100%
  height: 60px

.icons-footer
  height: 60px

</style>