import { describe, expect, test } from 'vitest'
import { assert } from '@hollowdark/utils/assert/assert'
import { assertDefined } from '@hollowdark/utils/assert/assert-defined'
import { assertNever } from '@hollowdark/utils/assert/assert-never'

describe('assert', () => {
  test('passes on truthy condition', () => {
    expect(() => assert(true)).not.toThrow()
    expect(() => assert(1)).not.toThrow()
    expect(() => assert('non-empty')).not.toThrow()
  })

  test('throws on falsy condition', () => {
    expect(() => assert(false)).toThrow(/Assertion failed/)
    expect(() => assert(0)).toThrow()
    expect(() => assert(null)).toThrow()
    expect(() => assert(undefined)).toThrow()
    expect(() => assert('')).toThrow()
  })

  test('uses supplied message', () => {
    expect(() => assert(false, 'custom reason')).toThrow(/custom reason/)
  })
})

describe('assertDefined', () => {
  test('returns the value when defined', () => {
    expect(assertDefined(5)).toBe(5)
    expect(assertDefined('')).toBe('')
    expect(assertDefined(false)).toBe(false)
    expect(assertDefined(0)).toBe(0)
  })

  test('throws on null / undefined', () => {
    expect(() => assertDefined(null)).toThrow()
    expect(() => assertDefined(undefined)).toThrow()
  })

  test('uses supplied message', () => {
    expect(() => assertDefined(null, 'nope')).toThrow(/nope/)
  })
})

describe('assertNever', () => {
  test('always throws', () => {
    expect(() => assertNever('x' as never)).toThrow()
  })
})
