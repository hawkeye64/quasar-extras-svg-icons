# Live Icon Explorer exclusion audit — 2026-09-29

## Decision

**The proposed 2,042 removals are not all supported by rendering defects. Do not release the current blanket exclusion change as prepared.** The mere presence of a gradient, clipping path, mask, or reference in an upstream file does not establish that its published QIcon output was unusable.

All 2,042 proposed removals were located and rendered through the actual production UI at https://iconexplorer.app. The live site reports Icon Explorer 3.3.14, Quasar 2.32.3, and quasar-extras-svg-icons 3.3.7. Every captured SVG's view box, path geometry, inline CSS, and transforms match the published 3.3.7 definition after browser parsing. None of these live captures used the locally modified icon catalog.

| Outcome                                              | Icons | Interpretation                                                                                                                                                                                                |
| ---------------------------------------------------- | ----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blank live rendering                                 |   841 | Confirmed absent artwork; supports excluding these icons.                                                                                                                                                     |
| Exact match to upstream rendering at 128px           |   479 | No conversion defect demonstrated; do not remove solely for an unsupported source feature.                                                                                                                    |
| Minor pixel differences                              |    78 | Both alpha and color errors are below 0.1% of the full canvas. These are not evidence of an unusable icon.                                                                                                    |
| Larger visible differences                           |   642 | Includes missing artwork, mask squares, bad viewports, and changed shading. A difference is not automatically evidence that nobody could use the icon; review the visual evidence before deciding exclusions. |
| Solid square, also present in upstream source        |     1 | `health-icons-v1/healthNegativeBurn`; already defective upstream.                                                                                                                                             |
| Working published replacement, blank upstream source |     1 | `modern-icons/modernBattery30` already displays a battery through the existing published replacement. Removing it would remove working output.                                                                |

The 43 sources already excluded before this change are outside this 2,042-export removal comparison. This audit does not establish whether any icon is used by downstream applications.

## Concrete findings

