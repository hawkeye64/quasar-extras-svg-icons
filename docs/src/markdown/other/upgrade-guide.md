---
title: Upgrade Guide
desc: Upgrade to quasar-extras-svg-icons v3
keys: Help, upgrade, migration, icons
related:
  - /getting-started/introduction
  - /getting-started/icon-finder
  - /other/releases
---

Use this guide to migrate from `quasar-extras-svg-icons` v2 to v3.

> This package is not a Quasar app extension. Install it as a package dependency and import icons directly from the generated icon-set folders.

> Check the [Releases](/other/releases) page for the latest notes before publishing an app that depends on a specific icon set.

## quasar-extras-svg-icons v3

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
| Corepack-pinned pnpm for this repo | `11.13.0`                 |
| Runtime package usage              | Direct dependency imports |

## Installing v3

Install the package from the default npm dist tag.

```tabs
<<| bash pnpm |>>
pnpm add quasar-extras-svg-icons
<<| bash bun |>>
bun add quasar-extras-svg-icons
<<| bash yarn |>>
yarn add quasar-extras-svg-icons
<<| bash npm |>>
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

Some icons that would otherwise be skipped are recovered with package-owned plain-path overrides. This keeps the generated output compatible with `QIcon` while allowing reviewed fixes for missing upstream SVGs, harmless package glitches, or visually checked recovery work such as the CoreUI flag override proof.

## Contributor Tooling Changes

The repository currently pins these contributor tools:

- `pnpm@11.13.0` through the root `packageManager` field
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
