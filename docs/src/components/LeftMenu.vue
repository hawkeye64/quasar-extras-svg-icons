<template>
  <div>
    <docs-menu />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DocsMenu from './DocsMenu.js'

export default defineComponent({
  name: 'LeftMenu',
  components: {
    DocsMenu
  }
})
</script>
