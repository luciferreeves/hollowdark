import type { WorldId } from '@hollowdark/engine/entities/base'
import type {
  CrisisState,
  MacroEconomicState,
  World,
  WorldSettings
} from '@hollowdark/engine/entities/world'
import { SCHEMA_VERSION } from '@hollowdark/persistence/schema'
import { makeGameTime } from '@hollowdark/time/gameTime'
import { APP_VERSION_FULL } from '@hollowdark/utils/version/version'

/**
 * The year the first-ever character in any Hollowdark save is born. Per
 * design, this number is never shown to the player again — subsequent
 * characters are born in whatever year the world has reached.
 */
export const FIRST_EVER_YEAR = 1111 as const

const DEFAULT_ECONOMY: MacroEconomicState = Object.freeze({
  inflationAnnual: 0.02,
  employmentRate: 0.94,
  marketIndex: 1.0,
  recessionDepth: 0
})

const DEFAULT_CRISIS: CrisisState = Object.freeze({
  active: false,
  crisisEventId: null,
  sceneIndex: 0,
  startedAt: null
})

export interface GenerateWorldInput {
  readonly id?: WorldId
  readonly seed?: string
  readonly createdAt?: string
}

/**
 * Produce a fresh `World` record sitting at the start of year 1111. No
 * characters, no scheduled events, no political state — the shape is a
 * clean slate that downstream generators (people, regions, institutions)
 * fill in before the simulation begins to tick.
 *
 * Entropy is injected here only: the default `seed` comes from
 * `crypto.randomUUID()`, the sole non-deterministic call in a world's
 * lifetime. Tests and imports can supply their own seed for replay.
 */
export function generateWorld(input: GenerateWorldInput = {}): World {
  const id = input.id ?? (crypto.randomUUID() as WorldId)
  const seed = input.seed ?? id
  const createdAt = input.createdAt ?? new Date().toISOString()

  const settings: WorldSettings = {
    contentVersionAtCreation: APP_VERSION_FULL,
    schemaVersion: SCHEMA_VERSION
  }

  return {
    id,
    seed,
    createdAt,
    currentGameTime: makeGameTime(FIRST_EVER_YEAR, 1, 1),
    currentPlayerCharacterId: null,
    playedCharacterIds: [],
    tierOneIds: [],
    tierTwoIds: [],
    economy: DEFAULT_ECONOMY,
    politicsByRegion: new Map(),
    activeEventIds: [],
    scheduledEvents: [],
    crisisState: DEFAULT_CRISIS,
    settings
  }
}
