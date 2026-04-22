import { err, ok } from './constructors'
import type { Result } from './types'

/** Map the value of an ok result; pass errors through unchanged. */
export function mapResult<T, U, E>(r: Result<T, E>, f: (value: T) => U): Result<U, E> {
  return r.ok ? ok(f(r.value)) : r
}

/** Map the error of a failed result; pass values through unchanged. */
export function mapErr<T, E, F>(r: Result<T, E>, f: (error: E) => F): Result<T, F> {
  return r.ok ? r : err(f(r.error))
}
