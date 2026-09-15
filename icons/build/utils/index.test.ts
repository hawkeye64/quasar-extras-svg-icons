import assert from 'node:assert/strict'
import { test } from 'node:test'

import { extractSvg } from './index.js'

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
