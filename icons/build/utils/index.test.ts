import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { extractSvg, writeExports } from './index.js'
import { resolveSvgAlias } from './svg-aliases.js'

function getPathStyles(svg: string) {
  const { svgDef } = extractSvg(svg, 'fixture')
  const value = svgDef.slice(svgDef.indexOf("'") + 1, -1)
  return value.split('&&').map((path) =>
    Object.fromEntries(
      (path.split('@@')[1] || '')
        .split(';')
        .filter(Boolean)
        .map((declaration) => declaration.split(':')),
    ),
  )
}

test('sprite aliases resolve forward references and chains without changing the artwork', () => {
  const original = '<g id="original"><path d="M1 1h4v4H1z"/></g>'
  const groups = new Map([
    ['alias', '<g id="alias"><use href="#middle"></use></g>'],
    ['middle', '<g id="middle"><use href="#original"></use></g>'],
    ['original', original],
  ])
  assert.equal(resolveSvgAlias('alias', groups), original)
  assert.throws(() => resolveSvgAlias('missing', groups), /Missing SVG alias/)
  groups.set('original', '<g id="original"><use href="#alias"></use></g>')
  assert.throws(() => resolveSvgAlias('alias', groups), /Circular SVG alias/)
})

test('filled icons keep their canvas transparent and their artwork filled', () => {
  const styles = getPathStyles(`<svg fill="currentColor">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M2 2h4v4H2z" />
  </svg>`)
  assert.equal(styles[0]?.fill, 'none')
  assert.equal(styles[0]?.stroke, 'none')
  assert.equal(styles[1]?.fill, 'currentColor')
})

test('outline icons preserve strokes and explicitly filled details', () => {
  const styles = getPathStyles(`<svg fill="none" stroke="currentColor" stroke-width="2">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M2 2h4v4H2z" />
    <path d="M10 10h2v2h-2z" fill="currentColor" />
  </svg>`)
  assert.equal(styles[0]?.fill, 'none')
  assert.equal(styles[0]?.stroke, 'none')
  assert.equal(styles[1]?.fill, 'none')
  assert.equal(styles[1]?.stroke, 'currentColor')
  assert.equal(styles[1]?.['stroke-width'], '2')
  assert.equal(styles[2]?.fill, 'currentColor')
})

test('repeated descendant declarations retain precedence over intermediate groups', () => {
  const styles = getPathStyles(`<svg fill="none" stroke="none">
    <g fill="currentColor" stroke="currentColor">
      <path fill="none" stroke="none" d="M0 0h24v24H0z" />
    </g>
  </svg>`)
  assert.equal(styles[0]?.fill, 'none')
  assert.equal(styles[0]?.stroke, 'none')
})

test('inline styles stay separate from SVG presentation attributes', () => {
  // Material Icon Theme's lean.svg has an Inkscape style without a trailing semicolon.
  for (const style of ['-inkscape-stroke:none', '-inkscape-stroke:none;']) {
    const styles = getPathStyles(`<svg>
      <path style="${style}" fill="#448aff" color="#000" d="M2 2h4v4H2z" />
    </svg>`)
    assert.equal(styles[0]?.['-inkscape-stroke'], 'none')
    assert.equal(styles[0]?.fill, '#448aff')
    assert.equal(styles[0]?.color, '#000')
  }
})

test('path cleanup preserves CSS function commas and explicit paint overrides', () => {
  const styles = getPathStyles(`<svg fill="none"><path
    d="M2, 2 L6, 2 L6, 6 z" fill="var(--ci-primary-color, currentColor)"
    stroke="rgba(10, 20, 30, 0.5)" /></svg>`)
  assert.equal(styles[0]?.fill, 'var(--ci-primary-color, currentColor)')
  assert.equal(styles[0]?.stroke, 'rgba(10, 20, 30, 0.5)')
})

test('referenced paints, clips, masks, and markers are excluded instead of approximated', () => {
  for (const attribute of ['fill', 'stroke', 'clip-path', 'mask', 'filter', 'marker-end']) {
    const svg = `<svg><defs><linearGradient id="paint"><stop stop-color="red"/></linearGradient></defs>
      <path ${attribute}="url(#paint)" d="M2 2h4v4H2z"/></svg>`
    assert.throws(() => extractSvg(svg, 'unsupported'), /SVG references/)
  }
  assert.throws(
    () =>
      extractSvg(
        '<svg><g style="fill:url(\'#paint\')"><path d="M2 2h4v4H2z"/></g></svg>',
        'inline',
      ),
    /SVG references/,
  )
})

test('unsupported icons are reconsidered when upstream replaces references with paths', () => {
  assert.throws(
    () => extractSvg('<svg><use href="#original"/></svg>', 'updated'),
    /Unsupported tag/,
  )
  assert.match(
    extractSvg('<svg><path d="M2 2h4v4H2z"/></svg>', 'updated').svgDef,
    /^export const updated = /,
  )
})

test('unused definitions do not become painted paths', () => {
  const svg = '<svg><defs><rect width="24" height="24"/></defs><path d="M2 2h4v4H2z"/></svg>'
  assert.equal(
    extractSvg(svg, 'unused').svgDef,
    extractSvg('<svg><path d="M2 2h4v4H2z"/></svg>', 'unused').svgDef,
  )
})

test('nested viewports and animation-dependent paths are excluded', () => {
  assert.throws(
    () =>
      extractSvg(
        '<svg><svg x="5" viewBox="0 0 10 10"><path d="M2 2h4v4H2z"/></svg></svg>',
        'viewport',
      ),
    /Nested SVG viewports/,
  )
  assert.throws(
    () =>
      extractSvg(
        '<svg><path d="M2 2h4v4H2z"><animate attributeName="d" values="M0 0;M2 2"/></path></svg>',
        'animation',
      ),
    /Unsupported tag: "animate"/,
  )
})

test('excluding an entire set clears old exports and documents the skipped name', () => {
  const folder = mkdtempSync(join(tmpdir(), 'svg-exclusions-'))
  try {
    writeFileSync(join(folder, 'index.mjs'), "export const old = 'M0 0z'")
    writeFileSync(join(folder, 'index.d.ts'), 'export declare const old: string;')
    writeExports('Fixture', '1.0.0', folder, [], [], ['old'])
    for (const entry of ['index.mjs', 'index.d.ts']) {
      const content = readFileSync(join(folder, entry), 'utf8')
      assert.doesNotMatch(content, /const old/)
      assert.match(content, /export \{\}/)
    }
    assert.match(readFileSync(join(folder, 'README.md'), 'utf8'), /`old`/)
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
})

test('export generation creates a new catalog directory', () => {
  const root = mkdtempSync(join(tmpdir(), 'svg-new-catalog-'))
  const folder = join(root, 'new', 'catalog')
  const { svgDef, typeDef } = extractSvg('<svg><path d="M2 2h4v4H2z"/></svg>', 'fixture')
  try {
    writeExports('Fixture', '1.0.0', folder, [svgDef], [typeDef], [])
    assert.ok(readFileSync(join(folder, 'index.mjs'), 'utf8').includes(svgDef))
    assert.ok(readFileSync(join(folder, 'index.d.ts'), 'utf8').includes(typeDef))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
