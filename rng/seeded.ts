import { deriveSeed, hashString } from './derive'

/**
 * Seeded PRNG. All gameplay randomness routes through this interface —
 * Math.random is forbidden in gameplay code (see ARCHITECTURE.md §26
 * and eslint.config.js).
 *
 * Guarantees:
 *   - Same seed produces the same infinite sequence, bit-for-bit.
 *   - sub(label) produces a deterministic child stream, independent of
 *     how the parent stream is consumed.
 *   - Byte-level reproducibility across runs and machines.
 */
export interface SeededRNG {
  readonly seed: number
  /** Float in [0, 1). */
  next(): number
  /** Integer in [min, max], both inclusive. */
  nextInt(min: number, max: number): number
  /** Bernoulli draw with the given success probability. */
  nextBool(probability: number): boolean
  /** Uniform choice from a non-empty array. */
  pick<T>(items: readonly T[]): T
  /** Weighted choice from a non-empty list of (value, weight) tuples. */
  weightedPick<T>(items: readonly (readonly [T, number])[]): T
  /** Derive a new, independent RNG keyed by label and this RNG's seed. */
  sub(label: string): SeededRNG
}

/**
 * mulberry32 — 32-bit PRNG. Small, fast, and has good statistical
 * properties for game-scale use. Not cryptographic; not intended to be.
 */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

class SeededRNGImpl implements SeededRNG {
  readonly seed: number
  readonly #gen: () => number

  constructor(seed: number) {
    this.seed = seed >>> 0
    this.#gen = mulberry32(this.seed)
  }

  next(): number {
    return this.#gen()
  }

  nextInt(min: number, max: number): number {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      throw new Error(`rng.nextInt: bounds must be finite (got ${min}, ${max})`)
    }
    const lo = Math.ceil(min)
    const hi = Math.floor(max)
    if (hi < lo) {
      throw new Error(`rng.nextInt: empty range [${min}, ${max}]`)
    }
    return lo + Math.floor(this.#gen() * (hi - lo + 1))
  }

  nextBool(probability: number): boolean {
    if (probability < 0 || probability > 1 || !Number.isFinite(probability)) {
      throw new Error(`rng.nextBool: probability must be in [0, 1] (got ${probability})`)
    }
    return this.#gen() < probability
  }

  pick<T>(items: readonly T[]): T {
    if (items.length === 0) {
      throw new Error('rng.pick: items is empty')
    }
    const idx = Math.floor(this.#gen() * items.length)
    return items[idx] as T
  }

  weightedPick<T>(items: readonly (readonly [T, number])[]): T {
    if (items.length === 0) {
      throw new Error('rng.weightedPick: items is empty')
    }
    let total = 0
    for (const [, weight] of items) {
      if (!Number.isFinite(weight) || weight < 0) {
        throw new Error(`rng.weightedPick: invalid weight ${weight}`)
      }
      total += weight
    }
    if (total <= 0) {
      throw new Error('rng.weightedPick: total weight is zero')
    }
    const roll = this.#gen() * total
    let cumulative = 0
    for (const [value, weight] of items) {
      cumulative += weight
      if (roll < cumulative) return value
    }
    // Numerical safety: if we fall off the end due to floating-point drift,
    // return the last item rather than throw.
    return items[items.length - 1]![0]
  }

  sub(label: string): SeededRNG {
    return new SeededRNGImpl(deriveSeed(this.seed, label))
  }
}

/**
 * Create a new seeded RNG. Accepts a string (which is hashed) or a number
 * (used directly as a uint32 seed).
 */
export function createRNG(seed: string | number): SeededRNG {
  const numeric = typeof seed === 'number' ? seed >>> 0 : hashString(seed)
  return new SeededRNGImpl(numeric)
}
