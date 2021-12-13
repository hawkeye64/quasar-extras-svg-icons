<template>
  <section class="flex flex-center bg-blue-10 text-white shadow-10">
    <q-dialog ref="dialogRef" v-model="showDialog">
      <q-img
        :src="currentImage"
        spinner-color="white"
        class="shadow-12 rounded-borders"
      />
    </q-dialog>

    <div class="landing-page__container">
      <div class="landing-page__splash row justify-around items-center">
        <h2 class="text-weight-bold text-blue-2 q-pa-sm" style="padding-left: 20px;">Beautiful SVG<br>icon sets,<br>for your<br>Quasar apps</h2>
        <div class="q-pa-sm">
          <img
            src="/hero-icons-outline.png"
            class="shadow-10 rounded-borders"
            style="max-width: 340px;"
          />
        </div>
      </div>
    </div>
    <div class="full-width row justify-center q-pb-xl">
      <q-btn
        to="/all-about-quasar-extras-svg-icons/what-is-quasar-extras-svg-icons"
        no-caps
        class="bg-red-8"
      >
        <div class="row justify-around items-center" style="width: 140px;">
          <div>Get started</div>
          <q-icon :name="biArrowRightCircle"/>
        </div>
      </q-btn>
    </div>
  </section>

  <div class="q-px-lg q-pb-xl">
    <q-timeline :layout="layout" color="primary q-mb-xl">

      <q-timeline-entry heading>
        <div style="font-size: 32px; font-weight: 600;">Quasar Extras SVG Icons</div>
        <div style="font-size: 22px; font-weight: 600;" class="text-grey">More SVG icons for your Quasar apps</div>
      </q-timeline-entry>

      <q-timeline-entry
        v-for="(icon, index) in iconInfo"
        :key="icon.title"
        :title="icon.title"
        :side="index % 2 ? 'left' : 'right'"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              :src="icon.src"
              spinner-color="white"
              width="350px"
              class="shadow-12 rounded-borders cursor-pointer"
              @click="currentImage = icon.src; showDialog = true"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import {
  biArrowRightCircle
} from '@quasar/extras/bootstrap-icons'

export default defineComponent({
  name: 'Landing Page Content',

  setup () {
    const $q = useQuasar()
    const showDialog = ref(false)
    const currentImage = ref(null)

    const layout = computed(() => {
      return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
    })

    const iconInfo = [
      {
        title: 'Akar Icons',
        src: '/akar-icons.png'
      },
      {
        title: 'Ant Design Icons',
        src: '/ant-design-icons.png'
      },
      {
        title: 'Box Icons',
        src: '/box-icons.png'
      },
      {
        title: 'Bytesize Icons',
        src: '/bytesize-icons.png'
      },
      {
        title: 'Carbon Icons',
        src: '/carbon-icons.png'
      },
      {
        title: 'Carbon Pictograms',
        src: '/carbon-pictograms.png'
      },
      {
        title: 'Codicons',
        src: '/codicons.png'
      },
      {
        title: 'Cool Icons',
        src: '/cool-icons.png'
      },
      {
        title: 'CoreUI Icons',
        src: '/coreui-icons.png'
      },
      {
        title: 'Country Flag Icons',
        src: '/country-flag-icons.png'
      },
      {
        title: 'Dev Icons',
        src: '/dev-icons.png'
      },
      {
        title: 'Drip Icons',
        src: '/drip-icons.png'
      },
      {
        title: 'Elusive Icons',
        src: '/elusive-icons.png'
      },
      {
        title: 'Entypo+ Icons',
        src: '/entypo-icons.png'
      },
      {
        title: 'Evil Icons',
        src: '/evil-icons.png'
      },
      {
        title: 'Feather Icons',
        src: '/feather-icons.png'
      },
      {
        title: 'FlatUI Icons',
        src: '/flatui-icons.png'
      },
      {
        title: 'FluentUI Systems Icons',
        src: '/fluentui-icons.png'
      },
      {
        title: 'Foundation Icons',
        src: '/foundation-icons.png'
      },
      {
        title: 'Geom Icons',
        src: '/geom-icons.png'
      },
      {
        title: 'Grid Icons',
        src: '/grid-icons.png'
      },
      {
        title: 'Health Icons',
        src: '/health-icons.png'
      },
      {
        title: 'Hero Icons',
        src: '/hero-icons-outline.png'
      },
      {
        title: 'Icomoon Free Icons',
        src: '/icomoon-free-icons.png'
      },
      {
        title: 'Iconoir',
        src: '/iconoir.png'
      },
      {
        title: 'Ikonate',
        src: '/ikonate.png'
      },
      {
        title: 'Ikons',
        src: '/ikons.png'
      },
      {
        title: 'Jam Icons',
        src: '/jam-icons.png'
      },
      {
        title: 'Maki Icons (Mapbox)',
        src: '/maki-icons.png'
      },
      {
        title: 'Material Line Icons',
        src: '/material-line-icons.png'
      },
      {
        title: 'Octicons (Prime)',
        src: '/octicons.png'
      },
      {
        title: 'Open Iconic',
        src: '/open-iconic.png'
      },
      {
        title: 'Pixel Art Icons',
        src: '/pixelart-icons.png'
      },
      {
        title: 'Prime Icons',
        src: '/prime-icons.png'
      },
      {
        title: 'Radix-UI Icons',
        src: '/radix-ui-icons.png'
      },
      {
        title: 'Remix Icons',
        src: '/remix-icons.png'
      },
      {
        title: 'Simple Icons',
        src: '/simple-icons.png'
      },
      {
        title: 'Simple Line Icons',
        src: '/simple-line-icons.png'
      },
      {
        title: 'Subway Icons',
        src: '/subway-icons.png'
      },
      {
        title: 'System UIcons',
        src: '/system-uicons.png'
      },
      {
        title: 'Tabler Icons',
        src: '/tabler-icons.png'
      },
      {
        title: 'Teeny Icons',
        src: '/teeny-icons.png'
      },
      {
        title: 'UIW Icons',
        src: '/uiw-icons.png'
      },
      {
        title: 'Unicons',
        src: '/unicons.png'
      },
      {
        title: 'Vaadin Icons',
        src: '/vaadin-icons.png'
      },
      {
        title: 'Weather Icons',
        src: '/weather-icons.png'
      },
      {
        title: 'Webfont Medical Icons',
        src: '/webfont-medical-icons.png'
      },
      {
        title: 'Windows Icons',
        src: '/windows-icons.png'
      },
      {
        title: 'Zond Icons',
        src: '/zond-icons.png'
      }
    ]

    return {
      layout,
      biArrowRightCircle,
      iconInfo,
      showDialog,
      currentImage
    }
  }
})
</script>

<style lang="sass" scoped>
.landing-page-container
  position: relative
  margin: 0 auto
  @media (max-width: $breakpoint-xs-max)
    max-width: 340px
    width: 340px
  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max)
    max-width: 480px
    width: 480px
  @media (min-width: $breakpoint-lg-min)
    max-width: 960px
    width: 960px

.landing-page__splash
  @media (max-width: $breakpoint-xs-max)
    padding: 0
  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max)
    padding: 30px 0 60px
  @media (min-width: $breakpoint-lg-min)
    padding: 50px 0 100px

.landing-page__splash--content
  max-width: 500px

</style>
