---
title: Introduction
desc: More SVG icons for your Quasar apps
keys: All about quasar-extras-svg-icons
---

<script import>
import IconSetTable from '@/components/IconSetTable.vue'
</script>

::: tip
If you're looking to help out, check out the [Contributing guide](/other/contributing/overview).
:::

## What is quasar-extras-svg-icons?

## Why?

Why this package? Because it strips down unnecessary package files (so faster download times), all in one place, tested and ready to use with Quasar. One other reason is that this package complements the `@quasar/extras` package by adding additional SVG Icons that you can use in your Quasar apps. These SVG icons have gone through a process known as `flattening`. As mentioned, it strips out unnecessary code to make them smaller and more efficient. Unfortunately, not all icon sets meet this criteria and fail.

Additionally, most icon sets have fixed colors. Our flattening process also includes the ability to change these colors to 'currentColor' so you have more control over the way the icon looks when you use our icon sets. Of course, this doesn't apply to some icons sets where the fixed colors are mandatory (like flags). In some cases, we have created a "two-tone" icon set by not only employing the 'currentColor', but then also using 'currentColor' with an opacity in the same icon.

When an upstream SVG is valid but cannot fit Quasar's compact path-string format directly, the package can use a small, package-owned override SVG. Overrides stay plain-path and QIcon-compatible, and they are reserved for reviewed fixes such as missing source icons, harmless package glitches, or visually checked recovery work.

Many of the icon sets are not installable via NPM or NPM version does not coincide with GitHub version (out of sync), so this may be the only way to access them without bloating your project.

Plus, TypeScript type definition files are generated so you won't get any warnings when using the icons.

For icon sets with multiple major releases, the package keeps at most two major
versions: the current major and the immediately preceding major. When a newer
major is added, its oldest shipped major is removed. Review the release notes
before upgrading if your application imports a versioned icon-set folder.

## Contents

Please make sure you have latest `quasar-extras-svg-icons` npm package version installed into your project folder in order for you to benefit from everything below.

### SVG

> Quasar v1.7+ required for svg Quasar Icon Sets.

Rows are generated from the shipped `index.d.ts` files, so versions and icon counts reflect the current package output. Prefixes are the exported variable prefix(es) used when importing icons. Upstream license files are shipped in each icon-set folder when available.

<IconSetTable />

```tabs
<<| html Vue Script Setup |>>
// some .vue file in devland
<template>
  <div>
    <q-icon :name="tabMenu" />
    <q-btn :icon="pixCalendarMonth" />
  </div>
</template>

<script setup lang="ts">
  import { tabOutlineMenu as tabMenu } from 'quasar-extras-svg-icons/tabler-icons-v3'
  import { pixCalendarMonth } from 'quasar-extras-svg-icons/pixelart-icons'
</script>
<<| html Vue Composition API |>>
// some .vue file in devland
<template>
  <div>
    <q-icon :name="tabMenu" />
    <q-btn :icon="pixCalendarMonth" />
  </div>
</template>

<script>
import { tabOutlineMenu as tabMenu } from 'quasar-extras-svg-icons/tabler-icons-v3'
import { pixCalendarMonth } from 'quasar-extras-svg-icons/pixelart-icons'

export default {
  setup () {
    return {
      tabMenu,
      pixCalendarMonth
    }
  }
}
</script>
```

### Replacing Quasar Icons

If you wanted to replace a Quasar icon being used in a component, then you have access to modifying the icon set directly.

This example uses Vue 3 `script setup`, but you can adapt it for your needs:

```html
<script setup>
  import { useQuasar } from 'quasar'
  import { remArrowDownCircleFill } from 'quasar-extras-svg-icons/remix-icons-v4'

  const $q = useQuasar()
  $q.iconSet.expansionItem.icon = remArrowDownCircleFill
</script>
```

Now, the QExpansionItem will show the `remArrowDownCircleFill` from the `remix-icons`.

To determine which icons are replaceable, go to the [Quasar GitHub repo](https://github.com/quasarframework/quasar/tree/main/ui/icon-set).

### SVG name format

Svg icons will be defined as String with the following syntax:

```
Syntax: "<path>|<viewBox>" or "<path>" (with implicit viewBox of '0 0 24 24')
Examples:
  M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z|0 0 24 24
  M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z
```

A more complex example with attributes, would look like this:

```
M3 12H6L9 3L15 21L18 12H21@@stroke-width:1.5;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;
```

## Known Issues

- `box-icons`: (FIXED) There are two icons, `boxBxsDroplet` and `boxBxsHot`, that both use the svg `use` directive. Our parser cannot handle that, so these icons will be displayed as a black square.

- `country-flag-icons` is missing the South Korean flag as the SVG uses `clip-path` which our parser at this time cannot handle.

- `health-icons`:
  - has a `!,svg` filename which doesn't translate well to a valid JavaScript variable name, so it is renamed to `ExclamationMark` as they already have a `QuestionMark` (because you can't have `?` in a filename).
  - A number of icons, like `healthFilledConeTestOnNets` and `healthOutlineRuralPost`, look messed up and there is no way to fix them at this time. Use at your own risk, or use the original icon.

