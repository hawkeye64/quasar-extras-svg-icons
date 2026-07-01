# quasar-extras-svg-icons Docs

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

This package contains the Q-Press documentation site for `quasar-extras-svg-icons`. It owns the package overview pages, icon-set metadata, install guidance, and examples for using flattened SVG icon exports in Quasar apps.

The docs app generates icon metadata before local development and SPA builds so the docs can present the available icon sets from the workspace.

## Development

From the repository root:

```bash
pnpm install
pnpm --dir docs dev
```

The docs `dev` script runs `generate:icon-metadata` before starting Quasar.

## Build

From the repository root:

```bash
pnpm --dir docs build
```

The production docs build runs `quasar build` and `qpress ssg`; output is emitted to `docs/dist/spa`.

## Checks

Useful docs checks:

```bash
pnpm --dir docs format:check
pnpm --dir docs lint
pnpm --dir docs check:qpress
```
