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
Why this package? Because it strips down unnecessary package files (so faster download times), all in one place, tested and ready to use with Quasar. One other reason is that this package complements the `@quasar/extras` package by adding additional SVG Icons that you can use in your Quasar apps. These SVG icons have gone though a process known as `flattening`. As mentioned, it strips out unnecessay code to make them smaller and more efficient. Unfortunately, not all icon sets meet this criteria and fail.

Additonally, most icon sets have fixed colors. Our flattening process also includes the ability to change these colors to 'currentColor' so you have more control over the way the icon looks when you use our icon sets. Of course, this doesn't apply to some icons sets where the fixed colors are mandatory (like flags). In some cases, we have created a "two-tone" icon set by not only employing the 'currentColor', but then also using 'currentColor' with an opacity in the same icon.

Many of the icon sets are not installable via NPM or NPM version does not coincide with GitHub version (out of sync), so this may be the only way to access them without bloating your project.

Plus, Typescript type definition files are generated so you won't get any warnings when using the icons.

Additionally, everytime there is a major release of an Icon Set, we preserve the previous version.

## Contents

Please make sure you have latest `quasar-extras-svg-icons` npm package version installed into your project folder in order for you to benefit from everything below.

## Documentation

You can find the latest documentation at [quasar-extras-svg-icons.netlify.app](https://quasar-extras-svg-icons.netlify.app)

### SVG

> Quasar v1.7+ required for svg Quasar Icon Sets.

| Vendor | Version | Import SVG Icons as | Prefix | License |
| --- | ---: | --- | --- | --- |
| [Akar Icons](https://github.com/artcoholic/akar-icons) | 1.9.22 | `quasar-extras-svg-icons/akar-icons` | `akar` | [License](https://github.com/artcoholic/akar-icons/blob/master/LICENSE)|
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | 4.2.1 | `quasar-extras-svg-icons/ant-design-icons` | `antOutlined`, `antFilled`, `antTwoTone` | [License](https://github.com/ant-design/ant-design-icons/blob/master/LICENSE/)|
| [Box Icons](https://github.com/atisawd/boxicons) | 2.1.4 | `quasar-extras-svg-icons/box-icons` | `bx`, `bxl`, `bxs` | [License](https://github.com/atisawd/boxicons#License) |
| [Brand Icons](https://github.com/hanakin/brandicons) | 2.0.0 | `quasar-extras-svg-icons/brand-icons` | `brnd` | [License](https://github.com/hanakin/brandicons/blob/master/LICENSE) |
| [Brandico Icons](https://github.com/fontello/brandico.font) | 0.0.0 | `quasar-extras-svg-icons/brandico-icons` | `brico` | [License](https://github.com/fontello/brandico.font#license) |
| [Bytesize Icons](https://github.com/danklammer/bytesize-icons) | 1.4.0 | `quasar-extras-svg-icons/bytesize-icons` | `byte` | [License](https://github.com/danklammer/bytesize-icons/blob/master/LICENSE.md) |
| [Carbon Icons](https://github.com/carbon-design-system/carbon/tree/main/packages/icons) | 11.19.0 | `quasar-extras-svg-icons/carbon-icons-v11` | `carbon` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/icons#-license) |
| Carbon Icons | 10.48.0 | `quasar-extras-svg-icons/carbon-icons` | `carbon` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/icons#-license) |
| [Carbon Pictograms](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms) | 12.16.0 | `quasar-extras-svg-icons/carbon-pictograms-v12` | `carpic` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms#-license#-license) |
| Carbon Pictograms | 11.24.0 | `quasar-extras-svg-icons/carbon-pictograms` | `carpic` | [License](https://github.com/carbon-design-system/carbon/tree/main/packages/pictograms#-license#-license) |
| [Clarity Icons (@cds/core) v6](https://github.com/vmware/clarity) | 6.4.2 | `quasar-extras-svg-icons/clarity-icons-v6` | `clarity` | [License](https://github.com/vmware/clarity#licenses) |
| Clarity Icons (@cds/core) | 5.7.1 | `quasar-extras-svg-icons/clarity-icons` | `clarity` | [License](https://github.com/vmware/clarity#licenses) |
| [Codicons (vscode)](https://github.com/microsoft/vscode-codicons) | 0.0.33 | `quasar-extras-svg-icons/condicons` | `codi` | [License](https://github.com/microsoft/vscode-codicons/blob/main/LICENSE) |
| [Cool Icons](https://github.com/krystonschwarze/coolicons) | 2.5.0 | `quasar-extras-svg-icons/cool-icons` | `cool` | [License](https://github.com/krystonschwarze/coolicons#license) |
| [CoreUI Icons](https://github.com/coreui/coreui-icons) | 3.0.1 | `quasar-extras-svg-icons/coreui-icons-v3` | `cui`, `cib`, `cif` | [License](https://github.com/coreui/coreui-icons/blob/master/LICENSE) |
| CoreUI Icons | 2.1.0 | `quasar-extras-svg-icons/coreui-icons` | `cui`, `cib`, `cif` | [License](https://github.com/coreui/coreui-icons/blob/master/LICENSE) |
| [Country Flag Icons](https://flagicons.lipis.dev/) | 1.5.7 | `quasar-extras-svg-icons/country-flag-icons` | `flag` | [License](https://github.com/lipis/flag-icons/blob/main/LICENSE) |
| [Dashicons](https://github.com/WordPress/dashicons) | 0.9.0 | `quasar-extras-svg-icons/dashicons` | `dash` | [License](https://github.com/WordPress/dashicons/blob/master/LICENSE) |
| [Devicons](https://github.com/vorillaz/devicons) | 1.8.0 | `quasar-extras-svg-icons/dev-icons` | `dev` | [License](https://github.com/vorillaz/devicons) |
| [Drip Icons](https://github.com/amitjakhu/dripicons) | 2.0.0 | `quasar-extras-svg-icons/drip-icons` | `drip` | [License](https://github.com/amitjakhu/dripicons/blob/master/LICENSE) |
| [Elusive Icons](https://github.com/dovy/elusive-iconfont) | 1.10.1 | `quasar-extras-svg-icons/elusive-icons` | `eli` | [License](https://github.com/dovy/elusive-iconfont) |
| [Entypo+ Icons](http://www.entypo.com/) | 2.2.1 | `quasar-extras-svg-icons/entypo-icons` | `entypo` | [License](http://www.entypo.com/faq.php) |
| [Evil Icons](https://github.com/evil-icons/evil-icons) | 1.10.1 | `quasar-extras-svg-icons/evil-icons` | `ei` | [License](https://github.com/evil-icons/evil-icons/blob/master/LICENSE.txt) |
| [Feather Icons](https://github.com/feathericons/feather) | 4.29.0 | `quasar-extras-svg-icons/feather-icons` | `feather` | [License](https://github.com/feathericons/feather/blob/master/LICENSE) |
| [Flat Color Icons (Icons8)](https://github.com/icons8/flat-color-icons) | 1.1.0 | `quasar-extras-svg-icons/flat-color-icons` | `fci` | [License](https://github.com/icons8/flat-color-icons/blob/master/LICENSE.md) |
| [FlatUI Icons](https://github.com/designmodo/Flat-UI) | 1.4.0 | `quasar-extras-svg-icons/flatui-icons` | `flat` | [License](https://github.com/designmodo/Flat-UI/blob/master/readme%20license.txt) |
| [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | 1.1.198 | `quasar-extras-svg-icons/fluentui-system-icons` | `fui` | [License](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE) |
| [Fontisto Icons](https://github.com/kenangundogan/fontisto) | 3.0.4 | `quasar-extras-svg-icons/fontisto-icons` | `fontisto` | [License](https://github.com/kenangundogan/fontisto/blob/master/LICENSE) |
| [Foundation Icons](https://github.com/zurb/foundation-icon-fonts) | 0.1.1 | `quasar-extras-svg-icons/foundation-icons` | `fi` | [License](https://github.com/zurb/foundation-icon-fonts) |
| [Geom Icons](https://github.com/jxnblk/geomicons-open) | 3.0.0-beta.1 | `quasar-extras-svg-icons/grid-icons` | `geom` | [License](https://github.com/jxnblk/geomicons-open#contributing) |
| [GitLab Icons v3](https://gitlab.com/gitlab-org/gitlab-svgs/-/tree/main/) | 3.47.0 | `quasar-extras-svg-icons/gitlab-icons-v3` | `gitlab` | [License](https://gitlab.com/gitlab-org/gitlab-svgs/-/blob/main/LICENSE) |
| GitLab Icons | 2.33.0 | `quasar-extras-svg-icons/gitlab-icons` | `gitlab` | [License](https://gitlab.com/gitlab-org/gitlab-svgs/-/blob/main/LICENSE) |
| [Glyphs Brands](https://github.com/gorango/glyphs) | v0.1.9 | `quasar-extras-svg-icons/glyphs-brands` | `glyphsBrandsThin`, `glyphsBrandsSolid` | [License](https://github.com/gorango/glyphs/blob/main/license) |
| [Glyphs Core Icons](https://github.com/gorango/glyphs) | v0.8.12 | `quasar-extras-svg-icons/glyphs-core-icons` | `glyphsCoreBold`, `glyphsCoreDuo`, `glyphsCoreOutline`, `glyphsCoreThin`, `glyphsCorePoly` | [License](https://github.com/gorango/glyphs/blob/main/license) |
| [Grid Icons](http://automattic.github.io/gridicons/) | 3.4.0 | `quasar-extras-svg-icons/grid-icons` | `gridicons` | [License](https://github.com/Automattic/gridicons/blob/trunk/LICENSE.md) |
| [Health Icons](https://healthicons.org/) | 0.1.0 | `quasar-extras-svg-icons/health-icons` | `health` | [License](https://github.com/resolvetosavelives/healthicons/blob/main/LICENSE) |
| [Hero Icons v2](https://heroicons.com/) | 2.0.18 | `quasar-extras-svg-icons/hero-icons-v2` | `heroOutline`, `heroSolid` | [License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE) |
| Hero Icons | 1.0.6 | `quasar-extras-svg-icons/hero-icons` | `heroOutline`, `heroSolid` | [License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE) |
| [Icomoon Free Icons](https://github.com/Keyamoon/IcoMoon-Free) | 0.0.0 | `quasar-extras-svg-icons/icomoon-free-icons` | `icomoonFree` | [License](icomoon-free-icons/LICENSE.md) |
| [Iconoir Icons v6](https://github.com/lucaburgio/iconoir) | 6.8.0 | `quasar-extras-svg-icons/iconoir-icons-v6` | `ico` | [License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE) |
| Iconoir Icons v5 | 5.5.2 | `quasar-extras-svg-icons/iconoir-icons-v5` | `ico` | [License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE) |
| Iconoir Icons v4 | 4.9.1 | `quasar-extras-svg-icons/iconoir-icons-v4` | `ico` | [License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE) |
| Iconoir Icons | 1.0.0 | `quasar-extras-svg-icons/iconoir-icons` | `ico` | [License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE) |
| [IconPark Icons](https://github.com/bytedance/IconPark) | 1.0.0 | `quasar-extras-svg-icons/iconpark-icons` | `ip` | [License](https://github.com/bytedance/IconPark/blob/master/LICENSE) |
| [IconPark Icons](https://github.com/bytedance/IconPark) | 1.0.0 | `quasar-extras-svg-icons/iconpark-icons` | `ip` | [License](https://github.com/bytedance/IconPark/blob/master/LICENSE) |
| [IconPark Icons](https://github.com/bytedance/IconPark) | 1.0.0 | `quasar-extras-svg-icons/iconpark-icons` | `ip` | [License](https://github.com/bytedance/IconPark/blob/master/LICENSE) |
| [Icons Material (mui)](https://github.com/mui/material-ui/tree/master/packages/mui-icons-material/material-icons) | 5.11.16 | `quasar-extras-svg-icons/icons-material` | `imat` | [License](https://github.com/mui/material-ui/blob/master/LICENSE) |
| [Ikonate](https://github.com/mikolajdobrucki/ikonate) | 1.1.1 | `quasar-extras-svg-icons/ikonate` | `ikonate` | [License](https://github.com/mikolajdobrucki/ikonate/blob/master/LICENSE) |
| [Ikons](http://ikons.piotrkwiatkowski.co.uk/) | 0.0.0 | `quasar-extras-svg-icons/ikons` | `ikons` | [License](http://ikons.piotrkwiatkowski.co.uk/license.html) |
| [Jam Icons](https://jam-icons.com/) | 2.0.0 | `quasar-extras-svg-icons/jam-icons` | `jam` | [License](https://github.com/michaelampr/jam/blob/master/LICENSE) |
| [Keyrune Icons](https://github.com/andrewgioia/keyrune) | 3.12.1 | `quasar-extras-svg-icons/keyrune-icons` | `keyrune` | [License](https://github.com/andrewgioia/keyrune/blob/master/LICENSE.md) |
| [Linear Icons](https://github.com/cjpatoilo/linearicons) | 1.0.2 | `quasar-extras-svg-icons/linear-icons` | `lnr` | [License](https://github.com/cjpatoilo/linearicons/blob/master/LICENSE) |
| [Linecons](https://github.com/fontello/linecons.font) | 0.0.0 | `quasar-extras-svg-icons/linecons` | `lcons` | [License](https://github.com/fontello/linecons.font#license) |
| [Maki Icons (Mapbox) v8](https://github.com/mapbox/maki) | 8.0.1 | `quasar-extras-svg-icons/maki-icons-v8` | `maki` | [License](https://github.com/mapbox/maki/blob/main/LICENSE.txt) |
| Maki Icons (Mapbox) | 7.1.0 | `quasar-extras-svg-icons/maki-icons` | `maki` | [License](https://github.com/mapbox/maki/blob/main/LICENSE.txt) |
| [Map Icons](https://github.com/scottdejonge/map-icons) | 3.0.3 | `quasar-extras-svg-icons/map-icons` | `map` | [License](https://github.com/scottdejonge/map-icons/blob/master/LICENSE) |
| [Material Line Icons](https://cyberalien.github.io/line-md/) | 0.2.9 | `quasar-extras-svg-icons/material-line-icons` | `matLine` | [License](https://github.com/cyberalien/line-md/blob/master/license.txt) |
| [Material Theme Icons](https://github.com/material-theme/vsc-material-theme-icons) | 2.7.5 | `quasar-extras-svg-icons/material-theme-icons` | `mti` | [License](https://github.com/material-theme/vsc-material-theme-icons/blob/master/LICENSE) |
| [Modern Icons](https://github.com/Templarian/ModernIcons) | 0.0.0 | `quasar-extras-svg-icons/modern-icons` | `modern` | [License](https://github.com/Templarian/ModernIcons#license) |
| [Octicons (Primer) v19](https://primer.style/octicons/) | 19.1.0 | `quasar-extras-svg-icons/oct-icons-v19` | `oct` | [License](https://github.com/primer/octicons/blob/main/LICENSE) |
| Octicons (Primer) v18 | 18.3.0 | `quasar-extras-svg-icons/oct-icons-v18` | `oct` | [License](https://github.com/primer/octicons/blob/main/LICENSE) |
| Octicons (Primer) v17 | 17.11.1 | `quasar-extras-svg-icons/oct-icons-v17` | `oct` | [License](https://github.com/primer/octicons/blob/main/LICENSE) |
| Octicons (Primer) | 16.3.1 | `quasar-extras-svg-icons/oct-icons` | `oct` | [License](https://github.com/primer/octicons/blob/main/LICENSE) |
| [Open Iconic](https://github.com/iconic/open-iconic) | 1.1.1 | `quasar-extras-svg-icons/open-iconic` | `oi` | [License](https://github.com/iconic/open-iconic#icons) |
| [Openmoji Icons](https://github.com/hfg-gmuend/openmoji) | 14.0.0 | `quasar-extras-svg-icons/openmoji-icons-v14` | `om`, `omc` | [License](https://github.com/hfg-gmuend/openmoji/blob/master/LICENSE.txt) |
| [Openmoji Icons](https://github.com/hfg-gmuend/openmoji) | 13.1.0 | `quasar-extras-svg-icons/openmoji-icons` | `om`, `omc` | [License](https://github.com/hfg-gmuend/openmoji/blob/master/LICENSE.txt) |
| [Phosphor Icons](https://github.com/phosphor-icons/phosphor-icons) | 1.4.2 | `quasar-extras-svg-icons/phosphor-icons` | `pp` | [License](https://github.com/phosphor-icons/phosphor-icons/blob/master/LICENSE) |
| [Pixelart Icons](https://pixelarticons.com/) | 1.7.0 | `quasar-extras-svg-icons/pixelart-icons` | `pix` | [License](https://github.com/halfmage/pixelarticons/blob/master/LICENSE) |
| [Prime Icons](https://github.com/primefaces/primeicons) | 6.0.1 | `quasar-extras-svg-icons/prime-icons-v6` | `prime` | [License](https://github.com/primefaces/primeicons/blob/master/LICENSE) |
| [PrimeIcons | 5.0.0 | `quasar-extras-svg-icons/prime-icons` | `prime` | [License](https://github.com/primefaces/primeicons/blob/master/LICENSE) |
| [Radix-UI Icon](https://icons.modulz.app/) | 1.1.0 | `quasar-extras-svg-icons/radix-ui-icons` | `radix` | [License](https://github.com/radix-ui/icons/blob/master/LICENSE) |
| [Remix Icon](https://remixicon.com/) | 3.3.0 | `quasar-extras-svg-icons/remix-icons-v3` | `rem` | [License](https://github.com/Remix-Design/RemixIcon/blob/master/License) |
| Remix Icon | 2.5.0 | `quasar-extras-svg-icons/remix-icons` | `rem` | [License](https://github.com/Remix-Design/RemixIcon/blob/master/License) |
| [Simple Icons v8](https://simpleicons.org/) | 8.14.0 | `quasar-extras-svg-icons/simple-icons-v8` | `sim` | [License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) |
| Simple Icons v7 | 7.21.0 | `quasar-extras-svg-icons/simple-icons-v7` | `sim` | [License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) |
| [Simple Icons] | 6.22.0 | `quasar-extras-svg-icons/simple-icons` | `sim` | [License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) |
| [Simple Line Icons](https://github.com/thesabbir/simple-line-icons) | 2.5.5 | `quasar-extras-svg-icons/simple-line-icons` | `sli` | [License](https://github.com/thesabbir/simple-line-icons/blob/master/LICENSE.md) |
| [Stroke 7 Icons (Pixeden)](https://github.com/olimsaidov/pixeden-stroke-7-icon) | 1.2.3 | `quasar-extras-svg-icons/stroke7-icons` | `strk7` | [License](https://github.com/olimsaidov/pixeden-stroke-7-icon#license) |
| [Subway Icons](https://github.com/mariuszostrowski/subway) | 0.0.0 | `quasar-extras-svg-icons/subway-icons` | `sub` | [License](https://github.com/mariuszostrowski/subway/blob/master/LICENSE.md) |
| [System UIcons](https://systemuicons.com/) | 0.0.0 | `quasar-extras-svg-icons/system-uicons` | `sui` | [License](https://github.com/CoreyGinnivan/system-uicons/blob/master/LICENSE) |
| [Tabler Icons](https://tabler-icons.io) | 2.19.0 | `quasar-extras-svg-icons/tabler-icons-v2` | `tab`, `tabBrand` | [License](https://github.com/tabler/tabler-icons/blob/master/LICENSE) |
| Tabler Icons | 1.119.0 | `quasar-extras-svg-icons/tabler-icons` | `tab`, `tabBrand` | [License](https://github.com/tabler/tabler-icons/blob/master/LICENSE) |
| [Teeny Icons](https://teenyicons.com/) | 0.4.1 | `quasar-extras-svg-icons/teeny-icons` | `teenyOutline`, `teenySolid` | [License](https://github.com/teenyicons/teenyicons/blob/master/LICENSE) |
| [Typicons](https://github.com/stephenhutchings/typicons.font) | 2.1.2 | `quasar-extras-svg-icons/typ-icons` | `typ` | [License](https://github.com/stephenhutchings/typicons.font#license) |
| [UIW Icons](https://uiwjs.github.io/icons/) | 2.6.18 | `quasar-extras-svg-icons/uiw-icons` | `uiw` | [License](https://github.com/uiwjs/icons/blob/master/LICENSE) |
| [Unicons](https://iconscout.com/unicons) | 4.0.8 | `quasar-extras-svg-icons/unicons` | `uni`, `uniSolid`, `uniThin` | [License](https://github.com/Iconscout/unicons/blob/master/LICENSE) |
| [Vaadin Icons v24](https://vaadin.com/components/vaadin-icons) | 24.0.5 | `quasar-extras-svg-icons/vaadin-icons-v24` | `vaadin` | [License](https://github.com/vaadin/vaadin-icons/blob/master/LICENSE) |
| Vaadin Icons v23 | 23.3.7 | `quasar-extras-svg-icons/vaadin-icons-v23` | `vaadin` | [License](https://github.com/vaadin/vaadin-icons/blob/master/LICENSE) |
| Vaadin Icons | 22.0.6 | `quasar-extras-svg-icons/vaadin-icons` | `vaadin` | [License](https://github.com/vaadin/vaadin-icons/blob/master/LICENSE) |
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
import { tabMenu } from 'quasar-extras-svg-icons/tabler-icons'
import { remBug } from 'quasar-extras-svg-icons/remix-icons'

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

- `openmoji`: we are excluding the `black` svg icons for a number of reasons. The main one is that they are stripped down versions of the color icons, but while those ones have approximately 5 icons representing skin color, the black icons are not filled in and look the same. This adds unnecessary bulk to our distribution.

- `material-theme-icons`: two icons not available because of `mask` and `LinearGradient` (cannot be flattened): `mtiCargoLock` and `mtiFlash`.

- `map-icons` icons not available because of malformed SVG: `mapBicycling`, `mapFishing`, `mapGolf`, `mapHorseRiding`, `mapMotobikeTrail`, `mapTrailWalking`, `mapViewing`, `mapWalking`

- `icons-material (mui)`: There is one icon, `imatMedicationLiquidTwoTone24px`, not available because of `use` command (cannot be flattened). 

## Missing Icon Packages?
We have tried to include some of the most popular and current SVG icon packages available. If you find a package you think should be here, do add a **feature request** in the issues section.

Also, we did try to add a LOT of other packages, but there were reasons why some of them could not be included:

1. The SVG icon set includes color and/or duo-tone icons. Quasar uses the css `currentColor` to determine color, so these icons would have had the color stripped out.
2. Even though a package has a GitHub repo with SVG icons, their NPM package was missing the SVG icons. Instead, they were just distributing the WOFF and WOFF2 fonts that comprised of the icons. If you find one like this, let them know that they should also distribute the SVG icons.
3. The SVG uses commands, like `use`, `LinearGradient`, `filter`, etc., which cannot be integreted into the Quasar Framework format.

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
- ardis-icon-theme: Uses `text`
- breeze-icons: Uses `LinearGradient`
- adwaita-icon-theme: Uses `LinearGradient` and `ClipPath`
- super-tiny-icons: Uses `use`

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
