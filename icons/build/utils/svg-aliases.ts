/** Resolve the plain, untransformed group aliases used by Vaadin's icon sprite. */
export function resolveSvgAlias(name: string, groups: ReadonlyMap<string, string>): string {
  const visited = new Set<string>()
  while (!visited.has(name)) {
    visited.add(name)
    const group = groups.get(name)
    if (!group) throw new Error(`Missing SVG alias target: ${name}`)
    const alias = group.match(/^<g id="[^"]+"><use href="#([^"]+)"><\/use><\/g>$/)
    if (!alias) return group
    name = alias[1]
  }
  throw new Error(`Circular SVG alias: ${name}`)
}
