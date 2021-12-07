---
title: What is quasar-extras-svg-icons
desc: More SVG icons for your Quasar apps
keys: All about quasar-extras-svg-icons
related:
  - /contributing/bugs-and-feature-requests
  - /contributing/components
  - /contributing/documentation
  - /contributing/sponsor
  - /all-about-quasar-extras-svg-icons/icon-finder
---
::: warning
If you're looking to help out, check out our [Call to action](/contributing/call-to-action) in the **Contributing** section.
:::

## Quasar Extras SVG Icons sets

The `quasar-extras-svg-icons` package has additional SVG icons sets (including typescript definitions) that complement `@quasar/extras`. All SVG icon sets have been well tested and can be relied upon. Make sure you install the `quasar-extras-svg-icons` package to get all the benefits as described below.

The `quasar-extras-svg-icons` package does not include Quasar icon sets for [Quasar components](https://quasar.dev/options/quasar-icon-sets#introduction).

The algorithms employed by `quasar-extras-svg-icons` provide an SVG flattening technique. It converts the SVG to use only the `path` directive. In reality, this can make the SVG smaller in memory size. And, having the SVG declared in a single file makes tree-shaking more possible (over SVG font files). Additionally, each icon set generated has Typescript definition support.

## Why not @quasar/extras?

These icon sets could have been put into `@quasar/extras`, but that would increase the bundle size significantly and not everyone needs or wants these icon sets. Basically, it becomes a choice - you need them or you don't. If you do need them, then the additional bundle size won't be an issue.

## Installation

```
npm install quasar-extras-svg-icons

# or

yarn add quasar-extras-svg-icons
```

## Features

> Quasar v1.7+ required for svg Quasar Icon Sets.

| Vendor | Version | Import SVG Icons as | Prefix | License |
| --- | ---: | --- | --- | --- |
| [Akar Icons](https://github.com/artcoholic/akar-icons) | 1.9.3 | `quasar-extras-svg-icons/akar-icons` | `akar` | [License](https://github.com/artcoholic/akar-icons/blob/master/LICENSE)|
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | 4.2.1 | `quasar-extras-svg-icons/ant-design-icons` | `antOutlined, antFilled, antTwoTone` | [License](https://github.com/ant-design/ant-design-icons/blob/master/LICENSE/)|
| [Box Icons](https://github.com/atisawd/boxicons) | 2.0.9 | `quasar-extras-svg-icons/box-icons` | `bx, bxl, bxs` | [License](https://github.com/atisawd/boxicons#License) |
| [Carbon Icons](https://github.com/carbon-design-system/carbon/tree/main/packages/icons) | 10.44.0 | `quasar-extras-svg-icons/carbon-icons` | `carbon` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/icons#-license) |
| [Carbon Pictograms](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms) | 11.20.0 | `quasar-extras-svg-icons/carbon-pictograms` | `carpic` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms#-license#-license) |
| [Codicons](https://github.com/microsoft/vscode-codicons) | 0.0.26 | `quasar-extras-svg-icons/condicons` | `codi` | [License](https://github.com/microsoft/vscode-codicons/blob/main/LICENSE) |
| [Cool Icons](https://github.com/krystonschwarze/coolicons) | 2.5.0 | `quasar-extras-svg-icons/cool-icons` | `cool` | [License](https://github.com/krystonschwarze/coolicons#license) |
| [Country Flag Icons](https://flagicons.lipis.dev/) | 1.4.19 | `quasar-extras-svg-icons/country-flag-icons` | `flag` | [License](https://github.com/lipis/flag-icons/blob/main/LICENSE) |
| [Entypo+ Icons](http://www.entypo.com/) | 2.2.1 | `quasar-extras-svg-icons/entypo-icons` | `cool` | [License](http://www.entypo.com/faq.php) |
| [Feather Icons](https://github.com/feathericons/feather) | 4.28.0 | `quasar-extras-svg-icons/feather-icons` | `feather` | [License](https://github.com/feathericons/feather/blob/master/LICENSE) |
| [Fuent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | 1.1.154 | `quasar-extras-svg-icons/fluentui-system-icons` | `fui` | [License](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE) |
| [Grid Icons](http://automattic.github.io/gridicons/) | 3.4.0 | `quasar-extras-svg-icons/grid-icons` | `gridicons` | [License](https://github.com/Automattic/gridicons/blob/trunk/LICENSE.md) |
| [Hero Icons](https://heroicons.com/) | 1.0.5 | `quasar-extras-svg-icons/hero-icons` | `heroOutline`, `heroSolid` | [License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE) |
| [Health Icons](https://healthicons.org/) | 0.1.0 | `quasar-extras-svg-icons/health-icons` | `health` | [License](https://github.com/resolvetosavelives/healthicons/blob/main/LICENSE) |
| [Icomoon Free Icons](https://github.com/Keyamoon/IcoMoon-Free) | 0.0.0 | `quasar-extras-svg-icons/icomoon-free-icons` | `icomoonFree` | [License](icomoon-free-icons/LICENSE.md) |
| [Iconoir Icons](https://github.com/lucaburgio/iconoir) | 1.0.0 | `quasar-extras-svg-icons/iconoir` | `ico` | [License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE) |
| [Jam Icons](https://jam-icons.com/) | 2.0.0 | `quasar-extras-svg-icons/jam-icons` | `jam` | [License](https://github.com/michaelampr/jam/blob/master/LICENSE) |
| [Material Line Icons](https://cyberalien.github.io/line-md/) | 0.0.4 | `quasar-extras-svg-icons/material-line-icons` | `matLine` | [License](https://github.com/cyberalien/line-md/blob/master/license.txt) |
| [Open Iconic](https://github.com/iconic/open-iconic) | 1.1.1 | `quasar-extras-svg-icons/open-iconic` | `oi` | [License](https://github.com/iconic/open-iconic#icons) |
| [Pixelart Icons](https://pixelarticons.com/) | 1.5.0 | `quasar-extras-svg-icons/pixelart-icons` | `pix` | [License](https://github.com/halfmage/pixelarticons/blob/master/LICENSE) |
| [Prime Icons](https://github.com/primefaces/primeicons) | 5.0.0 | `quasar-extras-svg-icons/prime-icons` | `prime` | [License](https://github.com/primefaces/primeicons/blob/master/LICENSE) |
| [Primer Octicons](https://primer.style/octicons/) | 16.1.1 | `quasar-extras-svg-icons/oct-icons` | `oct` | [License](https://github.com/primer/octicons/blob/main/LICENSE) |
| [Radix-UI Icon](https://icons.modulz.app/) | 1.0.3 | `quasar-extras-svg-icons/remix-icons` | `radix` | [License](https://github.com/radix-ui/icons/blob/master/LICENSE) |
| [Remix Icon](https://remixicon.com/) | 2.5.0 | `quasar-extras-svg-icons/remix-icons` | `rem` | [License](https://github.com/Remix-Design/RemixIcon/blob/master/License) |
| [Simple Icons](https://simpleicons.org/) | 6.1.0 | `quasar-extras-svg-icons/simple-icons` | `sim` | [License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) |
| [Simple Line Icons](https://github.com/thesabbir/simple-line-icons) | 2.5.5 | `quasar-extras-svg-icons/simple-line-icons` | `sli` | [License](https://github.com/thesabbir/simple-line-icons/blob/master/LICENSE.md) |
| [System UIcons](https://systemuicons.com/) | 0.0.0 | `quasar-extras-svg-icons/system-uicons` | `sui` | [License](https://github.com/CoreyGinnivan/system-uicons/blob/master/LICENSE) |
| [Tabler Icons](https://tabler-icons.io) | 1.46.0 | `quasar-extras-svg-icons/tabler-icons` | `tab, tabBrand` | [License](https://github.com/tabler/tabler-icons/blob/master/LICENSE) |
| [Teeny Icons](https://teenyicons.com/) | 0.4.1 | `quasar-extras-svg-icons/teeny-icons` | `teenyOutline, teenySolid` | [License](https://github.com/teenyicons/teenyicons/blob/master/LICENSE) |
| [UIW Icons](https://uiwjs.github.io/icons/) | 2.5.3 | `quasar-extras-svg-icons/uiw-icons` | `uiw` | [License](https://github.com/uiwjs/icons/blob/master/LICENSE) |
| [Unicons](https://iconscout.com/unicons) | 4.0.1 | `quasar-extras-svg-icons/unicons` | `uni, uniSolid, uniThin` | [License](https://github.com/Iconscout/unicons/blob/master/LICENSE) |
| [Vaadin Icons](https://vaadin.com/components/vaadin-icons) | 22.0.0 | `quasar-extras-svg-icons/vaadin-icons` | `vaadin` | [License](https://github.com/vaadin/vaadin-icons/blob/master/LICENSE) |
| [Weather Icons](https://erikflowers.github.io/weather-icons/) | 2.0.12 | `quasar-extras-svg-icons/weather-icons` | `vaadin` | [License](https://github.com/erikflowers/weather-icons#licensing) |
| [Webfont Medical Icons](http://samcome.github.io/webfont-medical-icons/) | 1.0.0 | `quasar-extras-svg-icons/webfont-medical-icons` | `wmed` | [License](https://github.com/samcome/webfont-medical-icons/blob/master/LICENSE) |
| [Zond Icons](https://github.com/dukestreetstudio/zondicons) | 1.2.0 | `quasar-extras-svg-icons/zond-icons` | `zond` | [License](https://github.com/dukestreetstudio/zondicons/blob/master/LICENSE) |

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
import { tabMenu } from 'quasar-extras-svg-icons/tabler-icons'
import { pixCalendarMonth } from 'quasar-extras-svg-icons/pixelarticons'

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
import { tabMenu } from 'quasar-extras-svg-icons/tabler-icons'
import { remBug } from 'quasar-extras-svg-icons/remix-icon'

export default {
  // ...
  created () {
    this.tabMenu = tabMenu
    this.remBug = remBug
  }
}
```

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
- Quasar Framework icon sets were never made to handle monochrome, duo-tone or colored icons. For that reason, you will not see their availability here.

- `box-icons`: (FIXED) There are two icons, `boxBxsDroplet` and `boxBxsHot`, that both use the svg `use` directive. Our parser cannot handle that, so these icons will be displayed as a black square.

- `country-flags-icons` is missing the South Korean flag as the SVG uses `clip-path` which our parser at this time cannot handle.

- `health-icons`:
  - has a `!,svg` filename which doesn't translate well to a valid JavaScript variable name, so it is renamed to `ExclamationMark` as they already have a `QuestionMark` (because you can't have `?` in a filename).
  - A number of icons, like `healthFilledConeTestOnNets` and `healthOutlineRuralPost`, look messed up and there is no way to fix them at this time. Use at your own risk, or use the original icon.

## Missing Icon Packages?
We have tried to include some of the most popular and current SVG icon packages available. If you find a package you think should be here, do add a **feature request** in the issues section.

Also, we did try to add a LOT of other packages, but there were reasons why some of them could not be included:

1. The SVG icon set includes color and/or duo-tone icons. Quasar uses the css `currentColor` to determine color, so these icons would have had the color stripped out.
2. Even though a package has a GitHub repo with SVG icons, their NPM package was missing the SVG icons. Instead, they were just distributing the WOFF and WOFF2 fonts that comprised of the icons. If you find one like this, let them know that they should also distribute the SVG icons.
3. The SVG uses commands, like `use` which cannot be integreted into the Quasar Framework format.

Before making a feature request, install the package you feel should be included into this package and check out if the above criteria will fit the needs of our parser.

Icon sets that fail:

- Majesticons: They use `transform` to make circles.
- Lucide: Not true SVG. Requires a browser to create the SVGs.
- material-icon-theme: Issues with arduino, denizenscript, folder-docker, and pascal.
- cryptocurrency-icons: Lots of `use` and `filter` directives.


## SVG Icon Finder

Don't forget to check out our [SVG Icon Finder](/all-about-quasar-extras-svg-icons/icon-finder) so you can find that perfect icon for your app.
