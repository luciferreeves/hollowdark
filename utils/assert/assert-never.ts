/**
 * Mark a branch as unreachable in an exhaustive switch. If the compiler
 * ever allows this line to be reached, `value` stops being `never` and
 * the call site fails to type-check — making exhaustive checks load-bearing
 * at compile time.
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
