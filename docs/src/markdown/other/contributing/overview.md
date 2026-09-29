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
- Documenting excluded icons and reporting incompatible or malformed SVG sources upstream.
- Improving documentation and icon metadata.
- Testing package output in real Quasar apps.

For parser fixes, include the upstream SVG and a regression test showing that its original artwork is preserved. SVGs requiring unsupported features are excluded and documented in the affected set's README; do not add replacement SVGs, traced artwork, or gradient approximations.
