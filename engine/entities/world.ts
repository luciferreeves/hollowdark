import type { GameTime } from '@hollowdark/time/gameTime'
import type { PersonId, PlaceId, WorldEventId, WorldId } from './base'
import type { ScheduledEvent } from './scheduled-event'

/**
 * Macro economic state tracked at the world scale. Individual characters'
 * economics are derived against this background (docs/09-economy.md
 * §"Macro economy").
 */
export interface MacroEconomicState {
  readonly inflationAnnual: number
  readonly employmentRate: number
  readonly marketIndex: number
  readonly recessionDepth: number
}

export interface RegionPoliticalState {
  readonly stability: number
  readonly currentRegime: string
  readonly tensions: readonly string[]
}

export interface WorldSettings {
  readonly contentVersionAtCreation: string
  readonly schemaVersion: number
}

export interface CrisisState {
  readonly active: boolean
  readonly crisisEventId: string | null
  readonly sceneIndex: number
  readonly startedAt: GameTime | null
}

/**
 * The world container. One continuous world per player (ARCHITECTURE.md §16,
 * docs/16-world-continuity.md). Time in this world never resets once
 * created; successive player characters advance it forward.
 */
export interface World {
  readonly id: WorldId
  readonly seed: string
  readonly createdAt: string // ISO timestamp, real-world clock — not a GameTime

  readonly currentGameTime: GameTime

  readonly currentPlayerCharacterId: PersonId | null
  readonly playedCharacterIds: readonly PersonId[]

  readonly tierOneIds: readonly PersonId[]
  readonly tierTwoIds: readonly PersonId[]

  readonly economy: MacroEconomicState
  readonly politicsByRegion: ReadonlyMap<PlaceId, RegionPoliticalState>

  readonly activeEventIds: readonly WorldEventId[]
  readonly scheduledEvents: readonly ScheduledEvent[]

  readonly crisisState: CrisisState

  readonly settings: WorldSettings
}
