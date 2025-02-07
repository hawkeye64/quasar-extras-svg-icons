import { scroll } from 'quasar'
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMarkdownStore } from '../stores/markdown'
const { setVerticalScrollPosition, getVerticalScrollPosition } = scroll

export function useScroll() {
  let scrollTimer: ReturnType<typeof setTimeout> | undefined
  const scrollDuration = 500
  const route = useRoute()
  const router = useRouter()
  const markdownStore = useMarkdownStore()

  let preventTocUpdate = route.hash.length > 1

  // Watch for route changes
  watch(
    () => route.fullPath,
    (newRoute, oldRoute) => {
      setTimeout(() => {
        scrollToCurrentAnchor(newRoute !== oldRoute)
      })
    },
  )

  function changeRouterHash(hash: string) {
    if (route.hash !== hash) {
      router.replace({ hash }).catch(() => {})
    } else {
      scrollToCurrentAnchor()
    }
  }

  function scrollPage(el: HTMLElement, delay: number) {
    const { top } = el.getBoundingClientRect()
    const offset = Math.max(
      0,
      top + getVerticalScrollPosition(window) - 166, // TODO: dynamic header offset
    )

    clearTimeout(scrollTimer)

    preventTocUpdate = true
    setVerticalScrollPosition(window, offset, delay)

    scrollTimer = setTimeout(() => {
      preventTocUpdate = false
    }, delay + 10)
  }

  function scrollTo(id: string) {
    clearTimeout(scrollTimer)
    changeRouterHash('#' + id)

    setTimeout(() => {
      markdownStore.setActiveToc(getVerticalScrollPosition(window))
    }, scrollDuration + 50)
  }

  function onPageScroll({ position }: { position: number }) {
    // @ts-expect-error Jeff - fix later when I can figure this one out
    if (preventTocUpdate !== true && document.qScrollPrevented !== true) {
      markdownStore.setActiveToc(position)
    }
  }

  function scrollToCurrentAnchor(immediate?: boolean) {
    const hash = location.hash
    const el = hash.length > 1 ? document.getElementById(hash.substring(1)) : null

    if (el !== null) {
      if (immediate === true) {
        let anchorEl: HTMLElement | null = el
        while (
          anchorEl?.parentElement !== null &&
          !anchorEl.parentElement.classList.contains('q-page')
        ) {
          anchorEl = anchorEl.parentElement
        }

        if (anchorEl) {
          document.body.classList.add('q-scroll--lock')
          anchorEl.classList.add('q-scroll--anchor')

          setTimeout(() => {
            document.body.classList.remove('q-scroll--lock')
            if (anchorEl) {
              anchorEl.classList.remove('q-scroll--anchor')
            }
          }, 2000)
        }
      }

      scrollPage(el, immediate === true ? 0 : scrollDuration)
    } else {
      preventTocUpdate = false
      markdownStore.setActiveToc()
    }
  }

  onMounted(() => {
    setTimeout(() => {
      scrollToCurrentAnchor(true)
    })
  })

  onBeforeUnmount(() => {
    clearTimeout(scrollTimer)
  })

  return {
    scrollTo,
    onPageScroll,
  }
}
