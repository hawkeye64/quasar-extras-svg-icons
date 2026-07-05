---
title: Overview
desc: How to contribute
keys: contributing
---

Thanks for helping improve `quasar-extras-svg-icons`.

Please open an issue before larger changes so we can align on scope first. That is especially helpful for new icon families, parser changes, and source-package upgrades because they can affect package size, generated exports, and downstream imports.

Useful contribution areas include:

- Reporting broken or missing icons.
- Suggesting icon packages that ship usable SVG assets.
- Improving parser handling for SVG features we can safely flatten.
- Creating or reviewing package-owned plain-path overrides for upstream SVGs that are missing, malformed, or too rich for Quasar's compact icon string format.
- Improving documentation and icon metadata.
- Testing package output in real Quasar apps.

For override work, include the source SVG, the generated override SVG, and a visual comparison. Recovery techniques that change geometry, such as rendering with `resvg` and tracing with `vtracer`, should be treated as reviewed assets rather than automatic build steps.
