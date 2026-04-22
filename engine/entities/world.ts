import type { GameTime } from '@hollowdark/time/gameTime'
import type { PersonId, PlaceId, WorldEventId, WorldId } from '@hollowdark/engine/entities/base'
import type { ScheduledEvent } from '@hollowdark/engine/entities/scheduled-event'

/**
 * Macro economic state tracked at the world scale — inflation, employment,
 * market index, recession depth. Individual characters' economics derive
 * against this background.
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
 * The world container. One continuous world per player. Time in this world
 * never resets once created; successive player characters advance it forward.
 * `createdAt` is a real-world ISO timestamp, not a `GameTime`.
 */
export interface World {
  readonly id: WorldId
  readonly seed: string
  readonly createdAt: string

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
