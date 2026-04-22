import { describe, expect, test } from 'vitest'
import { err, ok } from '@hollowdark/utils/result/constructors'
import { mapErr, mapResult } from '@hollowdark/utils/result/map'
import { isErr, isOk } from '@hollowdark/utils/result/predicates'
import type { Result } from '@hollowdark/utils/result/types'
import { unwrap, unwrapOr } from '@hollowdark/utils/result/unwrap'

describe('Result constructors and predicates', () => {
  test('ok wraps a value', () => {
    const r = ok(42)
    expect(r).toEqual({ ok: true, value: 42 })
    expect(isOk(r)).toBe(true)
    expect(isErr(r)).toBe(false)
  })

  test('err wraps an error', () => {
    const e = new Error('boom')
    const r = err(e)
    expect(r).toEqual({ ok: false, error: e })
    expect(isErr(r)).toBe(true)
    expect(isOk(r)).toBe(false)
  })
})

describe('mapResult / mapErr', () => {
  test('mapResult transforms the value of an ok', () => {
    const r: Result<number> = ok(3)
    expect(mapResult(r, (n) => n * 2)).toEqual(ok(6))
  })

  test('mapResult leaves an error untouched', () => {
    const e = new Error('x')
    const r: Result<number> = err(e)
    expect(mapResult(r, (n: number) => n * 2)).toEqual(err(e))
  })

  test('mapErr transforms the error of a failure', () => {
    const r: Result<number, string> = err('oops')
    expect(mapErr(r, (s: string) => s.length)).toEqual(err(4))
  })

  test('mapErr leaves an ok untouched', () => {
    const r: Result<number, string> = ok(5)
    expect(mapErr(r, (s: string) => s.length)).toEqual(ok(5))
  })
})

describe('unwrap / unwrapOr', () => {
  test('unwrap returns the value when ok', () => {
    expect(unwrap(ok('hello'))).toBe('hello')
  })

  test('unwrap throws when error', () => {
    expect(() => unwrap(err(new Error('bad')))).toThrow(/bad/)
  })

  test('unwrapOr returns value when ok', () => {
    expect(unwrapOr(ok(1), 0)).toBe(1)
  })

  test('unwrapOr returns fallback when error', () => {
    expect(unwrapOr(err<Error>(new Error('e')), 0)).toBe(0)
  })
})

describe('type-narrowing', () => {
  test('isOk narrows to Ok<T>', () => {
    const r: Result<number, string> = ok(10)
    if (isOk(r)) {
      const n: number = r.value
      expect(n).toBe(10)
    } else {
      expect.fail('isOk should narrow to ok branch')
    }
  })
})
