import type { GameTime } from '@hollowdark/time/gameTime'
import type { CareerState } from '@hollowdark/engine/career/career'
import type { EconomicState } from '@hollowdark/engine/economics/economic'
import type { Condition, HealthState } from '@hollowdark/engine/health/health'
import type { MentalHealthState } from '@hollowdark/engine/health/mental-health'
import type { Dependency } from '@hollowdark/engine/state/dependency'
import type { MoodState } from '@hollowdark/engine/state/mood'
import type { SatisfactionProfile } from '@hollowdark/engine/state/satisfaction'
import type { Scar } from '@hollowdark/engine/state/scar'
import type { AttachmentDistribution } from '@hollowdark/engine/traits/attachment'
import type { BigFiveProfile } from '@hollowdark/engine/traits/big-five'
import type { CoreBeliefs } from '@hollowdark/engine/traits/core-beliefs'
import type { DarkTriadProfile } from '@hollowdark/engine/traits/dark-triad'
import type { SexualOrientation } from '@hollowdark/engine/traits/orientation'
import type { ValuesOrientation } from '@hollowdark/engine/traits/values'
import type { BaseEntity, PersonId, PlaceId, RelationshipId } from '@hollowdark/engine/entities/base'
import type { EventLogEntry } from '@hollowdark/engine/entities/event-log-entry'
import type { PersonName } from '@hollowdark/engine/entities/person-name'
import type { ReputationProfile } from '@hollowdark/engine/entities/reputation'
import type { ResidenceEntry } from '@hollowdark/engine/entities/residence'
import type { StatusDescriptor } from '@hollowdark/engine/entities/status'

/** The ten modes of death the simulation can resolve. */
export type DeathMode =
  | 'expected_old_age'
  | 'sudden_accident'
  | 'terminal_illness'
  | 'suicide'
  | 'violent_death'
  | 'during_sleep'
  | 'childbirth'
  | 'war'
  | 'child_or_infant'

/**
 * The defining demographic facts of a birth, captured in prose-ready form.
 * The familyContext string is the one-paragraph summary the opening scene
 * draws on.
 */
export interface BirthRecord {
  readonly date: GameTime
  readonly placeId: PlaceId
  readonly familyContext: string
}

export interface DeathRecord {
  readonly date: GameTime
  readonly mode: DeathMode
  readonly placeId: PlaceId
  readonly sceneSummary: string
}

/**
 * NPC simulation fidelity tier. 1 = full weekly simulation (~10–30
 * close-orbit entities), 2 = quarterly compressed (dormant relatives,
 * drifted friends), 3 = generated on demand from seed (everyone else).
 */
export type SimulationTier = 1 | 2 | 3

/**
 * Person — the main simulated entity. Players and NPCs share this shape.
 * Fields are grouped by trait layer:
 *
 *   Layer 1  temperament (Big Five + Dark Triad) — mostly stable
 *   Layer 2  developmental (attachment, core beliefs, values, orientation)
 *   Layer 3  state (mood, stress, energy, trauma load, satisfaction)
 *   Layer 4  acquired (skills, knowledge, habits, dependencies, scars)
 *   Layer 5  social (reputation, status, network capital)
 *
 * Numeric fields stay hidden from the player; everything surfaces as prose.
 */
export interface Person extends BaseEntity<PersonId, 'person'> {
  readonly name: PersonName

  readonly birth: BirthRecord
  readonly death: DeathRecord | null

  readonly bigFive: BigFiveProfile
  readonly darkTriad: DarkTriadProfile

  readonly attachment: AttachmentDistribution
  readonly coreBeliefs: CoreBeliefs
  readonly conscienceCapacity: number
  readonly values: ValuesOrientation
  readonly orientation: SexualOrientation

  readonly mood: MoodState
  readonly stress: number
  readonly energy: number
  readonly traumaLoad: number
  readonly satisfaction: SatisfactionProfile

  readonly skills: ReadonlyMap<string, number>
  readonly knowledge: ReadonlyMap<string, number>
  readonly habits: readonly string[]
  readonly dependencies: readonly Dependency[]
  readonly scars: readonly Scar[]

  readonly reputation: ReputationProfile
  readonly status: StatusDescriptor
  readonly networkCapital: number

  readonly health: HealthState
  readonly chronicConditions: readonly Condition[]
  readonly mentalHealthState: MentalHealthState

  readonly economic: EconomicState
  readonly career: CareerState

  readonly relationshipIds: readonly RelationshipId[]
  readonly currentPlaceId: PlaceId
  readonly residenceHistory: readonly ResidenceEntry[]

  readonly tier: SimulationTier
  readonly lastSimulatedAt: GameTime

  readonly eventLog: readonly EventLogEntry[]
  readonly memorableMoments: readonly string[]

  readonly isPlayerCharacter: boolean
  readonly playerCharacterStartedAt: GameTime | null
  readonly playerCharacterEndedAt: GameTime | null

  readonly parentIds: readonly [PersonId | null, PersonId | null]
  readonly childIds: readonly PersonId[]
  readonly spouseIds: readonly PersonId[]
}
