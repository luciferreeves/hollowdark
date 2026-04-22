/**
 * Result<T, E> — a recoverable-error return type for functions that can
 * fail without throwing. Used at system boundaries (save/load, content
 * validation, manifest fetch) where the caller needs to decide whether a
 * failure is fatal. Internal pure logic uses plain returns and throws
 * Error for programmer errors (rules/01-code-style.md).
 */

export type Ok<T> = { readonly ok: true; readonly value: T }
export type Err<E> = { readonly ok: false; readonly error: E }
export type Result<T, E = Error> = Ok<T> | Err<E>

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}

export function isOk<T, E>(r: Result<T, E>): r is Ok<T> {
  return r.ok
}

export function isErr<T, E>(r: Result<T, E>): r is Err<E> {
  return !r.ok
}

/** Map the value of an ok result; pass errors through unchanged. */
export function mapResult<T, U, E>(r: Result<T, E>, f: (value: T) => U): Result<U, E> {
  return r.ok ? ok(f(r.value)) : r
}

/** Map the error of a failed result; pass values through unchanged. */
export function mapErr<T, E, F>(r: Result<T, E>, f: (error: E) => F): Result<T, F> {
  return r.ok ? r : err(f(r.error))
}

/**
 * Extract the value from an ok result; throw on error. Reserve for tests
 * and assertion contexts — in production code prefer branching on isOk.
 */
export function unwrap<T, E>(r: Result<T, E>): T {
  if (!r.ok) {
    throw new Error(`unwrap() called on error result: ${String(r.error)}`)
  }
  return r.value
}

/** Extract the value or return a default. */
export function unwrapOr<T, E>(r: Result<T, E>, fallback: T): T {
  return r.ok ? r.value : fallback
}
