<template>
  <q-card flat bordered>
    <q-card-section v-if="error" class="row no-wrap items-center">
      <q-icon name="warning" size="24px" color="negative" class="q-mr-sm" />
      <div>Cannot connect to GitHub. Try again later.</div>
    </q-card-section>

    <q-card-section v-else-if="loading" class="row no-wrap items-center">
      <q-spinner size="24px" color="primary" class="q-mr-sm" />
      <div>Loading release notes from GitHub</div>
    </q-card-section>

    <template v-else>
      <q-input
        v-model="search"
        dense
        square
        borderless
        placeholder="Search releases..."
        clearable
        class="q-mx-md"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-separator />

      <q-splitter :model-value="24" :limits="[18, 44]" class="release__splitter">
        <template #before>
          <q-scroll-area>
            <q-tabs
              v-model="selectedVersion"
              vertical
              active-color="primary"
              active-bg-color="blue-1"
              indicator-color="primary"
            >
              <q-tab
                v-for="releaseInfo in filteredReleases"
                :key="releaseInfo.label"
                :name="releaseInfo.label"
              >
                <div class="q-tab__label">{{ releaseInfo.version }}</div>
                <small class="text-grey-7">{{ releaseInfo.date }}</small>
              </q-tab>
            </q-tabs>
          </q-scroll-area>
        </template>

        <template #after>
          <q-tab-panels
            v-if="filteredReleases.length > 0"
            v-model="selectedVersion"
            animated
            transition-prev="slide-down"
            transition-next="slide-up"
            class="release__panels"
          >
            <q-tab-panel
              v-for="releaseInfo in filteredReleases"
              :key="releaseInfo.label"
              :name="releaseInfo.label"
              class="q-pa-none"
            >
              <q-scroll-area>
                <div class="release__body q-pa-md" v-html="renderRelease(releaseInfo.body)" />
              </q-scroll-area>
            </q-tab-panel>
          </q-tab-panels>

          <div v-else class="q-pa-md text-grey-7">No releases match your search.</div>
        </template>
      </q-splitter>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { date } from 'quasar'

interface GitHubRelease {
  name?: string
  tag_name?: string
  published_at: string
  body?: string
}

interface ReleaseInfo {
  version: string
  date: string
  body: string
  label: string
}

const { extractDate, formatDate } = date

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

const loading = ref(false)
const error = ref(false)
const search = ref('')
const selectedVersion = ref<string>()
const releases = ref<ReleaseInfo[]>([])

const filteredReleases = computed(() => {
  const value = search.value.trim().toLowerCase()

  if (value === '') {
    return releases.value
  }

  return releases.value.filter((release) => {
    return (
      release.version.toLowerCase().includes(value) || release.body.toLowerCase().includes(value)
    )
  })
})

watch(filteredReleases, (value) => {
  if (value.some((release) => release.label === selectedVersion.value) === false) {
    selectedVersion.value = value[0]?.label
  }
})

function getReleaseVersion(release: GitHubRelease): string | undefined {
  const name = release.name || release.tag_name || ''
  const match = name.match(/(?:^|\s)v?(\d+\.\d+\.\d+(?:[-\w.]+)?)/)

  return match?.[1] ?? release.tag_name?.replace(/^v/, '')
}

function renderRelease(body: string): string {
  return markdown.render(body)
}

async function queryReleases(): Promise<void> {
  loading.value = true
  error.value = false

  try {
    const response = await fetch(
      'https://api.github.com/repos/hawkeye64/quasar-extras-svg-icons/releases?per_page=100',
    )

    if (response.ok === false) {
      throw new Error(`GitHub request failed with ${response.status}`)
    }

    const parsedReleases = ((await response.json()) as GitHubRelease[])
      .map((release) => {
        const version = getReleaseVersion(release)

        if (version === undefined) {
          return null
        }

        return {
          version,
          date: formatDate(extractDate(release.published_at, 'YYYY-MM-DD'), 'YYYY-MM-DD'),
          body: release.body || '',
          label: version,
        }
      })
      .filter((release): release is ReleaseInfo => release !== null)
      .sort((a, b) => {
        return (
          Number.parseInt(b.date.replace(/-/g, ''), 10) -
          Number.parseInt(a.date.replace(/-/g, ''), 10)
        )
      })

    if (parsedReleases.length === 0) {
      throw new Error('No releases returned from GitHub')
    }

    releases.value = parsedReleases
    selectedVersion.value = parsedReleases[0]?.label
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(queryReleases)
</script>

<style lang="scss">
.release__splitter .q-scrollarea {
  height: min(70vh, 620px);
}

.release__body {
  overflow-wrap: anywhere;

  h1,
  h2,
  h3 {
    margin: 0 0 16px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  ul,
  ol {
    margin: 8px 0 16px;
    padding-left: 28px;
  }

  li {
    margin: 4px 0;
    padding-left: 4px;
  }

  pre {
    background: rgba(0, 0, 0, 0.06);
    border-radius: $generic-border-radius;
    padding: 12px;
    overflow-x: auto;
  }

  code {
    background: rgba($primary, 0.08);
    border-radius: 4px;
    padding: 1px 4px;
  }

  pre code {
    background: transparent;
    padding: 0;
  }

  blockquote {
    background: rgba($primary, 0.06);
    border-left: 4px solid $primary;
    margin: 16px 0;
    padding: 8px 12px;
  }

  table {
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    width: 100%;
  }

  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 6px 10px;
  }
}
</style>
