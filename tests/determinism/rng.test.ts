import { describe, expect, test } from 'vitest'
import { createRNG, deriveSeed, hashString } from '@hollowdark/rng'

describe('hashString', () => {
  test('is deterministic', () => {
    expect(hashString('hello')).toBe(hashString('hello'))
  })

  test('different inputs produce different hashes', () => {
    expect(hashString('hello')).not.toBe(hashString('world'))
  })

  test('handles empty string without crashing', () => {
    expect(hashString('')).toBeGreaterThanOrEqual(0)
  })

  test('returns a uint32', () => {
    const h = hashString('any input')
    expect(Number.isInteger(h)).toBe(true)
    expect(h).toBeGreaterThanOrEqual(0)
    expect(h).toBeLessThan(2 ** 32)
  })
})

describe('deriveSeed', () => {
  test('is deterministic', () => {
    expect(deriveSeed(42, 'label')).toBe(deriveSeed(42, 'label'))
  })

  test('different labels from same parent produce different seeds', () => {
    expect(deriveSeed(42, 'a')).not.toBe(deriveSeed(42, 'b'))
  })

  test('different parents with the same label produce different seeds', () => {
    expect(deriveSeed(1, 'x')).not.toBe(deriveSeed(2, 'x'))
  })

  test('normalizes negative parent seeds via uint32 cast', () => {
    expect(deriveSeed(-1, 'x')).toBe(deriveSeed(0xffffffff, 'x'))
  })
})

describe('createRNG — equality of streams', () => {
  test('same string seed produces the same sequence over 1000 draws', () => {
    const a = createRNG('test-seed')
    const b = createRNG('test-seed')
    for (let i = 0; i < 1000; i++) {
      expect(a.next()).toBe(b.next())
    }
  })

  test('same numeric seed produces the same sequence', () => {
    const a = createRNG(12345)
    const b = createRNG(12345)
    for (let i = 0; i < 100; i++) {
      expect(a.next()).toBe(b.next())
    }
  })

  test('different seeds produce different sequences', () => {
    const a = createRNG('seed-a')
    const b = createRNG('seed-b')
    const drawsA = Array.from({ length: 16 }, () => a.next())
    const drawsB = Array.from({ length: 16 }, () => b.next())
    expect(drawsA).not.toEqual(drawsB)
  })

  test('string and equivalent-hash numeric seed produce the same sequence', () => {
    const s = 'string-seed'
    const str = createRNG(s)
    const num = createRNG(hashString(s))
    for (let i = 0; i < 50; i++) {
      expect(str.next()).toBe(num.next())
    }
  })
})

