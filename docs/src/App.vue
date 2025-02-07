<template>
  <router-view />
</template>

<script setup lang="ts">
import { useDark } from 'src/.q-press/composables/dark'
const { initDark } = useDark()
initDark()

import { useMeta } from 'quasar'
import getMeta from 'src/.q-press/assets/get-meta'

useMeta({
  title: 'Quasar Extras SVG Icons',
  titleTemplate: (title) => `${title} | SVG Icons`,

  meta: getMeta(
    'SVG Icons - Beautiful SVG Icon Sets for Your Quasar apps',
    'quasar-extras-svg-icons a collection of SVG packages that make it easy to integrate a wide arrange of SVG icons into Quasar applications.',
  ),
})
</script>
