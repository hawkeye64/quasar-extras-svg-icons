---
title: Upgrade Guide
desc: Upgrade to quasar-extras-svg-icons v3
keys: Help, upgrade, migration, icons
related:
  - /getting-started/introduction
  - /getting-started/icon-finder
  - /other/releases
---

Use this guide to migrate from `quasar-extras-svg-icons` v2 to the v3 beta line.

> This package is not a Quasar app extension. Install it as a package dependency and import icons directly from the generated icon-set folders.

> Check the [Releases](/other/releases) page for the latest beta notes before publishing an app that depends on a specific icon set.

## quasar-extras-svg-icons v3 Beta

The v3 beta line refreshes the package for the current Quasar 2 and Quasar CLI Vite generation while keeping the icon exports simple for devland usage.

Important changes:

- Package tooling now uses the shared v3 migration stack: pnpm, oxlint, oxfmt, TypeScript, and Quasar CLI Vite 3 for docs.
- Documentation uses Q-Press and includes an in-site release history.
- Icon metadata is generated from shipped type declarations so docs reflect the package output.
- Recent icon-set majors are kept side-by-side where practical, with versioned folders such as `tabler-icons-v3`.
- Known problematic SVG features are documented so consumers can understand missing or altered icons.

## Requirements

| Area                          | v3 beta                   |
| ----------------------------- | ------------------------- |
| Quasar                        | Quasar 2                  |
| Vue                           | Vue 3                     |
| Node.js for this repo and CI  | `>=22.13`                 |
| Package manager for this repo | `pnpm >=11.4.0`           |
| Runtime package usage         | Direct dependency imports |

## Installing The Beta

While v3 is in beta, install from the `beta` dist tag.

```tabs
<<| bash pnpm |>>
pnpm add quasar-extras-svg-icons@beta
<<| bash bun |>>
bun add quasar-extras-svg-icons@beta
<<| bash yarn |>>
yarn add quasar-extras-svg-icons@beta
<<| bash npm |>>
npm install quasar-extras-svg-icons@beta
```

When v3 is released as stable, remove the `@beta` tag.

## Updating Imports

Prefer explicit imports from the icon-set folder you want:

```ts
import { tabOutlineMenu } from "quasar-extras-svg-icons/tabler-icons-v3";
import { remBugLine } from "quasar-extras-svg-icons/remix-icons-v4";
```

If you previously used an unversioned folder and an icon family has moved forward, check the [Icon Finder](/getting-started/icon-finder) for the current folder and export name.

## Versioned Icon Folders

Some icon families are shipped in multiple major versions. In those cases:

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

## Contributor Tooling Changes

The repository now uses:

- `pnpm@11.4.0`
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
