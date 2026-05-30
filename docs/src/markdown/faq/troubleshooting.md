---
title: Troubleshooting
desc: Common fixes for icon import and rendering issues
keys: FAQ, troubleshooting, icons
---

:::details Q. My icon import cannot be resolved

Check that the folder name matches the current package output. The [Icon Finder](/getting-started/icon-finder) and [Introduction](/getting-started/introduction) page list the generated icon sets and import paths.

:::

:::details Q. My icon renders as a square or looks incomplete

Some upstream SVGs use features that cannot be flattened safely, such as `mask`, `use`, gradients, filters, or malformed view boxes. Known issues are documented on the [Introduction](/getting-started/introduction) page.

:::

:::details Q. My icon color does not change

Some icon sets preserve fixed colors by design. This is common for flags, emoji, and brand assets. Monochrome icon sets are usually converted to `currentColor`.

:::

:::details Q. TypeScript cannot find declarations

Make sure you are importing from a shipped folder and that your package manager installed the current version:

```bash
pnpm add quasar-extras-svg-icons@beta
```

Use the equivalent `bun`, `yarn`, or `npm` command if your project uses a different package manager.
:::
