/**
 * Deterministic string hashing and sub-seed derivation. Shared between the
 * PRNG and any other system that needs stable-across-runs uint32 from
 * string keys.
 */

/**
 * xmur3 string hash. Returns a uint32. Pure function — same input always
 * produces the same output.
 */
export function hashString(input: string): number {
  let h = 1779033703 ^ input.length
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  h ^= h >>> 16
  return h >>> 0
}

/**
 * Derive a child seed from a parent seed and a label. Stable: same
 * (parentSeed, label) always produces the same child seed, which is what
 * lets Tier 3 NPCs be regenerated on demand from their (world, identity)
 * tuple without storing their state.
 */
export function deriveSeed(parentSeed: number, label: string): number {
  return hashString(`${parentSeed >>> 0}:${label}`)
}
