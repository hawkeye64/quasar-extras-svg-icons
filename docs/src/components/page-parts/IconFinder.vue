<template>
  <div class="fit">
    <q-dialog ref="dialogRef" v-model="showDialog">
      <q-card class="q-pa-md">
        <div
          class="row justify-center items-center"
          style="min-width: 400px; min-height: 300px"
        >
          <q-icon
            :name="currentPath"
            size="128px"
            class="q-pa-xs"
            :class="colorClasses"
          />
          <span class="full-width text-center" style="font-size: 28px">{{
            currentName
          }}</span>

          <div class="row justify-center">
            <div
              v-for="color in colors"
              :key="color"
              :class="colorClass(color)"
              style="width: 20px; height: 20px"
              @click.stop="changeColor(color)"
              @mouseenter.stop="changeColor(color)"
            ></div>
            <q-toggle v-model="inverted" label="Invert colors" />
          </div>

          <q-separator />

          <q-btn-group push>
            <q-btn
              push
              :icon="mdiContentCopy"
              @click="onCopyName(currentPath, currentName)"
            >
              <q-tooltip>Copy name to clipboard</q-tooltip>
            </q-btn>
            <q-btn
              push
              label="SVG"
              @click="onCopySvg(currentPath, currentName)"
            >
              <q-tooltip>Copy SVG to clipboard</q-tooltip>
            </q-btn>
          </q-btn-group>
        </div>
      </q-card>
    </q-dialog>
    <div class="row justify-evenly items-center">
      <q-select
        v-model="icon"
        dense
        outlined
        :options="iconSets"
        label="Select Icon set"
        style="width: 280px; margin: 2px"
      />
      <span>Totals: {{ filteredCount }}/{{ iconCount }}</span>
      <q-input
        borderless
        dense
        outlined
        debounce="300"
        clearable
        v-model="filter"
        placeholder="Search"
        style="margin: 2px"
      >
        <template v-slot:append>
          <q-icon v-if="!filter" :name="mdiCardSearchOutline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center">
      <q-intersection
        v-for="(path, name) in icons"
        :key="name"
        once
        class="intersetion-icon-box"
      >
        <div
          class="row justify-center text-grey-8 icon-box"
          @click="onClick(path, name)"
        >
          <q-icon :name="path" size="md" class="q-pa-xs column" />
          <div class="full-width text-center ellipsis" style="font-size: 9px">
            {{ name }}
          </div>
        </div>
      </q-intersection>
    </div>

    <div class="icons-footer" />

    <!-- <q-page-scroller expand position="bottom" :scroll-offset="150" :offset="[0, 0]">
      <div class="col cursor-pointer q-pa-sm text-center glass">
        <q-icon :name="mdiChevronUp" size="lg" />
      </div>
    </q-page-scroller> -->
  </div>
</template>

<script>
import { defineComponent, markRaw } from "vue";
import { copyToClipboard } from "quasar";
import {
  mdiCardSearchOutline,
  mdiChevronUp,
  mdiContentCopy,
} from "@quasar/extras/mdi-v6";

