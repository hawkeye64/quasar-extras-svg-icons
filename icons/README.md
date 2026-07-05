
[![npm version](https://img.shields.io/npm/v/quasar-extras-svg-icons?label=quasar-extras-svg-icons)](https://www.npmjs.com/package/quasar-extras-svg-icons)
[![npm downloads](https://img.shields.io/npm/dt/quasar-extras-svg-icons)](https://www.npmjs.com/package/quasar-extras-svg-icons)
[![npm monthly downloads](https://img.shields.io/npm/dm/quasar-extras-svg-icons)](https://www.npmjs.com/package/quasar-extras-svg-icons)
[![license](https://img.shields.io/npm/l/quasar-extras-svg-icons)](https://www.npmjs.com/package/quasar-extras-svg-icons)

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

![Quasar Framework logo](https://cdn.quasar.dev/logo-v2/header.png)

## Quasar Extras SVG Icons

Additional flattened SVG icon sets for Quasar applications, packaged as tree-shakeable TypeScript
exports that work directly with `QIcon`, `QBtn`, and other Quasar icon props.

[![Netlify Status](https://api.netlify.com/api/v1/badges/1c10681b-99e7-4a55-90c6-847ad462846c/deploy-status)](https://app.netlify.com/projects/quasar-extras-svg-icons/deploys)

[![Join the chat at https://chat.quasar.dev](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://chat.quasar.dev)

## Installation

```bash
pnpm add quasar-extras-svg-icons

yarn add quasar-extras-svg-icons

npm install quasar-extras-svg-icons

bun add quasar-extras-svg-icons
```

## Why?

This package strips icon sets down to the files Quasar apps actually need, so installs stay smaller and imports stay predictable. It complements `@quasar/extras` by adding additional SVG icon sets that can be imported as constants and passed straight to Quasar components.

The build process flattens supported SVGs and removes unnecessary markup. Where possible, fixed colors are converted to `currentColor` so icons inherit the same color controls as Quasar's built-in SVG icon sets. Some sets keep fixed colors when those colors are part of the icon identity, such as flags.

Many of the icon sets are not installable via NPM or NPM version does not coincide with GitHub version (out of sync), so this may be the only way to access them without bloating your project.

TypeScript declaration files are generated for every package entry so icon imports are discoverable and type checked.

Additionally, when an icon set has major releases, we aim to preserve the latest major version and the previous major version where practical.

## Contents

Please make sure you have latest `quasar-extras-svg-icons` npm package version installed into your project folder in order for you to benefit from everything below.

## Documentation

You can find the latest documentation at [quasar-extras-svg-icons.netlify.app](https://quasar-extras-svg-icons.netlify.app)

### SVG

> Quasar v1.7+ required for svg Quasar Icon Sets.

Rows are generated from the shipped `index.d.ts` files, so versions and icon counts reflect the current package output. Prefixes are the exported variable prefix(es) used when importing icons. Upstream license files are shipped in each icon-set folder when available.

<!-- icon-set-metadata:start -->
| Icon Set | Version | Import Path | Prefix(es) | Icons |
| --- | ---: | --- | --- | ---: |
| Akar Icons | 1.9.31 | `quasar-extras-svg-icons/akar-icons` | `akar` | 454 |
| Ant Design Icons | 4.4.2 | `quasar-extras-svg-icons/ant-design-icons` | `antOutlined`, `antFilled`, `antTwoTone` | 830 |
| Box Icons | 2.1.4 | `quasar-extras-svg-icons/box-icons` | `bx`, `bxl`, `bxs` | 1634 |
| Brand Icons | 2.0.0 | `quasar-extras-svg-icons/brand-icons` | `brnd` | 36 |
| Brandico Icons | 0.0.0 | `quasar-extras-svg-icons/brandico-icons` | `brico` | 45 |
| Bytesize Icons | 1.4.0 | `quasar-extras-svg-icons/bytesize-icons` | `byte` | 101 |
| Carbon Icons | 11.82.0 | `quasar-extras-svg-icons/carbon-icons-v11` | `carbon` | 2762 |
| Carbon Icons | 10.48.0 | `quasar-extras-svg-icons/carbon-icons` | `carbon` | 2051 |
| Carbon Pictograms | 12.78.0 | `quasar-extras-svg-icons/carbon-pictograms-v12` | `carpic` | 1564 |
| Carbon Pictograms | 11.24.0 | `quasar-extras-svg-icons/carbon-pictograms` | `carpic` | 803 |
| Clarity Icons | 6.17.0 | `quasar-extras-svg-icons/clarity-icons-v6` | `clarity` | 719 |
| Clarity Icons | 5.6.4 | `quasar-extras-svg-icons/clarity-icons` | `clarity` | 681 |
| Codicons | 0.0.45 | `quasar-extras-svg-icons/codicons` | `codi` | 541 |
| Cool Icons | 4.1 | `quasar-extras-svg-icons/cool-icons-v4` | `cool` | 442 |
| Cool Icons | 2.5.0 | `quasar-extras-svg-icons/cool-icons` | `cool` | 412 |
| CoreUI Icons | 3.1.0 | `quasar-extras-svg-icons/coreui-icons-v3` | `cui`, `cib`, `cif` | 1572 |
| CoreUI Icons | 2.1.0 | `quasar-extras-svg-icons/coreui-icons` | `cui`, `cib`, `cif` | 1583 |
| Country Flag Icons | 1.6.19 | `quasar-extras-svg-icons/country-flag-icons` | `flag` | 264 |
| Dash Icons | 0.9.0 | `quasar-extras-svg-icons/dashicons` | `dash` | 342 |
| Devicons | 2.0.1 | `quasar-extras-svg-icons/dev-icons-v2` | `dev` | 1716 |
| Devicons | 1.8.0 | `quasar-extras-svg-icons/dev-icons` | `dev` | 192 |
| Dripicons | 2.0.0 | `quasar-extras-svg-icons/drip-icons` | `drip` | 200 |
| Elusive IconFont | 0.0.0 | `quasar-extras-svg-icons/elusive-icons` | `eli` | 299 |
| Entypo Icons | 2.2.1 | `quasar-extras-svg-icons/entypo-icons` | `entypo` | 411 |
| Evil Icons | 1.10.1 | `quasar-extras-svg-icons/evil-icons` | `ei` | 70 |
| Feather Icons | 4.29.2 | `quasar-extras-svg-icons/feather-icons` | `feather` | 287 |
| Flat Color Icons (Icons8) | 1.1.0 | `quasar-extras-svg-icons/flat-color-icons` | `fci` | 329 |
| FlatUI Icons | 1.4.0 | `quasar-extras-svg-icons/flatui-icons` | `flat` | 85 |
| FluentUI System Icons | 1.1.330 | `quasar-extras-svg-icons/fluentui-system-icons` | `fui` | 20365 |
| Fontisto Icons | 3.0.4 | `quasar-extras-svg-icons/fontisto-icons` | `fontisto` | 615 |
| Foundation Icons | 0.1.1 | `quasar-extras-svg-icons/foundation-icons` | `fi` | 283 |
| Geom Icons | 3.0.0-beta.1 | `quasar-extras-svg-icons/geom-icons` | `geom` | 52 |
| Gitlab Icons | 2.33.0 | `quasar-extras-svg-icons/gitlab-icons` | `gitlab` | 375 |
| GitLab Icons | 3.163.0 | `quasar-extras-svg-icons/gitlab-icons-v3` | `gitlab` | 498 |
| Glyphs Brands | 0.1.9 | `quasar-extras-svg-icons/glyphs-brands` | `glyphsBrandsThin`, `glyphsBrandsSolid` | 322 |
| Glyphs Core Icons | 0.8.12 | `quasar-extras-svg-icons/glyphs-core-icons` | `glyphsCoreBold`, `glyphsCoreDuo`, `glyphsCoreOutline`, `glyphsCoreThin`, `glyphsCorePoly` | 4315 |
| Grid Icons | 3.4.2 | `quasar-extras-svg-icons/grid-icons` | `gridicons` | 207 |
| Health Icons | 2.0.0 | `quasar-extras-svg-icons/health-icons-v2` | `healthFilled`, `healthOutline` | 1468 |
| Health Icons | 1.0.2 | `quasar-extras-svg-icons/health-icons-v1` | `healthFilled`, `healthOutline` | 1917 |
| Hero Icons | 2.2.0 | `quasar-extras-svg-icons/hero-icons-v2` | `heroOutline24`, `heroSolid20`, `heroSolid24` | 972 |
| Hero Icons | 1.0.6 | `quasar-extras-svg-icons/hero-icons` | `heroOutline`, `heroSolid` | 460 |
| Icomoon Free Icons | 0.0.0 | `quasar-extras-svg-icons/icomoon-free-icons` | `icomoonFree` | 491 |
| Iconoir Icons | 7.11.1 | `quasar-extras-svg-icons/iconoir-icons-v7` | `icoRegular`, `icoSolid` | 1671 |
| Iconoir Icons | 6.11.0 | `quasar-extras-svg-icons/iconoir-icons-v6` | `ico` | 1371 |
| IconPark Icons | 1.0.0 | `quasar-extras-svg-icons/iconpark-icons` | `ip` | 2658 |
| Ikonate | 1.1.1 | `quasar-extras-svg-icons/ikonate` | `ikonate` | 283 |
| Ikons | 1.0.0 | `quasar-extras-svg-icons/ikons` | `ikons` | 300 |
| Jam Icons | 2.0.0 | `quasar-extras-svg-icons/jam-icons` | `jam` | 896 |
| Keyrune Icons | 3.19.0 | `quasar-extras-svg-icons/keyrune-icons` | `keyrune` | 434 |
| Linear Icons | 1.0.2 | `quasar-extras-svg-icons/linear-icons` | `lnr` | 170 |
| Linecons | 0.0.0 | `quasar-extras-svg-icons/linecons` | `line` | 48 |
| Lucide Icons | 1.21.0 | `quasar-extras-svg-icons/lucide-icons` | `lucide` | 1982 |
| Map Icons | 3.0.3 | `quasar-extras-svg-icons/map-icons` | `map` | 167 |
| Mapbox Maki Icons | 8.2.0 | `quasar-extras-svg-icons/maki-icons-v8` | `maki` | 215 |
| Mapbox Maki Icons | 7.1.0 | `quasar-extras-svg-icons/maki-icons` | `maki` | 204 |
| Material Icon Theme | 5.36.0 | `quasar-extras-svg-icons/material-icon-theme-v5` | `matTheme` | 1246 |
| Material Line Icons | 1.0.6 | `quasar-extras-svg-icons/material-line-icons-v1` | `matLine` | 605 |
| Material Line Icons | 0.2.19 | `quasar-extras-svg-icons/material-line-icons` | `matLine` | 544 |
| Material Theme Icons | 3.6.0 | `quasar-extras-svg-icons/material-theme-icons-v3` | `mti` | 238 |
| Material Theme Icons | 2.7.5 | `quasar-extras-svg-icons/material-theme-icons` | `mti` | 230 |
| Modern Icons | 0.0.0 | `quasar-extras-svg-icons/modern-icons` | `modern` | 94 |
| Oct Icons v18 | 18.3.0 | `quasar-extras-svg-icons/oct-icons-v18` | `oct` | 576 |
| Oct Icons v19 | 19.28.1 | `quasar-extras-svg-icons/oct-icons-v19` | `oct` | 733 |
| Open Iconic | 1.1.1 | `quasar-extras-svg-icons/open-iconic` | `oi` | 223 |
| Openmoji Icons | 17.0.0 | `quasar-extras-svg-icons/openmoji-icons-v17` | `omc` | 4495 |
| Openmoji Icons | 16.0.0 | `quasar-extras-svg-icons/openmoji-icons-v16` | `omc` | 4292 |
| Phosphor Icons | 2.1.2 | `quasar-extras-svg-icons/phosphor-icons-v2` | `pp` | 9072 |
| Phosphor Icons | 1.4.2 | `quasar-extras-svg-icons/phosphor-icons` | `pp` | 6282 |
| Pixelart Icons | 2.1.2 | `quasar-extras-svg-icons/pixelart-icons-v2` | `pix` | 813 |
| Pixelart Icons | 1.8.1 | `quasar-extras-svg-icons/pixelart-icons` | `pix` | 486 |
| Polaris Icons | 9.3.1 | `quasar-extras-svg-icons/polaris-icons-v9` | `pol` | 534 |
| Prime Icons | 7.0.0 | `quasar-extras-svg-icons/prime-icons-v7` | `prime` | 313 |
| Prime Icons | 6.0.1 | `quasar-extras-svg-icons/prime-icons-v6` | `prime` | 260 |
| Radix-UI Icons | 1.3.2 | `quasar-extras-svg-icons/radix-ui-icons` | `radix` | 332 |
| Remix Icon | 4.9.1 | `quasar-extras-svg-icons/remix-icons-v4` | `rem` | 3229 |
| Remix Icon | 3.6.0 | `quasar-extras-svg-icons/remix-icons-v3` | `rem` | 2598 |
| Simple Icons | 16.24.0 | `quasar-extras-svg-icons/simple-icons-v16` | `sim` | 3446 |
| Simple Icons | 15.4.0 | `quasar-extras-svg-icons/simple-icons-v15` | `sim` | 3327 |
| Simple Line Icons | 2.5.5 | `quasar-extras-svg-icons/simple-line-icons` | `sli` | 189 |
| Stroke 7 Icons (Pixeden) | 1.2.3 | `quasar-extras-svg-icons/stroke7-icons` | `strk7` | 202 |
| Subway Icons | 0.0.0 | `quasar-extras-svg-icons/subway-icons` | `sub` | 305 |
| System UIcons | 0.0.0 | `quasar-extras-svg-icons/system-uicons` | `sui` | 430 |
| Tabler Icons | 3.44.0 | `quasar-extras-svg-icons/tabler-icons-v3` | `tabFilled`, `tabOutline` | 6146 |
| Tabler Icons | 2.42.0 | `quasar-extras-svg-icons/tabler-icons-v2` | `tab`, `tabBrand` | 4872 |
| Teeny Icons | 0.4.1 | `quasar-extras-svg-icons/teeny-icons` | `teenyOutline`, `teenySolid` | 1200 |
| Typicons | 2.1.2 | `quasar-extras-svg-icons/typ-icons` | `typ` | 336 |
| UIW Icons | 2.6.10 | `quasar-extras-svg-icons/uiw-icons` | `uiw` | 214 |
| Unicons | 4.2.0 | `quasar-extras-svg-icons/unicons` | `uni`, `uniLine`, `uniSolid`, `uniThin` | 1621 |
| Vaadin Icons v24 | 24.8.2 | `quasar-extras-svg-icons/vaadin-icons-v24` | `vaadin` | 636 |
| Vaadin Icons v25 | 25.2.0 | `quasar-extras-svg-icons/vaadin-icons-v25` | `vaadin` | 636 |
| Weather Icons | 2.0.12 | `quasar-extras-svg-icons/weather-icons` | `wi` | 219 |
| Webfont Medical Icons | 1.0.0 | `quasar-extras-svg-icons/webfont-medical-icons` | `wmed` | 144 |
| Windows Icons | 0.0.0 | `quasar-extras-svg-icons/windows-icons` | `appbar` | 1260 |
| Zond Icons | 1.2.0 | `quasar-extras-svg-icons/zond-icons` | `zond` | 297 |
<!-- icon-set-metadata:end -->

Example (with Vue Composition API):

```html
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
  // ...
  setup () {
    return {
      tabMenu
      pixCalendarMonth
    }
  }
}
```

Example (with Vue Options API):

```html
// some .vue file in devland
<template>
  <div>
    <q-icon :name="tabMenu" />
    <q-btn :icon="remBug" />
  </div>
</template>

<script>
import { tabOutlineMenu as tabMenu } from 'quasar-extras-svg-icons/tabler-icons-v3'
import { remBugLine as remBug } from 'quasar-extras-svg-icons/remix-icons-v4'

export default {
  // ...
  created () {
    this.tabMenu = tabMenu
    this.remBug = remBug
  }
}
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

- `coreui-icons` icons not available because of `mask` and `use` directives (cannot be flattened): `cuiCifAu`, `cuiCifBi`, `cuiCifBr`, `cuiCifEg`, `cuiCifJm`, `cuiCifKg`, `cuiCifKn`, `cuiCifMr`, `cuiCifNa`, `cuiCifNz`, `cuiCifPt`, `cuiCifSb`, `cuiCifSk`, `cuiCifTv`, `cuiCifTz`, and `cuiCifZa`.

- `flatui-icons` icons not available because of `ClipPath` and `mask` (cannot be flattened): `flatArt`, `flatBowling`, `flatBrush`, `flatButton`, `flatCard`, `flatDynamite`, `flatFlask`, `flatRetina`, `flatRing`, `flatSafe`, `flatSkateboard`, `flatSpray`, `flatTouch`, `flatTrash`, `flatWeather`, `flatWine`.

- `glyphs-brands` the color brands are not available because of `LinearGradient`, `RadialGradient`, etc (cannot be flattened).

- `glyphs-flags` are not available because of `LinearGradient`, `RadialGradient`, etc (cannot be flattened).

- `clarity-icons` does not include the `alerted` or `badged` icons as they don't make sense when being used in this context.

- `openmoji`: we are excluding the `black` svg icons for a number of reasons. The main one is that they are stripped down versions of the color icons, but while those ones have approximately 5 icons representing skin color, the black icons are not filled in and look the same. This adds unnecessary bulk to our distribution.

- `material-theme-icons`: two icons not available because of `mask` and `LinearGradient` (cannot be flattened): `mtiCargoLock` and `mtiFlash`.

- `map-icons` icons not available because of malformed SVG: `mapBicycling`, `mapFishing`, `mapGolf`, `mapHorseRiding`, `mapMotobikeTrail`, `mapTrailWalking`, `mapViewing`, `mapWalking`

- Material Line Icons will no longer be maintained > v1.x

## Missing Icon Packages?

We have tried to include some of the most popular and current SVG icon packages available. If you find a package you think should be here, do add a **feature request** in the issues section.

Also, we did try to add a LOT of other packages, but there were reasons why some of them could not be included:

1. The SVG icon set includes color and/or duo-tone icons. Quasar uses the css `currentColor` to determine color, so these icons would have had the color stripped out.
2. Even though a package has a GitHub repo with SVG icons, their NPM package was missing the SVG icons. Instead, they were just distributing the WOFF and WOFF2 fonts that comprised of the icons. If you find one like this, let them know that they should also distribute the SVG icons.
3. The SVG uses commands, like `use`, `LinearGradient`, `filter`, etc., which cannot be integrated into the Quasar Framework format.

Before making a feature request, install the package you feel should be included into this package and check out if the above criteria will fit the needs of our parser.

Icon sets that fail:

- Majesticons: They use `transform` to make circles.
- material-icon-theme: Issues with folder-cloud-functions and folder-css icons.
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

For installation, use:

```bash
pnpm install

yarn install

npm install

bun install
```

Then run:

```bash
pnpm build

yarn build

npm run build

bun run build
```

## Support

If quasar-extras-svg-icons is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

## License

All assets included in this repository are exclusive property of their respective owners and licensed under their own respective licenses. Quasar does not take any credit for packages included here.
