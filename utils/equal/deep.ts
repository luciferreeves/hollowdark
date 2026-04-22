/**
 * Structural deep equality, used by determinism tests to compare
 * simulation snapshots. Handles plain objects, arrays, Maps, Sets, Dates,
 * and primitives. Does not handle class instances with custom equality or
 * cyclic object graphs — simulation state is a tree, not a graph.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true

  if (typeof a !== typeof b) return false
  if (a === null || b === null) return false
  if (typeof a !== 'object') return false

  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime()
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  if (a instanceof Map || b instanceof Map) {
    if (!(a instanceof Map) || !(b instanceof Map)) return false
    if (a.size !== b.size) return false
    for (const [key, value] of a) {
      if (!b.has(key) || !deepEqual(value, b.get(key))) return false
    }
    return true
  }

  if (a instanceof Set || b instanceof Set) {
    if (!(a instanceof Set) || !(b instanceof Set)) return false
    if (a.size !== b.size) return false
    for (const value of a) {
      if (!b.has(value)) return false
    }
    return true
  }

  const aObj = a as Record<string, unknown>
  const bObj = b as Record<string, unknown>
  const aKeys = Object.keys(aObj)
  const bKeys = Object.keys(bObj)
  if (aKeys.length !== bKeys.length) return false
  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false
    if (!deepEqual(aObj[key], bObj[key])) return false
  }
  return true
}
