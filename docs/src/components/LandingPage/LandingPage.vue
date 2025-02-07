<template>
  <div class="landing-page markdown-brand">
    <q-dialog ref="dialogRef" v-model="showDialog">
      <q-img :src="currentImage" spinner-color="white" class="shadow-12 rounded-borders" />
    </q-dialog>
    <header class="hero">
      <img src="/heart.png" alt="Quasar Extras SVG Icons Logo" class="hero-logo" />
      <h1 class="hero-title">Quasar Extras SVG Icons</h1>
      <h2 class="hero-subtitle">Beautiful SVG Icon Sets for Your Quasar apps</h2>
      <div class="row justify-center">
        <p class="hero-subtitle2" style="max-width: 660px">
          {{ siteConfig.description }}
        </p>
      </div>

      <div class="hero-buttons">
        <router-link
          to="/getting-started/introduction"
          class="hero-button q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--rounded q-btn--dense"
        >
          <span
            class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
          >
            Get Started <q-icon :name="biArrowRightCircle" class="q-ml-sm" />
          </span>
        </router-link>
        <a
          href="https://github.com/hawkeye64/quasar-extras-svg-icons"
          target="_blank"
          class="hero-button q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--rounded q-btn--dense"
        >
          <span
            class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
          >
            <q-icon :name="fabGithub" class="q-mr-sm" />
            GitHub Repo
          </span>
        </a>
      </div>
    </header>
    <main class="content grid-container">
      <q-timeline :layout="layout" color="primary q-mb-xl">
        <q-timeline-entry heading>
          <div style="font-size: 32px; font-weight: 600">Quasar Extras SVG Icons</div>
          <div style="font-size: 22px; font-weight: 600" class="text-grey">
            More SVG icons for your Quasar apps
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          v-for="(icon, index) in iconInfo"
          :key="icon.title"
          :title="icon.title"
          :side="index % 2 ? 'left' : 'right'"
        >
          <div>
            <q-intersection transition="scale" once>
              <q-img
                :src="icon.src"
                spinner-color="white"
                width="350px"
                class="shadow-12 rounded-borders cursor-pointer"
                @click="((currentImage = icon.src), (showDialog = true))"
              />
            </q-intersection>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </main>
    <q-separator />
    <div class="byline">
      <p>
        Don't forget to check out the Q-Press app extension for Quasar to create beautiful
        documentation sites.
      </p>
      <p>
        This site is built with Q-Press! Install it, set it up, choose a theme and start your own
        site!
      </p>
    </div>
    <q-separator />
    <div class="byline">
      <p>
        We hope you find this documentation helpful. If you have any questions or need further
        assistance, please don't hesitate to reach out to our support team.
      </p>
      <p>Happy coding!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QIcon } from 'quasar'
import { fabGithub } from '@quasar/extras/fontawesome-v6'
import siteConfig from '../../siteConfig'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { biArrowRightCircle } from '@quasar/extras/bootstrap-icons'

const showDialog = ref(false)
const currentImage = ref('')

const $q = useQuasar()

