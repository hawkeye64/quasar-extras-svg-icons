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
| [Box Icons](https://github.com/atisawd/boxicons) | 2.0.9 | `quasar-extras-svg-icons/box-icons` | `box` | [License](https://github.com/atisawd/boxicons#License) |
| [Cool Icons](https://coolicons.cool/) | 2.5.0 | `quasar-extras-svg-icons/cool-icons` | `cool` | [License](https://github.com/krystonschwarze/coolicons#license) |
| [Fuent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | 1.1.152 | `quasar-extras-svg-icons/fluentui-system-icons` | `fui` | [License](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE) |
| [Hero Icons (solid)](https://heroicons.com/) | 1.0.5 | `quasar-extras-svg-icons/hero-icons-solid` | `his` | [License](hero-icons-solid/LICENSE.md) |
| [Hero Icons (outlined)](https://heroicons.com/) | 1.0.5 | `quasar-extras-svg-icons/hero-icons-outlined` | `hio` | [License](hero-icons-outlined/LICENSE.md) |
| [Icomoon Free Icons](https://github.com/Keyamoon/IcoMoon-Free) | 0.0.0 | `quasar-extras-svg-icons/icomoon-free-icons` | `icomoonFree` | [License](icomoon-free-icons/LICENSE.md) |
| [Iconoir Icons](https://iconscout.com/unicons) | 1.0.0 | `quasar-extras-svg-icons/iconoir` | `ico` | [License](iconoir/LICENSE.md) |
| [Jam Icons](https://jam-icons.com/) | 2.0.0 | `quasar-extras-svg-icons/jam-icons` | `jam` | [License](jam-icons/LICENSE.md) |
| [Pixelart Icons](https://pixelarticons.com/) | 1.5.0 | `quasar-extras-svg-icons/pixelart-icons` | `pix` | [License](pixelart-icons/LICENSE.md) |
| [Prime Icons](https://github.com/primefaces/primeicons) | 5.0.0 | `quasar-extras-svg-icons/prime-icons` | `prime` | [License](prime-icons/LICENSE.md) |
| [Primer Octicons](https://primer.style/octicons/) | 16.1.1 | `quasar-extras-svg-icons/oct-icons` | `oct` | [License](oct-icons/LICENSE.md) |
| [Radix-UI Icon](https://icons.modulz.app/) | 1.0.3 | `quasar-extras-svg-icons/remix-icons` | `radix` | [License](radix-ui-icons/LICENSE.md) |
| [Remix Icon](https://remixicon.com/) | 2.5.0 | `quasar-extras-svg-icons/remix-icons` | `rem` | [License](remix-icons/LICENSE.md) |
| [Simple Icons](https://simpleicons.org/) | 5.24.0 | `quasar-extras-svg-icons/simple-icons` | `sim` | [License](simple-icons/LICENSE.md) |
| [System UIcons](https://systemuicons.org/) | 0.0.0 | `quasar-extras-svg-icons/system-uicons` | `sui` | [License](system-uicons/LICENSE.md) |
| [Teeny Icons](https://teenyicons.com/) | 0.4.1 | `quasar-extras-svg-icons/teeny-icons` | `teenyOutline, teenySolid` | [License](teeny-icons/LICENSE.md) |
| [Unicons](https://iconscout.com/unicons) | 4.0.1 | `quasar-extras-svg-icons/unicons` | `uni, uniSolid, uniThin` | [License](unicons/LICENSE.md) |
| [Vaadin Icons](https://vaadin.com/components/vaadin-icons) | 22.0.0.alpha7 | `quasar-extras-svg-icons/vaadin-icons` | `vaadin` | [License](vadin-icons/LICENSE.md) |
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
- Radix: Not true SVG. Uses `React.createElement` to create SVGs.

## SVG Icon Finder

Don't forget to check out our [SVG Icon Finder](/all-about-quasar-extras-svg-icons/icon-finder) so you can find that perfect icon for your app.
