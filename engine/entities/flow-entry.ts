import type { GameTime } from '@hollowdark/time/gameTime'
import type { FlowEntryId, PersonId, PlaceId, WorldEventId } from '@hollowdark/engine/entities/base'

/**
 * A compact snapshot of the context that produced a flow passage. Kept
 * alongside the entry so passages can be regenerated deterministically
 * if content or voice-modulation changes — no reliance on re-simulating
 * the full world to reproduce a specific week's prose.
 */
export interface FlowContextSnapshot {
  readonly season: string
  readonly placeId: PlaceId
  readonly activeWorldEventIds: readonly WorldEventId[]
  readonly moodBucket: string
  readonly dominantTraitMarkers: readonly string[]
}

export interface FlowEntry {
  readonly id: FlowEntryId
  readonly personId: PersonId
  readonly time: GameTime
  readonly passageText: string
  readonly passageRef: string
  readonly contextSnapshot: FlowContextSnapshot
}