- Some upstream SVGs are recovered through package-owned overrides when there is a reviewed plain-path equivalent. Current examples include Carbon v11 Illustrator fallback SVGs, Material Icon Theme folder SVGs that use simple local `use` references, Modern Icons `modernBattery30` derived from neighboring battery levels, and the CoreUI v3 flag override proof generated with `resvg` and `vtracer`.

- `flatui-icons` icons not available because of `ClipPath` and `mask` (cannot be flattened): `flatArt`, `flatBowling`, `flatBrush`, `flatButton`, `flatCard`, `flatDynamite`, `flatFlask`, `flatRetina`, `flatRing`, `flatSafe`, `flatSkateboard`, `flatSpray`, `flatTouch`, `flatTrash`, `flatWeather`, `flatWine`.

- `glyphs-brands` the color brands are not available because of `LinearGradient`, `RadialGradient`, etc (cannot be flattened).

- `glyphs-flags` are not available because of `LinearGradient`, `RadialGradient`, etc (cannot be flattened).

- `clarity-icons` does not include the `alerted` or `badged` icons as they don't make sense when being used in this context.

- `openmoji`: we are excluding the `black` svg icons for a number of reasons. The main one is that they are stripped down versions of the color icons, but while those ones have approximately 5 icons representing skin color, the black icons are not filled in and look the same. This adds unnecessary bulk to our distribution.

- `material-theme-icons`: two icons not available because of `mask` and `LinearGradient` (cannot be flattened): `mtiCargoLock` and `mtiFlash`.

- `map-icons` icons not available because of malformed SVG: `mapBicycling`, `mapFishing`, `mapGolf`, `mapHorseRiding`, `mapMotobikeTrail`, `mapTrailWalking`, `mapViewing`, `mapWalking`

## Missing Icon Packages?

We have tried to include some of the most popular and current SVG icon packages available. If you find a package you think should be here, do add a **feature request** in the issues section.

Also, we did try to add a LOT of other packages, but there were reasons why some of them could not be included:

1. The SVG icon set includes color and/or duo-tone icons. Quasar uses the css `currentColor` to determine color, so these icons would have had the color stripped out.
2. Even though a package has a GitHub repo with SVG icons, their NPM package was missing the SVG icons. Instead, they were just distributing the WOFF and WOFF2 fonts that comprised of the icons. If you find one like this, let them know that they should also distribute the SVG icons.
3. The SVG uses commands, like `use`, `LinearGradient`, `filter`, etc., which cannot be integrated into the Quasar Framework format unless a reviewed plain-path override is practical.

Before making a feature request, install the package you feel should be included into this package and check out if the above criteria will fit the needs of our parser.

Icon sets that fail:

- Majesticons: They use `transform` to make circles.
- material-icon-theme: Issues with arduino, denizenscript, folder-docker, and pascal.
- cryptocurrency-icons: Lots of `use` and `filter` directives.
- paper-icon-theme: Use `linearGradient`
- css-social-buttons (Zocial): viewBox is incorrect in many icons causing cut-off points.
- icon-park: too many different colors. Not suitable for dark theme or inverted color themes.
- noto-emoji: Uses `linerarGradient`
- region-flags: Uses `linerarGradient` and `use`
- ardis-icon-theme: Uses `text`
- breeze-icons: Uses `LinearGradient`
- adwaita-icon-theme: Uses `LinearGradient` and `ClipPath`
- super-tiny-icons: Uses `use`

## Building this Package

Build the repository in two steps:

::: steps

## Install dependencies

Use your preferred package manager from the repository root.

```bash
pnpm install

yarn install

npm install

bun install
```

## Build the icon packages

Run the build script after dependencies are installed.

```bash
pnpm build

yarn build

npm run build

bun run build
```

:::

## Donate

If you appreciate the work that went into this project, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

## Documentation

Head on to the website: [quasar-extras-svg-icons](https://quasar-extras-svg-icons.netlify.app)

## SVG Icon Explorer

Don't forget to check out our [Icon Explorer App](/https://iconexplorer.app/) so you can find that perfect icon for your app.

## Stay in Touch

For latest releases and announcements, follow on Twitter: [@jgalbraith64](https://twitter.com/jgalbraith64)

## Chat Support

Ask questions at the official community Discord server: [https://chat.quasar.dev](https://chat.quasar.dev)

## License

All assets included in this repository are exclusive property of their respective owners and licensed under their own respective licenses. Quasar does not take any credit for packages included here.
