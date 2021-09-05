![Quasar Framework logo](https://cdn.quasar.dev/logo-v2/header.png)

## Quasar Framework - Extras SVG Icons package

> Build high-performance VueJS user interfaces in record time: responsive Single Page Apps, SSR Apps, PWAs, Browser extensions, Hybrid Mobile Apps and Electron Apps. If you want, all using the same codebase!

![quasar-extras-svg-icons](https://img.shields.io/npm/v/quasar-extras-svg-icons?label=quasar-extras-svg-icons)

[![Join the chat at https://chat.quasar.dev](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://chat.quasar.dev)

## Installation

```
npm install quasar-extras-svg-icons

# or

yarn add quasar-extras-svg-icons
```

## Why?
Why this package? Because it strips down unnecessary package files (so faster download times), all in one place, tested and ready to use with Quasar. One other reason is that this package complements the extra-extras package by adding additional SVG Icons that you can use in your Quasar apps.

## Contents

Please make sure you have latest `quasar-extras-svg-icons` npm package version installed into your project folder in order for you to benefit from everything below.

### SVG

> Quasar v1.7+ required for svg Quasar Icon Sets.

| Vendor | Version | Import SVG Icons as | Prefix | License |
| --- | ---: | --- | --- | --- |
| [Iconoir Icons](https://iconscout.com/unicons) | 1.0.0 | `quasar-extras-svg-icons/iconoir` | `ico` | [License](iconoir/LICENSE.md) |
| [Fuent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | 1.1.139 | `quasar-extras-svg-icons/fluentui-system-icons` | `fui` | [License](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE) |
| [Hero Icons (solid)](https://heroicons.com/) | 1.0.4 | `quasar-extras-svg-icons/hero-icons-solid` | `his` | [License](hero-icons-solid/LICENSE.md) |
| [Hero Icons (outlined)](https://heroicons.com/) | 1.0.4 | `quasar-extras-svg-icons/hero-icons-outlined` | `hio` | [License](hero-icons-outlined/LICENSE.md) |
| [Prime Icons](https://github.com/primefaces/primeicons) | 4.1.0 | `quasar-extras-svg-icons/prime-icons` | `prime` | [License](prime-icons/LICENSE.md) |
| [Primer Octicons](https://primer.style/octicons/) | 15.1.0 | `quasar-extras-svg-icons/oct-icons` | `oct` | [License](oct-icons/LICENSE.md) |
| [Jam Icons](https://jam-icons.com/) | 2.0.0 | `quasar-extras-svg-icons/jam-icons` | `jam` | [License](jam-icons/LICENSE.md) |
| [Pixelart Icons](https://pixelarticons.com/) | 1.4.0 | `quasar-extras-svg-icons/pixelart-icons` | `pix` | [License](pixelart-icons/LICENSE.md) |
| [Remix Icon](https://remixicon.com/) | 2.5.0 | `quasar-extras-svg-icons/remix-icons` | `rem` | [License](remix-icons/LICENSE.md) |
| [Simple Icons](https://simpleicons.org/) | 5.12.0 | `quasar-extras-svg-icons/simple-icons` | `sim` | [License](simple-icons/LICENSE.md) |
| [Tabler Icons](https://tabler-icons.io) | 1.41.2 | `quasar-extras-svg-icons/tabler-icons` | `tab` | [License](tabler-icons/LICENSE.md) |
| [Zond Icons](https://github.com/dukestreetstudio/zondicons) | 1.2.0 | `quasar-extras-svg-icons/zond-icons` | `zond` | [License](https://github.com/dukestreetstudio/zondicons/blob/master/LICENSE) |

Example (with Vue Composition API):

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

Example (with Vue Options API):

```html
// some .vue file in devland
<template>
  <div>
    <q-icon :name="tabMenu" />
    <q-btn :icon="paCalendarMonth" />
  </div>
</template>

<script>
import { tabMenu } from 'quasar-extras-svg-icons/tabler-icons'
import { paCalendarMonth } from 'quasar-extras-svg-icons/pixelarticons'

export default {
  // ...
  setup () {
    return {
      tabMenu
      paCalendarMonth
    }
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
## Missing Icon Packages?
We have tried to include some of the most popular and current SVG icon packages available. If you find a package you think should be here, do add a **feature request** in the issues section.

Also, we did try to add a LOT of other packages, but there were reasons why some of them could not be included:

1. The SVG icon set includes color and/or duo-tone icons. Quasar uses the css `currentColor` to determine color, so these icons would have had the color stripped out.
2. Even though a package has a GitHub repo with SVG icons, their NPM package was missing the SVG icons. Instead, they were just distributing the WOFF and WOFF2 fonts that comprised of the icons. If you find one like this, let them know that they should also distribute the SVG icons.
3. The SVG uses commands, like `use` which cannot be integreted into the Quasar Framework format.

Before making a feature request, install the package you feel should be included into this package and check out if the above criteria will fit the needs of our parser.

## Donate
If you appreciate the work that went into this project, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

## Documentation

Head on to the website: [quasar-extras-svg-icons](https://quasar-extras-svg-icons.netlify.app)

## Stay in Touch

For latest releases and announcements, follow on Twitter: [@jgalbraith64](https://twitter.com/jgalbraith64)

## Chat Support

Ask questions at the official community Discord server: [https://chat.quasar.dev](https://chat.quasar.dev)

## License

All assets included in this repository are exclusive property of their respective owners and licensed under their own respective licenses. Quasar does not take any credit for packages included here.
