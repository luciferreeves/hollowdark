/** A non-empty readonly array; the type system guarantees index 0 exists. */
export type NonEmptyArray<T> = readonly [T, ...T[]]
