/** A non-empty readonly array; the type system guarantees index 0 exists. */
export type NonEmptyArray<T> = readonly [T, ...T[]]

/** Values that round-trip through JSON.stringify / JSON.parse. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue | undefined }

/** Element type of a readonly array (e.g., `ElementOf<typeof MONTH_NAMES>`). */
export type ElementOf<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never

/** Deep-readonly version of a structural type. */
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends Set<infer U>
      ? ReadonlySet<DeepReadonly<U>>
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T

/**
 * Nominal / branded type: compile-time-only tag to distinguish otherwise
 * structurally-equal types.
 *
 *   type PersonId = Brand<string, 'PersonId'>
 *   type RelId = Brand<string, 'RelationshipId'>
 *
 * PersonId and RelId are still strings at runtime but aren't assignable
 * to each other without an explicit cast.
 */
export type Brand<T, B extends string> = T & { readonly __brand: B }
