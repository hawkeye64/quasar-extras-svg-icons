<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { provideMarkdownStore } from 'assets/markdown-store.js'
import getMeta from 'assets/get-meta.js'

export default defineComponent({
  name: 'App',

  setup () {
    useMeta({
      title: 'quasar-extras-svg-icons » more SVG icons for your Quasar apps',
      titleTemplate: title => `${ title } » quasar-extras-svg-icons`,

      meta: getMeta(
        'quasar-extras-svg-icons - more SVG icons for your Quasar apps',
        'quasar-extras-svg-icons gives you more SVG icons for your Quasar apps.'
      )
    })

    provideMarkdownStore()
  }
})
</script>
