/**
 * Throw if a condition is false, narrow the type to truthy otherwise.
 * For programmer errors (invariants that should never fail); use
 * Result<T, E> for recoverable failures.
 */
export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message ?? 'Assertion failed')
  }
}
