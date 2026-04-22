import { describe, expect, test } from 'vitest'
import { deepEqual } from 'utils/equal'

describe('deepEqual — primitives', () => {
  test('identical primitives', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual('a', 'a')).toBe(true)
    expect(deepEqual(true, true)).toBe(true)
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(undefined, undefined)).toBe(true)
  })

  test('different primitives', () => {
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual('a', 'b')).toBe(false)
    expect(deepEqual(null, undefined)).toBe(false)
  })

  test('NaN is treated as equal to NaN (Object.is semantics)', () => {
    expect(deepEqual(NaN, NaN)).toBe(true)
  })

  test('+0 and -0 are distinct (Object.is semantics)', () => {
    expect(deepEqual(0, -0)).toBe(false)
  })
})

describe('deepEqual — arrays', () => {
  test('same-length equal arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  test('different-length arrays', () => {
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  test('different elements', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  test('nested arrays', () => {
    expect(
      deepEqual(
        [
          [1, 2],
          [3, 4]
        ],
        [
          [1, 2],
          [3, 4]
        ]
      )
    ).toBe(true)
  })

  test('array vs non-array', () => {
    expect(deepEqual([1], { 0: 1, length: 1 })).toBe(false)
  })
})

describe('deepEqual — objects', () => {
  test('same-shape objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
  })

  test('order of keys does not matter', () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
  })

  test('missing key on one side', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  })

  test('nested objects', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true)
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false)
  })
})

describe('deepEqual — Map', () => {
  test('equal maps', () => {
    expect(
      deepEqual(
        new Map([
          ['a', 1],
          ['b', 2]
        ]),
        new Map([
          ['a', 1],
          ['b', 2]
        ])
      )
    ).toBe(true)
  })

  test('different sizes', () => {
    expect(deepEqual(new Map([['a', 1]]), new Map([['a', 1], ['b', 2]]))).toBe(false)
  })

  test('different values', () => {
    expect(deepEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false)
  })
})

describe('deepEqual — Set', () => {
  test('equal sets', () => {
    expect(deepEqual(new Set([1, 2, 3]), new Set([3, 2, 1]))).toBe(true)
  })

  test('different sets', () => {
    expect(deepEqual(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false)
  })
})

describe('deepEqual — Date', () => {
  test('same timestamp is equal', () => {
    expect(deepEqual(new Date(1000), new Date(1000))).toBe(true)
  })

  test('different timestamps', () => {
    expect(deepEqual(new Date(1000), new Date(2000))).toBe(false)
  })

  test('Date vs non-Date', () => {
    expect(deepEqual(new Date(0), 0)).toBe(false)
  })
})

describe('deepEqual — mixed', () => {
  test('deep structure typical of simulation state', () => {
    const a = {
      id: 'p1',
      name: { given: 'Meera', surname: 'Sarwath' },
      traits: new Map([['openness', 72]]),
      friends: new Set(['p2', 'p3']),
      events: [{ t: 10, kind: 'birth' }]
    }
    const b = {
      id: 'p1',
      name: { given: 'Meera', surname: 'Sarwath' },
      traits: new Map([['openness', 72]]),
      friends: new Set(['p3', 'p2']),
      events: [{ t: 10, kind: 'birth' }]
    }
    expect(deepEqual(a, b)).toBe(true)
  })
})
