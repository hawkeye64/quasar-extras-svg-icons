---
title: Upgrade Guide
desc: Upgrade to quasar-extras-svg-icons v3
keys: Help, upgrade, migration, icons
related:
  - /getting-started/introduction
  - /getting-started/icon-finder
  - /other/releases
---

Use this guide to update `quasar-extras-svg-icons` within v3 or migrate an older application from v2.

> This package is not a Quasar app extension. Install it as a package dependency and import icons directly from the generated icon-set folders.

> Check the [Releases](/other/releases) page for the latest notes before publishing an app that depends on a specific icon set.

## Updating within v3

Updates within v3 add upstream icons and include icon rendering fixes and catalog updates. Read the release notes and per-set READMEs for changes affecting the icons you import.

1. Check your named imports against the [excluded icon lists](/getting-started/introduction#excluded-icons).
2. Remove affected imports or select another supported icon. If you need the original artwork, use the upstream SVG through QIcon's `img:` support.
3. Rebuild and typecheck your application to find any remaining imports of excluded names.

The ESM package structure and QIcon path-string format remain the same.

## Earlier migration: v2 to v3

The v3 line refreshes the package for the current Quasar 2 and Quasar CLI Vite generation while keeping the icon exports simple for devland usage.

Important changes:

- Package tooling now uses the shared v3 migration stack: pnpm, oxlint, oxfmt, TypeScript, and Quasar CLI Vite 3 for docs.
- Documentation uses Q-Press and includes an in-site release history.
- Icon metadata is generated from shipped type declarations so docs reflect the package output.
- Icon-set majors are kept side-by-side where practical, with at most the
  current major and the immediately preceding major.
- Known problematic SVG features are documented so consumers can understand missing or altered icons.

## Requirements

| Area                               | v3                        |
| ---------------------------------- | ------------------------- |
| Quasar                             | Quasar 2                  |
| Vue                                | Vue 3                     |
| Node.js for this repo and CI       | `>=22.13`                 |
| Minimum supported pnpm             | `>=11.5.0`                |
| Corepack-pinned pnpm for this repo | `12.6.0`                  |
| Runtime package usage              | Direct dependency imports |

## Installing v3

Install the package from the default npm dist tag.

```tabs
<<| bash [icon=pnpm] pnpm |>>
pnpm add quasar-extras-svg-icons
<<| bash [icon=bun] bun |>>
bun add quasar-extras-svg-icons
<<| bash [icon=yarn] yarn |>>
yarn add quasar-extras-svg-icons
<<| bash [icon=npm] npm |>>
npm install quasar-extras-svg-icons
```

## Updating Imports

Prefer explicit imports from the icon-set folder you want:

```ts
import { tabOutlineMenu } from 'quasar-extras-svg-icons/tabler-icons-v3'
import { remBugLine } from 'quasar-extras-svg-icons/remix-icons-v4'
```

If you previously used an unversioned folder and an icon family has moved forward, check the [Icon Finder](/getting-started/icon-finder) for the current folder and export name.

## Versioned Icon Folders

Some icon families are shipped in multiple major versions. In those cases:

- The package keeps at most two majors: the current major and the immediately
  preceding major.
- When a newer major is added, the oldest shipped major and its import path are
  removed.
- Use the versioned folder when stability matters, such as `simple-icons-v16`.
- Use the unversioned folder only when you are comfortable following the package's current default for that family.
- Review your imports after package upgrades if an upstream icon family has a new major release.

## Known SVG Limitations

Some upstream SVGs cannot be flattened into Quasar's icon string format. Common blockers include:

- `mask`
- `use`
- `clipPath`
- gradients
- filters
- malformed view boxes

The [Introduction](/getting-started/introduction) page tracks known package-specific limitations.

Unsupported icons are excluded and documented in each affected set's README. The generated runtime exports, TypeScript declarations, and icon lists all omit those names.

## Contributor Tooling Changes

The repository currently pins these contributor tools:

- `pnpm@12.6.0` through the root `packageManager` field
- Node.js `>=22.13`
- `oxlint` instead of ESLint
- `oxfmt` instead of Prettier
- Quasar CLI Vite 3 for docs

Use the existing scripts for local verification:

```bash
pnpm format:check
pnpm lint
pnpm test:smoke
pnpm build
pnpm typecheck
```