const iconInfo = [
  {
    title: 'Akar Icons',
    src: '/akar-icons.png',
  },
  {
    title: 'Ant Design Icons',
    src: '/ant-design-icons.png',
  },
  {
    title: 'Box Icons',
    src: '/box-icons.png',
  },
  {
    title: 'Brand Icons',
    src: '/brand-icons.png',
  },
  {
    title: 'Brandico Icons',
    src: '/brandico-icons.png',
  },
  {
    title: 'Bytesize Icons',
    src: '/bytesize-icons.png',
  },
  {
    title: 'Carbon Icons',
    src: '/carbon-icons.png',
  },
  {
    title: 'Carbon Pictograms',
    src: '/carbon-pictograms.png',
  },
  {
    title: 'Clarity Icons',
    src: '/clarity-icons.png',
  },
  {
    title: 'Codicons',
    src: '/codicons.png',
  },
  {
    title: 'Cool Icons',
    src: '/cool-icons.png',
  },
  {
    title: 'CoreUI Icons',
    src: '/coreui-icons.png',
  },
  {
    title: 'Country Flag Icons',
    src: '/country-flag-icons.png',
  },
  {
    title: 'Dashicons',
    src: '/dashicons.png',
  },
  {
    title: 'Dev Icons',
    src: '/dev-icons.png',
  },
  {
    title: 'Drip Icons',
    src: '/drip-icons.png',
  },
  {
    title: 'Elusive Icons',
    src: '/elusive-icons.png',
  },
  {
    title: 'Entypo+ Icons',
    src: '/entypo-icons.png',
  },
  {
    title: 'Evil Icons',
    src: '/evil-icons.png',
  },
  {
    title: 'Feather Icons',
    src: '/feather-icons.png',
  },
  {
    title: 'Flat Color Icons (Icons8)',
    src: '/flat-color-icons.png',
  },
  {
    title: 'FlatUI Icons',
    src: '/flatui-icons.png',
  },
  {
    title: 'FluentUI Systems Icons',
    src: '/fluentui-icons.png',
  },
  {
    title: 'Fontisto Icons',
    src: '/fontisto-icons.png',
  },
  {
    title: 'Foundation Icons',
    src: '/foundation-icons.png',
  },
  {
    title: 'Geom Icons',
    src: '/geom-icons.png',
  },
  {
    title: 'GitLab Icons',
    src: '/gitlab-icons.png',
  },
  {
    title: 'Glyphs Brands',
    src: '/glyphs-brands.png',
  },
  {
    title: 'Glyphs Core Icons',
    src: '/glyphs-core-icons.png',
  },
  {
    title: 'Grid Icons',
    src: '/grid-icons.png',
  },
  {
    title: 'Health Icons',
    src: '/health-icons.png',
  },
  {
    title: 'Hero Icons',
    src: '/hero-icons-outline.png',
  },
  {
    title: 'Icomoon Free Icons',
    src: '/icomoon-free-icons.png',
  },
  {
    title: 'Iconoir',
    src: '/iconoir.png',
  },
  {
    title: 'IconPark Icons',
    src: '/iconpark-icons.png',
  },
  {
    title: 'Ikonate',
    src: '/ikonate.png',
  },
  {
    title: 'Ikons',
    src: '/ikons.png',
  },
  {
    title: 'Jam Icons',
    src: '/jam-icons.png',
  },
  {
    title: 'Keyrune Icons',
    src: '/keyrune-icons.png',
  },
  {
    title: 'Linear Icons',
    src: '/linear-icons.png',
  },
  {
    title: 'Linecons',
    src: '/linecons.png',
  },
  {
    title: 'Maki Icons (Mapbox)',
    src: '/maki-icons.png',
  },
  {
    title: 'Map Icons',
    src: '/map-icons.png',
  },
  {
    title: 'Material Line Icons',
    src: '/material-line-icons.png',
  },
  {
    title: 'Material Theme Icons',
    src: '/material-theme-icons.png',
  },
  {
    title: 'Octicons (Prime)',
    src: '/octicons.png',
  },
  {
    title: 'Open Iconic',
    src: '/open-iconic.png',
  },
  {
    title: 'Openmoji Icons',
    src: '/openmoji-icons.png',
  },
  {
    title: 'Phosphor Icons',
    src: '/phosphor-icons.png',
  },
  {
    title: 'Pixel Art Icons',
    src: '/pixelart-icons.png',
  },
  {
    title: 'Prime Icons',
    src: '/prime-icons.png',
  },
  {
    title: 'Radix-UI Icons',
    src: '/radix-ui-icons.png',
  },
  {
    title: 'Remix Icons',
    src: '/remix-icons.png',
  },
  {
    title: 'Simple Icons',
    src: '/simple-icons.png',
  },
  {
    title: 'Simple Line Icons',
    src: '/simple-line-icons.png',
  },
  {
    title: 'Stroke 7 Icons (Pixeden)',
    src: '/stroke7-icons.png',
  },
  {
    title: 'Subway Icons',
    src: '/subway-icons.png',
  },
  {
    title: 'System UIcons',
    src: '/system-uicons.png',
  },
  {
    title: 'Tabler Icons',
    src: '/tabler-icons.png',
  },
  {
    title: 'Teeny Icons',
    src: '/teeny-icons.png',
  },
  {
    title: 'Typicons',
    src: '/typ-icons.png',
  },
  {
    title: 'UIW Icons',
    src: '/uiw-icons.png',
  },
  {
    title: 'Unicons',
    src: '/unicons.png',
  },
  {
    title: 'Vaadin Icons',
    src: '/vaadin-icons.png',
  },
  {
    title: 'Weather Icons',
    src: '/weather-icons.png',
  },
  {
    title: 'Webfont Medical Icons',
    src: '/webfont-medical-icons.png',
  },
  {
    title: 'Windows Icons',
    src: '/windows-icons.png',
  },
  {
    title: 'Zond Icons',
    src: '/zond-icons.png',
  },
]

const layout = computed(() => {
  return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose'
})
</script>

<style lang="scss" scoped>
.landing-page {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.hero {
  background: linear-gradient(135deg, $brand-primary, $brand-secondary);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.hero-logo {
  max-width: 200px;
  margin-bottom: 20px;
  border-radius: 50%;
}

.hero-title {
  font-size: 3.5em;
  line-height: 1.2em;
  font-weight: 700;
  margin: 0;
  padding: 0.2em 0;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
  font-size: 1.8em;
  line-height: 1.8em;
  margin: 0;
}

.hero-subtitle2 {
  font-size: 1.2em;
  line-height: 1.2em;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.hero-button {
  background: white;
  color: $brand-primary;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.hero-button:hover {
  background: #f0f0f0;
}

.byline {
  text-align: center;
  font-size: 1.2em;
  margin: 20px 0;
  color: #35495e;
}

body.body--dark .byline {
  color: #f0f0f0;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 100%;
  justify-content: center;
  align-content: center;
}

.grid-item {
  // aspect-ratio: 1 / 1;
  cursor: pointer;
}

.section {
  flex: 1 1 300px;
  margin: 20px;
  padding: 20px;
  color: white;
  text-decoration: none;
  background: linear-gradient(135deg, $brand-primary, $brand-secondary);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.section:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  // change mouseover effects
  cursor: pointer;
}

.section h2 {
  margin-top: 0;
  color: white;
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.00735em;
  font-weight: 700;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.section ul {
  list-style: none;
  padding: 0;
}

.section ul li {
  margin: 10px 0;
}

.section ul li a {
  color: #35495e;
  text-decoration: none;
  transition: color 0.3s;
}

.section ul li a:hover {
  color: $brand-primary;
}

.footer {
  text-align: center;
  padding: 20px;
  background: #35495e;
  color: white;
}
</style>
