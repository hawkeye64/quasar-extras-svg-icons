import { boot } from 'quasar/wrappers'
import MarkdownPage from '../components/MarkdownPage.vue'
import MarkdownLink from '../components/MarkdownLink.vue'

export default boot(({ app }) => {
  app.component('MarkdownPage', MarkdownPage)
  app.component('MarkdownLink', MarkdownLink)
})
