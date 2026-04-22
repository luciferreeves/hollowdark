import type { Result } from '@hollowdark/utils/result/types'

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

/** Extract the value or return a fallback. */
export function unwrapOr<T, E>(r: Result<T, E>, fallback: T): T {
  return r.ok ? r.value : fallback
}
