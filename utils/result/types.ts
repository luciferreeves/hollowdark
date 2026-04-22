/** A successful result carrying a value. */
export type Ok<T> = { readonly ok: true; readonly value: T }

/** A failed result carrying an error. */
export type Err<E> = { readonly ok: false; readonly error: E }

/**
 * Result<T, E> — a recoverable-error return type for functions that can
 * fail without throwing. Used at system boundaries (save/load, content
 * validation, manifest fetch) where the caller needs to decide whether a
 * failure is fatal. Internal pure logic uses plain returns and throws
 * Error for programmer errors (rules/01-code-style.md).
 */
export type Result<T, E = Error> = Ok<T> | Err<E>
