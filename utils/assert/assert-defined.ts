/** Throw if a value is null or undefined; return the narrowed value. */
export function assertDefined<T>(value: T, message?: string): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message ?? 'Expected value to be defined')
  }
  return value as NonNullable<T>
}
