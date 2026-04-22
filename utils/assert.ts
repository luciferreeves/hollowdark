/**
 * assert — throw if a condition is false, narrow the type otherwise.
 * For programmer errors (invariants that should never fail); use
 * Result<T, E> for recoverable failures.
 */
export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? 'Assertion failed')
  }
}

/**
 * Mark a branch as unreachable in an exhaustive switch. If the compiler
 * ever allows this to be reached, `value` stops being `never` and the
 * call site fails to type-check.
 *
 * Usage:
 *   switch (kind) {
 *     case 'a': ...
 *     case 'b': ...
 *     default: assertNever(kind)
 *   }
 */
export function assertNever(value: never, message?: string): never {
  throw new Error(message ?? `Unhandled case: ${String(value)}`)
}

/**
 * Throw if a value is null or undefined; return the narrowed value.
 */
export function assertDefined<T>(value: T, message?: string): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message ?? 'Expected value to be defined')
  }
  return value as NonNullable<T>
}
