---
title: General FAQ
desc: Common questions about quasar-extras-svg-icons
keys: FAQ, help, icons
---

:::details Q. What is quasar-extras-svg-icons?

`quasar-extras-svg-icons` is a companion icon package for Quasar apps. It exposes SVG icon strings that can be passed directly to Quasar components such as `QIcon`, `QBtn`, and icon-set overrides.

:::

:::details Q. Is this an app extension?

No. Install it as a package dependency and import the icon names you need. There is no `quasar ext add` step for this project.

:::

:::details Q. How do I find an icon?

Use the [Icon Finder](/getting-started/icon-finder) to browse the generated icon metadata and copy import paths.

:::

:::details Q. Can I use these icons outside Quasar?

The exports are strings formatted for Quasar's SVG icon support. They are most useful in Quasar apps, but the string format is plain data if you want to adapt it yourself.
:::
