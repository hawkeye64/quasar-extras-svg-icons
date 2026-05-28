---
title: Best Practices
desc: Practical usage guidance for SVG icon imports
keys: FAQ, best practices, icons
---

## Import only what you use

Prefer named imports from a specific icon-set folder:

```ts
import { tabOutlineMenu } from "quasar-extras-svg-icons/tabler-icons-v3";
```

Avoid importing large icon-set modules wholesale in application code. Named imports keep your intent clear and give bundlers the best chance to remove unused icons.

## Prefer versioned folders for long-lived apps

When an icon family has multiple supported majors, versioned folders such as `tabler-icons-v3` make upgrades more explicit. Unversioned folders may move forward as the package tracks newer upstream releases.

## Keep color expectations realistic

Most monochrome icons are flattened to `currentColor`, which makes them work naturally with Quasar text and button colors. Some icon sets intentionally keep fixed colors, such as flags or color emoji.

## Check the source license

The package ships upstream license files where available. Review the license for the specific icon set before using it in a product with strict compliance requirements.
