<template>
  <div>
    <q-dialog ref="dialogRef" v-model="showDialog" @hide="onDialogHide">
      <q-card class="icon-dialog q-pa-md">
        <q-btn
          flat
          round
          dense
          icon="close"
          aria-label="Close icon preview"
          class="icon-dialog__close"
          @click="closeDialog"
        />
        <div class="row justify-center items-center" style="min-width: 400px; min-height: 300px">
          <q-icon :name="currentPath" size="128px" class="q-pa-xs" :class="colorClasses" />
          <span class="full-width text-center" style="font-size: 28px">{{ currentName }}</span>

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
            <q-btn push :icon="mdiContentCopy" @click="onCopyName(currentPath, currentName)">
              <q-tooltip>Copy name to clipboard</q-tooltip>
            </q-btn>
            <q-btn push label="SVG" @click="onCopySvg(currentPath, currentName)">
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
      <q-intersection v-for="(path, name) in icons" :key="name" once class="intersetion-icon-box">
        <div class="row justify-center icon-box" @click="onClick(path, name)">
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

<script setup lang="ts">
import { ref, computed, watch, nextTick, markRaw } from "vue";
import { useQuasar, copyToClipboard } from "quasar";
import {
  mdiCardSearchOutline,
  // mdiChevronUp,
  mdiContentCopy,
} from "@quasar/extras/mdi-v6";
import { iconSetMetadata } from "src/utils/icon-set-metadata";

const modules = import.meta.glob("../../../icons/**/index.mjs");

type IconSet = {
  label: string;
  value: string;
};

type ModuleImportInterface = Record<string, string>;

const $q = useQuasar();
const icon = ref<IconSet>();
const iconSets: IconSet[] = iconSetMetadata.map((row) => ({
  label: row.selectLabel,
  value: row.folder,
}));

const importedIcons = ref<ModuleImportInterface | null>(null);
const filter = ref<string>("");
const dialogRef = ref();
const showDialog = ref<boolean>(false);
const currentPath = ref<string>("");
const currentName = ref<string>("");
const textColor = ref<string>("black");
const suppressIconClick = ref<boolean>(false);
const colors = [
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
];
const inverted = ref<boolean>(false);

const colorClasses = computed(() => {
  let color = "";
  let bgColor = "bg-white";
  if (inverted.value) {
    color += "bg-" + textColor.value;
    bgColor = "text-white";
  } else {
    color += "text-" + textColor.value;
  }
  if (textColor.value !== "black") color += "-8";
  return color + " " + bgColor;
});

const icons = computed(() => {
  const vals: Record<string, string> = {};
  const filterValue = filter.value && importedIcons.value ? filter.value.toLowerCase() : "";
  if (importedIcons.value) {
    Object.keys(importedIcons.value).forEach((name) => {
      if (filterValue === "" || name.toLowerCase().indexOf(filterValue) > -1) {
        vals[name] = importedIcons.value![name] as string;
      }
    });
  }
  return vals;
});

const filteredCount = computed(() => Object.keys(icons.value).length);
const iconCount = computed(() =>
  importedIcons.value ? Object.keys(importedIcons.value).length : 0,
);

watch(icon, async (val) => {
  if (!val) {
    importedIcons.value = null;
    return;
  }

  const now = new Date();
  const modulePath = `../../../icons/${val.value}/index.mjs`;
  if (modules[modulePath]) {
    const svgFile = (await modules[modulePath]()) as Record<string, string>;
    importedIcons.value = markRaw(svgFile);
    console.info(`${val.value} Load (ms):`, new Date().getTime() - now.getTime());
    await nextTick();
    console.info(`${val.value} Render (ms):`, new Date().getTime() - now.getTime());
  } else {
    console.error(`Module not found: ${modulePath}`);
  }
});

const colorClass = (color: string) => {
  let newColor = "bg-" + color;
  if (color !== "black") newColor += "-8";
  if (textColor.value === color) {
    newColor += " active-color";
  }
  return newColor;
};

const changeColor = (color: string) => {
  textColor.value = color;
};

const closeDialog = () => {
  showDialog.value = false;
};

const onDialogHide = () => {
  suppressIconClick.value = true;
  window.setTimeout(() => {
    suppressIconClick.value = false;
  }, 150);
};

const onClick = (path: string, name: string) => {
  if (suppressIconClick.value) {
    return;
  }

  currentPath.value = path;
  currentName.value = name;
  showDialog.value = true;
};

const onCopyName = (path: string, name: string) => {
  copyToClipboard(name).then(() => {
    $q.notify({
      message: `'${name}' copied to clipboard`,
      icon: path,
      color: "white",
      textColor: "primary",
    });
    showDialog.value = false;
  });
};

const onCopySvg = (path: string, name: string) => {
  copyToClipboard(path).then(() => {
    $q.notify({
      message: `'${name}' SVG copied to clipboard`,
      icon: path,
      color: "white",
      textColor: "primary",
    });
    showDialog.value = false;
  });
};
</script>

<style lang="scss">
.icon-dialog {
  position: relative;
}

.icon-dialog__close {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.active-color {
  border: 1px dashed white;
}

.icon-box {
  color: #616161;
  border-radius: 4px;
  max-width: 200px;
  width: 100%;
  height: 60px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.14);
  }
}

body.body--dark {
  .icon-box {
    color: #fefefe;
  }
}

.intersetion-icon-box {
  border: 1px solid #cacaca;
  margin: 2px;
  border-radius: 4px;
  max-width: 200px;
  width: 100%;
  height: 60px;
}

.icons-footer {
  height: 60px;
}
</style>
