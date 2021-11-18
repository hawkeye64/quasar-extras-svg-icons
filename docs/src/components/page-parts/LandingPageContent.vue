<template>
  <section class="flex flex-center bg-blue-10 text-white shadow-10">
    <div class="landing-page__container">
      <div class="landing-page__splash row justify-around items-center">
        <h2 class="text-weight-bold text-blue-2 q-pa-sm" style="padding-left: 20px;">Beautiful SVG<br>icon sets,<br>for your<br>Quasar apps</h2>
        <div class="q-pa-sm">
          <!-- TODO: Jeff - need image before publishing -->
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
        title="Box Icons"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\box-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="FluentUI Systems Icons"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\fluentui-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Hero Icons (outline)"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\hero-icons-outline.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Hero Icons (solid)"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\hero-icons-solid.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Iconoir"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\iconoir.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Jam Icons"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\jam-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Octicons"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\octicons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Pixel Art Icons"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\pixelart-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Prime Icons"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\prime-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Remix Icons"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\remix-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Simple Icons"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\simple-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Tabler Icons"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\tabler-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Unicons"
        side="left"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\unicons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Zond Icons"
        side="right"
      >
        <div>
          <q-intersection
            transition="scale"
            once
          >
            <q-img
              src="\zond-icons.png"
              spinner-color="white"
              style="max-width: 350px"
              class="shadow-12 rounded-borders"
            />
          </q-intersection>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>

</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'
import {
  biArrowRightCircle
} from '@quasar/extras/bootstrap-icons'

export default defineComponent({
  name: 'Landing Page Content',

  setup () {
    const $q = useQuasar()

    const layout = computed(() => {
      return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
    })

    return {
      layout,
      biArrowRightCircle
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
