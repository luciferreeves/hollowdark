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
