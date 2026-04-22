import type { GameTime } from '@hollowdark/time'
import type { Brand } from '@hollowdark/utils'

/**
 * Branded IDs — string at runtime, distinct at compile time so a PersonId
 * can't silently flow into a slot that expects a RelationshipId.
 * (utils/types/brand.ts)
 */
export type PersonId = Brand<string, 'PersonId'>
export type RelationshipId = Brand<string, 'RelationshipId'>
export type PlaceId = Brand<string, 'PlaceId'>
export type InstitutionId = Brand<string, 'InstitutionId'>
export type WorldEventId = Brand<string, 'WorldEventId'>
export type WorldId = Brand<string, 'WorldId'>
export type EventLogEntryId = Brand<string, 'EventLogEntryId'>
export type RoutineId = Brand<string, 'RoutineId'>
export type ScheduledEventId = Brand<string, 'ScheduledEventId'>
export type FlowEntryId = Brand<string, 'FlowEntryId'>
export type MemoirId = Brand<string, 'MemoirId'>

/** Every simulation entity wears one of these kind tags. */
export type EntityKind = 'person' | 'relationship' | 'institution' | 'place' | 'world_event'

/**
 * The common shape every entity carries. Concrete entities extend this with
 * their specific id/kind pair — `Person extends BaseEntity<PersonId, 'person'>`.
 * `deterministicSeed` powers lazy Tier 3 regeneration: given the seed, the
 * entity's trajectory is fully reproducible without persisted state.
 * (ARCHITECTURE.md §26)
 */
export interface BaseEntity<Id extends string = string, K extends EntityKind = EntityKind> {
  readonly id: Id
  readonly kind: K
  readonly createdAt: GameTime
  readonly destroyedAt: GameTime | null
  readonly deterministicSeed: number
}
