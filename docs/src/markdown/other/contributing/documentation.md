---
title: Documentation
desc: Documentation contribution guidance
keys: contributing
---

Documentation lives in `docs/src/markdown`.

The icon-set metadata table is generated from package output. If icon counts, versions, prefixes, or import paths look wrong, check the generated `index.d.ts` files and then run:

```bash
pnpm --filter docs generate:icon-metadata
```

When changing docs, run:

```bash
pnpm format:check
pnpm --filter docs build
```
