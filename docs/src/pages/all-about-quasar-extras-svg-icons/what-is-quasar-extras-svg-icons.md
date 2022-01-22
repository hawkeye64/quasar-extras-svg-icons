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

## Why?
Why this package? Because it strips down unnecessary package files (so faster download times), all in one place, tested and ready to use with Quasar. One other reason is that this package complements the `@quasar/extras` package by adding additional SVG Icons that you can use in your Quasar apps. These SVG icons have gone though a process known as `flattening`. As mentioned, it strips out unnecessay code to make them smaller and more efficient. Unfortunately, not all icon sets meet this criteria and fail.

Additonally, most icon sets have fixed colors. Our flattening process also includes the ability to change these colors to 'currentColor' so you have more control over the way the icon looks when you use our icon sets. Of course, this doesn't apply to some icons sets where the fixed colors are mandatory (like flags). In some cases, we have created a "two-tone" icon set by not only employing the 'currentColor', but then also using 'currentColor' with an opacity in the same icon.

Many of the icon sets are not installable via NPM or NPM version does not coincide with GitHub version (out of sync), so this may be the only way to access them without bloating your project.

Plus, Typescript type definition files are generated so you won't get any warnings when using the icons.

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
| [Akar Icons](https://github.com/artcoholic/akar-icons) | 1.9.6 | `quasar-extras-svg-icons/akar-icons` | `akar` | [License](https://github.com/artcoholic/akar-icons/blob/master/LICENSE)|
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | 4.2.1 | `quasar-extras-svg-icons/ant-design-icons` | `antOutlined`, `antFilled`, `antTwoTone` | [License](https://github.com/ant-design/ant-design-icons/blob/master/LICENSE/)|
| [Box Icons](https://github.com/atisawd/boxicons) | 2.0.9 | `quasar-extras-svg-icons/box-icons` | `bx`, `bxl`, `bxs` | [License](https://github.com/atisawd/boxicons#License) |
| [Bytesize Icons](https://github.com/danklammer/bytesize-icons) | 1.4.0 | `quasar-extras-svg-icons/bytesize-icons` | `byte` | [License](https://github.com/danklammer/bytesize-icons/blob/master/LICENSE.md) |
| [Carbon Icons](https://github.com/carbon-design-system/carbon/tree/main/packages/icons) | 10.45.0 | `quasar-extras-svg-icons/carbon-icons` | `carbon` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/icons#-license) |
| [Carbon Pictograms](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms) | 11.20.0 | `quasar-extras-svg-icons/carbon-pictograms` | `carpic` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms#-license#-license) |
| [Clarity Icons (@cds/core)](https://github.com/vmware/clarity) | 5.6.2 | `quasar-extras-svg-icons/clarity-icons` | `clarity` | [License](https://github.com/vmware/clarity#licenses) |
| [Codicons (vscode)](https://github.com/microsoft/vscode-codicons) | 0.0.27 | `quasar-extras-svg-icons/condicons` | `codi` | [License](https://github.com/microsoft/vscode-codicons/blob/main/LICENSE) |
| [Cool Icons](https://github.com/krystonschwarze/coolicons) | 2.5.0 | `quasar-extras-svg-icons/cool-icons` | `cool` | [License](https://github.com/krystonschwarze/coolicons#license) |
| [CoreUI Icons](https://github.com/coreui/coreui-icons) | 2.1.0 | `quasar-extras-svg-icons/coreui-icons` | `cui`, `cib`, `cif` | [License](https://github.com/coreui/coreui-icons/blob/master/LICENSE) |
| [Country Flag Icons](https://flagicons.lipis.dev/) | 1.4.19 | `quasar-extras-svg-icons/country-flag-icons` | `flag` | [License](https://github.com/lipis/flag-icons/blob/main/LICENSE) |
| [Devicons](https://github.com/vorillaz/devicons) | 1.8.0 | `quasar-extras-svg-icons/dev-icons` | `dev` | [License](https://github.com/vorillaz/devicons) |
| [Drip Icons](https://github.com/amitjakhu/dripicons) | 2.0.0 | `quasar-extras-svg-icons/drip-icons` | `drip` | [License](https://github.com/amitjakhu/dripicons/blob/master/LICENSE) |
| [Elusive Icons](https://github.com/dovy/elusive-iconfont) | 1.10.1 | `quasar-extras-svg-icons/elusive-icons` | `eli` | [License](https://github.com/dovy/elusive-iconfont) |
| [Entypo+ Icons](http://www.entypo.com/) | 2.2.1 | `quasar-extras-svg-icons/entypo-icons` | `entypo` | [License](http://www.entypo.com/faq.php) |
| [Evil Icons](https://github.com/evil-icons/evil-icons) | 1.10.1 | `quasar-extras-svg-icons/evil-icons` | `ei` | [License](https://github.com/evil-icons/evil-icons/blob/master/LICENSE.txt) |
| [Feather Icons](https://github.com/feathericons/feather) | 4.28.0 | `quasar-extras-svg-icons/feather-icons` | `feather` | [License](https://github.com/feathericons/feather/blob/master/LICENSE) |
| [FlatUI Icons](https://github.com/designmodo/Flat-UI) | 1.4.0 | `quasar-extras-svg-icons/flatui-icons` | `flat` | [License](https://github.com/designmodo/Flat-UI/blob/master/readme%20license.txt) |
| [Fuent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | 1.1.157 | `quasar-extras-svg-icons/fluentui-system-icons` | `fui` | [License](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE) |
| [Fontisto Icons](https://github.com/kenangundogan/fontisto) | 3.0.4 | `quasar-extras-svg-icons/fontisto-icons` | `fontisto` | [License](https://github.com/kenangundogan/fontisto/blob/master/LICENSE) |
| [Foundation Icons](https://github.com/zurb/foundation-icon-fonts) | 0.1.1 | `quasar-extras-svg-icons/foundation-icons` | `fi` | [License](https://github.com/zurb/foundation-icon-fonts) |
| [Geom Icons](https://github.com/jxnblk/geomicons-open) | 3.0.0-beta.1 | `quasar-extras-svg-icons/grid-icons` | `geom` | [License](https://github.com/jxnblk/geomicons-open#contributing) |
| [Glyphs Brands](https://github.com/gorango/glyphs) | v0.1.9 | `quasar-extras-svg-icons/glyphs-brands` | `glyphsBrandsThin`, `glyphsBrandsSolid` | [License](https://github.com/gorango/glyphs/blob/main/license) |
| [Glyphs Core Icons](https://github.com/gorango/glyphs) | v0.8.12 | `quasar-extras-svg-icons/glyphs-core-icons` | `glyphsCoreBold`, `glyphsCoreDuo`, `glyphsCoreOutline`, `glyphsCoreThin`, `glyphsCorePoly` | [License](https://github.com/gorango/glyphs/blob/main/license) |
| [Grid Icons](http://automattic.github.io/gridicons/) | 3.4.0 | `quasar-extras-svg-icons/grid-icons` | `gridicons` | [License](https://github.com/Automattic/gridicons/blob/trunk/LICENSE.md) |
| [Health Icons](https://healthicons.org/) | 0.1.0 | `quasar-extras-svg-icons/health-icons` | `health` | [License](https://github.com/resolvetosavelives/healthicons/blob/main/LICENSE) |
| [Hero Icons](https://heroicons.com/) | 1.0.5 | `quasar-extras-svg-icons/hero-icons` | `heroOutline`, `heroSolid` | [License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE) |
| [Icomoon Free Icons](https://github.com/Keyamoon/IcoMoon-Free) | 0.0.0 | `quasar-extras-svg-icons/icomoon-free-icons` | `icomoonFree` | [License](icomoon-free-icons/LICENSE.md) |
| [Iconoir Icons](https://github.com/lucaburgio/iconoir) | 1.0.0 | `quasar-extras-svg-icons/iconoir` | `ico` | [License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE) |
| [IconPark Icons](https://github.com/bytedance/IconPark) | 1.0.0 | `quasar-extras-svg-icons/iconpark-icons` | `ip` | [License](https://github.com/bytedance/IconPark/blob/master/LICENSE) |
| [Ikonate](https://github.com/mikolajdobrucki/ikonate) | 1.1.1 | `quasar-extras-svg-icons/ikonate` | `ikonate` | [License](https://github.com/mikolajdobrucki/ikonate/blob/master/LICENSE) |
| [Ikons](http://ikons.piotrkwiatkowski.co.uk/) | 0.0.0 | `quasar-extras-svg-icons/ikons` | `ikons` | [License](http://ikons.piotrkwiatkowski.co.uk/license.html) |
| [Jam Icons](https://jam-icons.com/) | 2.0.0 | `quasar-extras-svg-icons/jam-icons` | `jam` | [License](https://github.com/michaelampr/jam/blob/master/LICENSE) |
| [Maki Icons (Mapbox)](https://github.com/mapbox/maki) | 7.1.0 | `quasar-extras-svg-icons/maki-icons` | `maki` | [License](https://github.com/mapbox/maki/blob/main/LICENSE.txt) |
| [Material Line Icons](https://cyberalien.github.io/line-md/) | 0.0.4 | `quasar-extras-svg-icons/material-line-icons` | `matLine` | [License](https://github.com/cyberalien/line-md/blob/master/license.txt) |
| [Modern Icons](https://github.com/Templarian/ModernIcons) | 0.0.0 | `quasar-extras-svg-icons/modern-icons` | `modern` | [License](https://github.com/Templarian/ModernIcons#license) |
| [Octicons (Primer)](https://primer.style/octicons/) | 16.2.0 | `quasar-extras-svg-icons/oct-icons` | `oct` | [License](https://github.com/primer/octicons/blob/main/LICENSE) |
| [Open Iconic](https://github.com/iconic/open-iconic) | 1.1.1 | `quasar-extras-svg-icons/open-iconic` | `oi` | [License](https://github.com/iconic/open-iconic#icons) |
| [Phosphor Icons](https://github.com/phosphor-icons/phosphor-icons) | 1.4.2 | `quasar-extras-svg-icons/phosphor-icons` | `pp` | [License](https://github.com/phosphor-icons/phosphor-icons/blob/master/LICENSE) |
| [Pixelart Icons](https://pixelarticons.com/) | 1.5.0 | `quasar-extras-svg-icons/pixelart-icons` | `pix` | [License](https://github.com/halfmage/pixelarticons/blob/master/LICENSE) |
| [Prime Icons](https://github.com/primefaces/primeicons) | 5.0.0 | `quasar-extras-svg-icons/prime-icons` | `prime` | [License](https://github.com/primefaces/primeicons/blob/master/LICENSE) |
| [Radix-UI Icon](https://icons.modulz.app/) | 1.0.3 | `quasar-extras-svg-icons/remix-icons` | `radix` | [License](https://github.com/radix-ui/icons/blob/master/LICENSE) |
| [Remix Icon](https://remixicon.com/) | 2.5.0 | `quasar-extras-svg-icons/remix-icons` | `rem` | [License](https://github.com/Remix-Design/RemixIcon/blob/master/License) |
| [Simple Icons](https://simpleicons.org/) | 6.7.0 | `quasar-extras-svg-icons/simple-icons` | `sim` | [License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) |
| [Simple Line Icons](https://github.com/thesabbir/simple-line-icons) | 2.5.5 | `quasar-extras-svg-icons/simple-line-icons` | `sli` | [License](https://github.com/thesabbir/simple-line-icons/blob/master/LICENSE.md) |
| [Subway Icons](https://github.com/mariuszostrowski/subway) | 0.0.0 | `quasar-extras-svg-icons/subway-icons` | `sub` | [License](https://github.com/mariuszostrowski/subway/blob/master/LICENSE.md) |
| [System UIcons](https://systemuicons.com/) | 0.0.0 | `quasar-extras-svg-icons/system-uicons` | `sui` | [License](https://github.com/CoreyGinnivan/system-uicons/blob/master/LICENSE) |
| [Tabler Icons](https://tabler-icons.io) | 1.53.0 | `quasar-extras-svg-icons/tabler-icons` | `tab`, `tabBrand` | [License](https://github.com/tabler/tabler-icons/blob/master/LICENSE) |
| [Teeny Icons](https://teenyicons.com/) | 0.4.1 | `quasar-extras-svg-icons/teeny-icons` | `teenyOutline`, `teenySolid` | [License](https://github.com/teenyicons/teenyicons/blob/master/LICENSE) |
| [Typicons](https://github.com/stephenhutchings/typicons.font) | 2.1.2 | `quasar-extras-svg-icons/typ-icons` | `typ` | [License](https://github.com/stephenhutchings/typicons.font#license) |
| [UIW Icons](https://uiwjs.github.io/icons/) | 2.5.3 | `quasar-extras-svg-icons/uiw-icons` | `uiw` | [License](https://github.com/uiwjs/icons/blob/master/LICENSE) |
| [Unicons](https://iconscout.com/unicons) | 4.0.1 | `quasar-extras-svg-icons/unicons` | `uni`, `uniSolid`, `uniThin` | [License](https://github.com/Iconscout/unicons/blob/master/LICENSE) |
| [Vaadin Icons](https://vaadin.com/components/vaadin-icons) | 22.0.3 | `quasar-extras-svg-icons/vaadin-icons` | `vaadin` | [License](https://github.com/vaadin/vaadin-icons/blob/master/LICENSE) |
| [Weather Icons](https://erikflowers.github.io/weather-icons/) | 2.0.12 | `quasar-extras-svg-icons/weather-icons` | `wi` | [License](https://github.com/erikflowers/weather-icons#licensing) |
| [Webfont Medical Icons](http://samcome.github.io/webfont-medical-icons/) | 1.0.0 | `quasar-extras-svg-icons/webfont-medical-icons` | `wmed` | [License](https://github.com/samcome/webfont-medical-icons/blob/master/LICENSE) |
| [Windows Icons](https://github.com/Templarian/WindowsIcons) | 0.0.0 | `quasar-extras-svg-icons/windows-icons` | `appbar` | [License](https://github.com/Templarian/WindowsIcons) |
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

### Replacing Quasar Icons
If you wanted to replace a Quasar icon being used in a component, then you have access to modifying the icon set directly.

This example uses Vue 3 `script setup`, but you can adapt it for your needs:

```js
<script setup>
  import { useQuasar } from 'quasar'
  import { remArrowDownCircleFill } from 'quasar-extras-svg-icons/remix-icons'

  const $q = useQuasar()
  $q.iconSet.expansionItem.icon = remArrowDownCircleFill
</script>
```

Now, the QExpansionItem will show the `remArrowDownCircleFill` from the `remix-icons`.

To determine which icons are replacable, go to the [Quasar GitHub repo](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set).

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

- `country-flags-icons` is missing the South Korean flag as the SVG uses `clip-path` which our parser at this time cannot handle.

- `health-icons`:
  - has a `!,svg` filename which doesn't translate well to a valid JavaScript variable name, so it is renamed to `ExclamationMark` as they already have a `QuestionMark` (because you can't have `?` in a filename).
  - A number of icons, like `healthFilledConeTestOnNets` and `healthOutlineRuralPost`, look messed up and there is no way to fix them at this time. Use at your own risk, or use the original icon.

- `modern-icons` is mssing the SVG for `modernBattery30`

- `coreui-icons` icons not available because of `mask` and `use` directives (cannot be flattened): `cuiCifAu`, `cuiCifBi`, `cuiCifBr`, `cuiCifEg`, `cuiCifJm`, `cuiCifKg`, `cuiCifKn`, `cuiCifMr`, `cuiCifNa`, `cuiCifNz`, `cuiCifPt`, `cuiCifSb`, `cuiCifSk`, `cuiCifTv`, `cuiCifTz`, and `cuiCifZa`.

- `flatui-icons` icons not available because of `ClipPath` and `mask` (cannot be flattened): `flatArt`, `flatBowling`, `flatBrush`, `flatButton`, `flatCard`, `flatDynamite`, `flatFlask`, `flatRetina`, `flatRing`, `flatSafe`, `flatSkateboard`, `flatSpray`, `flatTouch`, `flatTrash`, `flatWeather`, `flatWine`.

- `glyphs-brands` the color brands are not available because of `LinearGradient`, `RadialGradient`, etc (cannot be flattened).

- `glyphs-flags` are not available because of `LinearGradient`, `RadialGradient`, etc (cannot be flattened).

- `clarity-icons` does not include the `alerted` or `badged` icons as they don't make sense when being used in this context.

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
- paper-icon-theme: Use `linearGradient`
- css-social-buttons (Zocial): viewBox is incorrect in many icons causing cut-off points.
- icon-park: too many different colors. Not suitable for dark theme or inverted color themes.
- noto-emoji: Uses `linerarGradient`
- region-flags: Uses `linerarGradient` and `use`

## SVG Icon Finder

Don't forget to check out our [SVG Icon Finder](/all-about-quasar-extras-svg-icons/icon-finder) so you can find that perfect icon for your app.
