<template>
  <router-link v-if="internal === true" v-bind="$attrs" class="markdown-link" :to="to">
    <slot />
  </router-link>
  <a v-else v-bind="$attrs" class="markdown-link" :href="props.to" target="_blank" rel="noopener">
    <slot />
    <q-icon :name="mdiLaunch" />
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { mdiLaunch } from '@quasar/extras/mdi-v6'

const props = defineProps({ to: { type: String, required: true } })
const internal = computed(
  () => props.to.charAt(0) === '/' || props.to.charAt(0) === '.' || props.to.charAt(0) === '#',
)
</script>

<style lang="scss">
.markdown-link {
  color: $brand-primary;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
  outline: 0;
  transition: color $header-quick-transition;

  &:hover {
    color: inherit !important;
  }

  .q-icon {
    margin-top: -2px;
    margin-left: 4px;
  }
}
</style>
