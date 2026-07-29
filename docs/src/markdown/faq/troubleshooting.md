---
title: Troubleshooting
desc: Common fixes for icon import and rendering issues
keys: FAQ, troubleshooting, icons
---

:::details Q. My icon import cannot be resolved

Check that the folder name matches the current package output. The [Icon Finder](/getting-started/icon-finder) and [Introduction](/getting-started/introduction) page list the generated icon sets and import paths.

The package keeps at most the current and immediately preceding major version
of an icon family. If an older versioned import path was retired, use the Icon
Finder and release notes to select a shipped path and update the import.

:::

:::details Q. My icon renders as a square or looks incomplete

Some upstream SVGs use features that cannot be flattened safely, such as `mask`, `use`, gradients, filters, or malformed view boxes. Known issues are documented on the [Introduction](/getting-started/introduction) page.

The package can recover selected upstream problems with reviewed plain-path overrides. If a newly published version says an icon was recovered but it still looks wrong in your app, include the icon-set folder, export name, source SVG behavior, and a screenshot in the issue.

:::

:::details Q. My icon color does not change

Some icon sets preserve fixed colors by design. This is common for flags, emoji, and brand assets. Monochrome icon sets are usually converted to `currentColor`.

:::

:::details Q. TypeScript cannot find declarations

Make sure you are importing from a shipped folder and that your package manager installed the current version:

```bash
pnpm add quasar-extras-svg-icons
```

Use the equivalent `bun`, `yarn`, or `npm` command if your project uses a different package manager.
:::