- [akarBehanceFill](https://iconexplorer.app/icons/akar-icons?filter=%5EBehanceFill%24), [akarGithubFill](https://iconexplorer.app/icons/akar-icons?filter=%5EGithubFill%24), and [akarReactFill](https://iconexplorer.app/icons/akar-icons?filter=%5EReactFill%24) already display correctly. Thirty-two of the 33 proposed Akar removals match their upstream rendering exactly; the remaining Akar icon has a tiny raster difference.
- All 15 proposed Iconoir removals match their upstream rendering exactly. So do 366 Devicons, 45 IconPark icons, five Fluent UI icons, and five PrimeIcons.
- The four Material Icon Theme folder icons previously provided through overrides already render correctly. A policy change removing those established replacements would remove working artwork.
- [cifVa in CoreUI](https://iconexplorer.app/icons/coreui-icons?filter=%5EVa%24) and [CoreUI v3](https://iconexplorer.app/icons/coreui-icons-v3?filter=%5EVa%24) are visible flags, not blank icons. At 128px their silhouettes match upstream exactly; their measured color differences are only 0.00321% and 0.00614% of the full RGB canvas respectively. Treating every gradient reference as a significant rendering failure was too aggressive.
- [matThemeKotlin](https://iconexplorer.app/icons/material-icon-theme-v5?filter=%5EThemeKotlin%24), [matThemeLiara](https://iconexplorer.app/icons/material-icon-theme-v5?filter=%5EThemeLiara%24), and [matThemeMaven](https://iconexplorer.app/icons/material-icon-theme-v5?filter=%5EThemeMaven%24) are blank in the live grid and preview.
- [matThemeAurelia](https://iconexplorer.app/icons/material-icon-theme-v5?filter=%5EThemeAurelia%24) is missing most of its colored artwork. [matThemeVedic](https://iconexplorer.app/icons/material-icon-theme-v5?filter=%5EThemeVedic%24) has a misplaced/clipped viewport.
- [radixPanelBottom](https://iconexplorer.app/icons/radix-ui-icons?filter=%5EPanelBottom%24) is visible but substantially different: the intended outlined panel becomes a largely filled shape. Visibility alone is not a sufficient correctness test either.

## Evidence and method

1. Opened the production site in Chromium, selected each family through its actual Vue router, and filtered the grid to batches of proposed removals. Captured the live SVG DOM and full-page screenshots for every batch.
2. Validated the captured DOM against the published 3.3.7 package's generated path definitions. All 2,042 comparisons passed. The comparison uses parsed SVG structure, not inaccessible production Vue component props.
3. Rasterized the captured DOM at 128 × 128 and compared it with native upstream SVG rendering. Used pinned source versions corresponding to the published catalog, including Carbon 11.88.0, Fluent UI 1.1.341, and PrimeIcons 8.0.1. Other active source versions match their published banners. Retained historical sources are identified per row in the CSV.
4. Normalized documented monochrome color substitutions (Devicons, Glyphs, IconPark) and compared both alpha and premultiplied RGB. Material Line references use the previously captured final static animation state from pinned upstream sources. This is a static visual check, not an animation fidelity claim.
5. Opened 16 representative icons in their real production detail dialogs in both light and dark themes: 32 preview checks passed. Grid and preview SVGs were identical for every sample. Samples include Kotlin, Liara, Maven, both Vatican flags, working icons, and visible-but-damaged icons.

“Exact match” describes this native comparison at 128px; it is not a proof at every resolution or a guarantee that the upstream design itself is defect-free. “Minor difference” is a review category, not an automatic acceptance rule. The website grid uses 92px icons and its detail dialog uses 148px icons.

Initial tooling checks were corrected during the audit: the site's family filter strips the lowercase export prefix; multiple prefixes can yield extra matching names; production Vue props are unavailable; and two upstream XML strings required their BOM removed before DOMParser comparison. All 2,042 final captures and comparisons completed successfully. No production source, exclusions, package version, commit, or release was changed during this verification.

## Per-set results

| Set                     | Proposed removals | Blank | Exact match | Minor difference | Visible difference | Other |
| ----------------------- | ----------------: | ----: | ----------: | ---------------: | -----------------: | ----: |
| akar-icons              |                33 |     0 |          32 |                1 |                  0 |     0 |
| carbon-icons-v11        |                 5 |     0 |           1 |                4 |                  0 |     0 |
| coreui-icons            |                 7 |     0 |           1 |                3 |                  3 |     0 |
| coreui-icons-v3         |                23 |     0 |           1 |                3 |                 19 |     0 |
| dev-icons-v2            |               744 |    64 |         366 |               55 |                259 |     0 |
| flatui-icons            |                16 |     0 |           1 |                0 |                 15 |     0 |
| fluentui-system-icons   |               885 |   762 |           5 |                0 |                118 |     0 |
| glyphs-core-icons       |                 2 |     0 |           0 |                1 |                  1 |     0 |
| grid-icons              |                 1 |     0 |           0 |                1 |                  0 |     0 |
| health-icons-v1         |                 1 |     0 |           0 |                0 |                  0 |     1 |
| iconoir-icons-v7        |                15 |     0 |          15 |                0 |                  0 |     0 |
| iconpark-icons          |                54 |     0 |          45 |                7 |                  2 |     0 |
| material-icon-theme-v5  |                27 |     4 |           5 |                2 |                 16 |     0 |
| material-line-icons     |                96 |     5 |           0 |                0 |                 91 |     0 |
| material-line-icons-v1  |               111 |     5 |           0 |                0 |                106 |     0 |
| material-theme-icons    |                 2 |     0 |           0 |                0 |                  2 |     0 |
| material-theme-icons-v3 |                 3 |     0 |           0 |                0 |                  3 |     0 |
| modern-icons            |                 1 |     0 |           0 |                0 |                  0 |     1 |
| openmoji-icons-v16      |                 1 |     0 |           1 |                0 |                  0 |     0 |
| openmoji-icons-v17      |                 2 |     0 |           1 |                0 |                  1 |     0 |
| prime-icons-v8          |                 6 |     0 |           5 |                1 |                  0 |     0 |
| radix-ui-icons          |                 6 |     0 |           0 |                0 |                  6 |     0 |
| windows-icons           |                 1 |     1 |           0 |                0 |                  0 |     0 |

## Validation

- Python coverage/integrity assertions: passed. CSV, live captures, and comparisons each contain exactly the 2,042 proposed removed exports, with no duplicates or missing names. All published-DOM comparisons and all 32 sampled preview checks passed.
- `pnpm exec oxfmt --check .github/reports/icon-exclusions-live-2026-09-29.md`: passed.
- `git diff --check`: passed.

## Review files

- [All 2,042 names, classifications, measurements, and live links](icon-exclusions-live-2026-09-29.csv)
- [Interactive comparison gallery](/tmp/iconexplorer-live-exclusions/gallery.html)
- [Working and near-matching examples](/tmp/iconexplorer-live-exclusions/working-comparisons.png)
- [Broken examples](/tmp/iconexplorer-live-exclusions/broken-comparisons.png)
- Actual production grid screenshots: `/tmp/iconexplorer-live-exclusions/screenshots/`
- Actual production dialog screenshots: `/tmp/iconexplorer-live-exclusions/previews/`
- Capture, comparison, and preview JSON: `/tmp/iconexplorer-live-exclusions/live-records.json`, `comparisons.json`, and `preview-checks.json`

The exclusion scope still needs correction before publication; changing the version does not validate the proposed removals.
