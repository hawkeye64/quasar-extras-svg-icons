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
        v-for="icon in iconInfo"
        :key="icon.title"
        :title="icon.title"
        :side="icon.side"
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
        side: 'left',
        src: '/akar-icons.png'
      },
      {
        title: 'Ant Design Icons',
        side: 'right',
        src: '/ant-design-icons.png'
      },
      {
        title: 'Box Icons',
        side: 'left',
        src: '/box-icons.png'
      },
      {
        title: 'Carbon Icons',
        side: 'right',
        src: '/carbon-icons.png'
      },
      {
        title: 'Carbon Pictograms',
        side: 'left',
        src: '/carbon-pictograms.png'
      },
      {
        title: 'Codicons',
        side: 'right',
        src: '/codicons.png'
      },
      {
        title: 'Cool Icons',
        side: 'left',
        src: '/cool-icons.png'
      },
      {
        title: 'Country Flag Icons',
        side: 'right',
        src: '/country-flag-icons.png'
      },
      {
        title: 'Entypo Icons',
        side: 'left',
        src: '/entypo-icons.png'
      },
      {
        title: 'FluentUI Systems Icons',
        side: 'right',
        src: '/fluentui-icons.png'
      },
      {
        title: 'Health Icons',
        side: 'left',
        src: '/health-icons.png'
      },
      {
        title: 'Hero Icons (outline)',
        side: 'right',
        src: '/hero-icons-outline.png'
      },
      {
        title: 'Hero Icons (solid)',
        side: 'left',
        src: '/hero-icons-solid.png'
      },
      {
        title: 'Grid Icons',
        side: 'right',
        src: '/grid-icons.png'
      },
      {
        title: 'Icomoon Free Icons',
        side: 'left',
        src: '/icomoon-free-icons.png'
      },
      {
        title: 'Iconoir',
        side: 'right',
        src: '/iconoir.png'
      },
      {
        title: 'Jam Icons',
        side: 'left',
        src: '/jam-icons.png'
      },
      {
        title: 'Material Line Icons',
        side: 'right',
        src: '/material-line-icons.png'
      },
      {
        title: 'Octicons',
        side: 'left',
        src: '/octicons.png'
      },
      {
        title: 'Pixel Art Icons',
        side: 'right',
        src: '/pixelart-icons.png'
      },
      {
        title: 'Prime Icons',
        side: 'left',
        src: '/prime-icons.png'
      },
      {
        title: 'Radix-UI Icons',
        side: 'right',
        src: '/radix-ui-icons.png'
      },
      {
        title: 'Remix Icons',
        side: 'left',
        src: '/remix-icons.png'
      },
      {
        title: 'Simple Icons',
        side: 'right',
        src: '/simple-icons.png'
      },
      {
        title: 'System UIcons',
        side: 'left',
        src: '/system-uicons.png'
      },
      {
        title: 'Tabler Icons',
        side: 'right',
        src: '/tabler-icons.png'
      },
      {
        title: 'Teeny Icons',
        side: 'left',
        src: '/teeny-icons.png'
      },
      {
        title: 'UIW Icons',
        side: 'right',
        src: '/uiw-icons.png'
      },
      {
        title: 'Unicons',
        side: 'left',
        src: '/unicons.png'
      },
      {
        title: 'Vaadin Icons',
        side: 'right',
        src: '/vaadin-icons.png'
      },
      {
        title: 'Weather Icons',
        side: 'left',
        src: '/weather-icons.png'
      },
      {
        title: 'Webfont Medical Icons',
        side: 'right',
        src: '/webfont-medical-icons.png'
      },
      {
        title: 'Zond Icons',
        side: 'left',
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