export default defineComponent({
  name: "SvgIconViewer",

  data() {
    return {
      mdiCardSearchOutline,
      mdiChevronUp,
      mdiContentCopy,
      icon: null,
      iconSets: [
        { label: "Akar Icons", value: "akar-icons" },
        { label: "Ant Design Icons", value: "ant-design-icons" },
        { label: "Box Icons", value: "box-icons" },
        { label: "Brand Icons", value: "brand-icons" },
        { label: "Brandico Icons", value: "brandico-icons" },
        { label: "Bytesize Icons", value: "bytesize-icons" },
        { label: "Carbon Icons v11", value: "carbon-icons-v11" },
        { label: "Carbon Icons", value: "carbon-icons" },
        { label: "Carbon Pictograms v12", value: "carbon-pictograms-v12" },
        { label: "Carbon Pictograms", value: "carbon-pictograms" },
        { label: "Clarity Icons v6", value: "clarity-icons-v6" },
        { label: "Clarity Icons", value: "clarity-icons" },
        { label: "Codicons", value: "codicons" },
        { label: "Cool Icons v4", value: "cool-icons-v4" },
        { label: "Cool Icons v2", value: "cool-icons" },
        { label: "CoreUI Icons v3", value: "coreui-icons-v3" },
        { label: "CoreUI Icons", value: "coreui-icons" },
        { label: "Country Flag Icons", value: "country-flag-icons" },
        { label: "Dashicons", value: "dashicons" },
        { label: "Dev Icons", value: "dev-icons" },
        { label: "Drip Icons", value: "drip-icons" },
        { label: "Elusive Icons", value: "elusive-icons" },
        { label: "Entypo+ Icons", value: "entypo-icons" },
        { label: "Evil Icons", value: "evil-icons" },
        { label: "Feather Icons", value: "feather-icons" },
        { label: "Flat Color Icons (Icons8)", value: "flat-color-icons" },
        { label: "FlatUI Icons", value: "flatui-icons" },
        { label: "FluentUI System Icons", value: "fluentui-system-icons" },
        { label: "Fontisto Icons", value: "fontisto-icons" },
        { label: "Foundation Icons", value: "foundation-icons" },
        { label: "Geom Icons", value: "geom-icons" },
        { label: "GitLab Icons", value: "gitlab-icons" },
        { label: "Glyphs Brands", value: "glyphs-brands" },
        { label: "Glyphs Core Icons", value: "glyphs-core-icons" },
        { label: "Grid Icons", value: "grid-icons" },
        { label: "Hero Icons v2", value: "hero-icons-v2" },
        { label: "Hero Icons", value: "hero-icons" },
        { label: "Health Icons", value: "health-icons" },
        { label: "Icomoon Free Icons", value: "icomoon-free-icons" },
        { label: "Iconoir v6", value: "iconoir-icons-v6" },
        { label: "Iconoir v5", value: "iconoir-icons-v5" },
        { label: "Iconoir", value: "iconoir-icons" },
        { label: "IconPark Icons", value: "iconpark-icons" },
        { label: "Icons Material (mui)", value: "icons-material" },
        { label: "Ikonate", value: "ikonate" },
        { label: "Ikons", value: "ikons" },
        { label: "Jam Icons", value: "jam-icons" },
        { label: "Keyrune Icons", value: "keyrune-icons" },
        { label: "Linear Icons", value: "linear-icons" },
        { label: "Linecons", value: "linecons" },
        { label: "Maki Icons (Mapbox) v8", value: "maki-icons-v8" },
        { label: "Maki Icons (Mapbox)", value: "maki-icons" },
        { label: "Map Icons", value: "map-icons" },
        { label: "Material Line Icons", value: "material-line-icons" },
        { label: "Material Theme Icons v3", value: "material-theme-icons" },
        { label: "Material Theme Icons", value: "material-theme-icons-v3" },
        { label: "Modern Icons", value: "modern-icons" },
        { label: "Octicons v19", value: "oct-icons-v19" },
        { label: "Octicons v18", value: "oct-icons-v18" },
        { label: "Octicons v17", value: "oct-icons-v17" },
        { label: "Octicons", value: "oct-icons" },
        { label: "Open Iconic", value: "open-iconic" },
        { label: "Openmoji Icons v14", value: "openmoji-icons-v14" },
        { label: "Openmoji Icons", value: "openmoji-icons" },
        { label: "Phosphor Icons v2", value: "phosphor-icons-v2" },
        { label: "Phosphor Icons", value: "phosphor-icons" },
        { label: "Pixelart Icons", value: "pixelart-icons" },
        { label: "Prime Icons v6", value: "prime-icons-v6" },
        { label: "Prime Icons", value: "prime-icons" },
        { label: "Radix-UI Icons", value: "radix-ui-icons" },
        { label: "Remix Icons v3", value: "remix-icons-v3" },
        { label: "Remix Icons", value: "remix-icons" },
        { label: "Simple Icons v9", value: "simple-icons-v9" },
        { label: "Simple Icons v8", value: "simple-icons-v8" },
        { label: "Simple Icons v7", value: "simple-icons-v7" },
        { label: "Simple Icons", value: "simple-icons" },
        { label: "Simple Line Icons", value: "simple-line-icons" },
        { label: "Stroke 7 Icons (Pixeden)", value: "stroke7-icons" },
        { label: "System UIcons", value: "system-uicons" },
        { label: "Subway Icons", value: "subway-icons" },
        { label: "Tabler Icons v2", value: "tabler-icons-v2" },
        { label: "Tabler Icons", value: "tabler-icons" },
        { label: "Teeny Icons", value: "teeny-icons" },
        { label: "Typicons", value: "typ-icons" },
        { label: "UIW Icons", value: "uiw-icons" },
        { label: "Unicons", value: "unicons" },
        { label: "Vaadin Icons v24", value: "vaadin-icons-v24" },
        { label: "Vaadin Icons v23", value: "vaadin-icons-v23" },
        { label: "Vaadin Icons", value: "vaadin-icons" },
        { label: "Weather Icons", value: "weather-icons" },
        { label: "Webfont Medical Icons", value: "webfont-medical-icons" },
        { label: "Windows Icons", value: "windows-icons" },
        { label: "Zond Icons", value: "zond-icons" },
      ],
      importedIcons: null,
      filter: "",
      dialogRef: null,
      showDialog: false,
      currentPath: "",
      currentName: "",
      textColor: "black",
      colors: [
        "black",
        "red",
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deep-orange",
        "brown",
        "grey",
        "blue-grey",
      ],
      inverted: false,
    };
  },

  computed: {
    colorClasses() {
      let color = "";
      let bgColor = "bg-white";
      if (this.inverted) {
        color += "bg-" + this.textColor;
        bgColor = "text-white";
      }
 else {
        color += "text-" + this.textColor;
      }
      if (this.textColor !== "black") color += "-8";
      return color + " " + bgColor;
    },
    icons() {
      const vals = {};
      const filter
        = this.filter && this.importedIcons ? this.filter.toLowerCase() : "";
      Object.keys(this.importedIcons ? this.importedIcons : {}).forEach(
        (name) => {
          if (filter === "" || name.toLowerCase().indexOf(filter) > -1) {
            vals[ name ] = this.importedIcons[ name ];
          }
        }
      );
      return vals;
    },
    filteredCount() {
      return Object.keys(this.icons).length;
    },
    iconCount() {
      return this.importedIcons ? Object.keys(this.importedIcons).length : 0;
    },
  },

  watch: {
    icon(val) {
      if (!val) {
        this.importedIcons = null;
        return;
      }

      let now = new Date();
      import(
        /* webpackChunkName: "[request]" */
        /* webpackInclude: /index\.js$/ */
        /* webpackExclude: /build$/ */
        "quasar-extras-svg-icons/" + val.value
      ).then(async (svgFile) => {
        this.importedIcons = markRaw(svgFile);
        console.log(`${ val.value } Load (ms):`, new Date() - now);
        now = new Date();
        await this.$nextTick();
        console.log(`${ val.value } Render (ms):`, new Date() - now);
      });
    },
  },

  methods: {
    colorClass(color) {
      let newColor = "bg-" + color;
      if (color !== "black") newColor += "-8";
      if (this.textColor === color) {
        newColor += " active-color";
      }
      return newColor;
    },

    changeColor(color) {
      this.textColor = color;
    },

    onClick(path, name) {
      this.currentPath = path;
      this.currentName = name;
      this.showDialog = true;
      // console.log(this.currentName, this.currentPath)
      // this.dialogRef.show()
    },

    onCopyName(path, name) {
      copyToClipboard(name).then(() => {
        this.$q.notify({
          message: `'${ name }' copied to clipboard`,
          icon: path,
          color: "white",
          textColor: "primary",
        });
        this.showDialog = false;
      });
    },

    onCopySvg(path, name) {
      copyToClipboard(path).then(() => {
        this.$q.notify({
          message: `'${ name }' SVG copied to clipboard`,
          icon: path,
          color: "white",
          textColor: "primary",
        });
        this.showDialog = false;
      });
    },
  },
});
</script>

<style lang="sass">
.active-color
  border: 1px dashed white

.icon-box
  border-radius: 4px
  max-width: 200px
  width: 100%
  height: 60px
  cursor: pointer
  &:hover
    background: rgba(0,0,0,.14)

.intersetion-icon-box
  border: 1px solid #cacaca
  margin: 2px
  border-radius: 4px
  max-width: 200px
  width: 100%
  height: 60px

.icons-footer
  height: 60px
</style>
