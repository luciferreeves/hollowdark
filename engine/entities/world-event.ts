import type { GameTime } from '@hollowdark/time/gameTime'
import type { BaseEntity, PersonId, PlaceId, WorldEventId } from '@hollowdark/engine/entities/base'

export type EventCategory =
  | 'pandemic'
  | 'war'
  | 'economic'
  | 'political'
  | 'natural_disaster'
  | 'cultural'
  | 'scientific'
  | 'religious'
  | 'social_movement'
  | 'crime'
  | 'notable_individual'

export type SeverityLevel = 'mild' | 'moderate' | 'severe' | 'catastrophic'

/**
 * A named macro event decorating the timeline — a pandemic, war, cultural
 * shift, economic crash. Character-level impact is applied per-person via
 * templates referenced by contentRef; this entity is the world-scale record.
 */
export interface WorldEvent extends BaseEntity<WorldEventId, 'world_event'> {
  readonly contentRef: string
  readonly nameFormal: string
  readonly nameColloquial: string
  readonly category: EventCategory

  readonly startedAt: GameTime
  readonly endedAt: GameTime | null

  readonly affectedRegions: ReadonlyMap<PlaceId, SeverityLevel>

  readonly description: string

  /** IDs of people who have had this event's per-person impact applied. */
  readonly impactsApplied: readonly PersonId[]
}