describe('createRNG — output shape', () => {
  test('next() returns values in [0, 1)', () => {
    const rng = createRNG('range')
    for (let i = 0; i < 10000; i++) {
      const v = rng.next()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })

  test('nextInt stays within inclusive bounds', () => {
    const rng = createRNG('int')
    for (let i = 0; i < 1000; i++) {
      const v = rng.nextInt(3, 7)
      expect(v).toBeGreaterThanOrEqual(3)
      expect(v).toBeLessThanOrEqual(7)
      expect(Number.isInteger(v)).toBe(true)
    }
  })

  test('nextInt with a single value always returns that value', () => {
    const rng = createRNG('single')
    for (let i = 0; i < 50; i++) {
      expect(rng.nextInt(5, 5)).toBe(5)
    }
  })

  test('nextInt rejects empty ranges', () => {
    const rng = createRNG('range')
    expect(() => rng.nextInt(10, 5)).toThrow()
  })

  test('nextBool rejects out-of-range probability', () => {
    const rng = createRNG('bool')
    expect(() => rng.nextBool(-0.1)).toThrow()
    expect(() => rng.nextBool(1.5)).toThrow()
  })

  test('nextBool(0) is always false, nextBool(1) is always true', () => {
    const rng = createRNG('edges')
    for (let i = 0; i < 50; i++) {
      expect(rng.nextBool(0)).toBe(false)
      expect(rng.nextBool(1)).toBe(true)
    }
  })

  test('pick throws on empty array', () => {
    const rng = createRNG('empty')
    expect(() => rng.pick([])).toThrow()
  })

  test('pick returns an element of the array', () => {
    const items = ['a', 'b', 'c', 'd']
    const rng = createRNG('pick')
    for (let i = 0; i < 100; i++) {
      expect(items).toContain(rng.pick(items))
    }
  })

  test('weightedPick rejects empty / zero-total / negative weights', () => {
    const rng = createRNG('wp')
    expect(() => rng.weightedPick([])).toThrow()
    expect(() =>
      rng.weightedPick([
        ['a', 0],
        ['b', 0]
      ])
    ).toThrow()
    expect(() => rng.weightedPick([['a', -1]])).toThrow()
  })

  test('weightedPick with overwhelming weight reliably selects that side', () => {
    const rng = createRNG('skew')
    let lowCount = 0
    for (let i = 0; i < 500; i++) {
      const pick = rng.weightedPick([
        ['rare', 1],
        ['common', 99]
      ])
      if (pick === 'rare') lowCount++
    }
    // Expected ~5, allow plenty of slack for variance; just confirm the
    // distribution isn't inverted.
    expect(lowCount).toBeLessThan(50)
  })

  test('weightedPick with a single item always returns that item', () => {
    const rng = createRNG('one')
    for (let i = 0; i < 50; i++) {
      expect(rng.weightedPick([['only', 1]])).toBe('only')
    }
  })
})

describe('SeededRNG.sub — sub-RNG derivation', () => {
  test('sub-RNG is deterministic across independent parent constructions', () => {
    const a = createRNG('parent').sub('child')
    const b = createRNG('parent').sub('child')
    for (let i = 0; i < 100; i++) {
      expect(a.next()).toBe(b.next())
    }
  })

  test('different labels produce independent streams', () => {
    const parent = createRNG('parent')
    const a = parent.sub('branch-a')
    const b = parent.sub('branch-b')
    const drawsA = Array.from({ length: 10 }, () => a.next())
    const drawsB = Array.from({ length: 10 }, () => b.next())
    expect(drawsA).not.toEqual(drawsB)
  })

  test('consuming a sub-RNG does not advance the parent stream', () => {
    const p1 = createRNG('p')
    const p2 = createRNG('p')
    const child = p1.sub('x')
    for (let i = 0; i < 20; i++) child.next()
    expect(p1.next()).toBe(p2.next())
  })

  test('deeply nested subs remain stable across runs', () => {
    const chain1 = createRNG('root').sub('a').sub('b').sub('c')
    const chain2 = createRNG('root').sub('a').sub('b').sub('c')
    for (let i = 0; i < 50; i++) {
      expect(chain1.next()).toBe(chain2.next())
    }
  })

  test('sub() order matters', () => {
    const ab = createRNG('root').sub('a').sub('b')
    const ba = createRNG('root').sub('b').sub('a')
    expect(ab.next()).not.toBe(ba.next())
  })
})

describe('byte-level determinism snapshot', () => {
  // Locks the PRNG implementation. Saved worlds depend on exact byte
  // reproduction — if this test breaks, it means the PRNG changed, and
  // every existing save relying on this seed will diverge. Treat failure
  // as a migration concern, not a "just update the snapshot" fix.
  test('createRNG("hollowdark").next() × 5 matches canonical sequence', () => {
    const rng = createRNG('hollowdark')
    const first5 = [rng.next(), rng.next(), rng.next(), rng.next(), rng.next()]
    // Values computed from the current mulberry32 + xmur3 implementation.
    // Reproducible locally via: createRNG('hollowdark').next() × 5.
    expect(first5).toMatchInlineSnapshot(`
      [
        0.14088608953170478,
        0.7713804871309549,
        0.22113240463659167,
        0.6266801964957267,
        0.8969542379491031,
      ]
    `)
  })
})
