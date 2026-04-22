import type { GameTime } from 'time'
import type { CareerState } from '../career'
import type { EconomicState } from '../economics'
import type { HealthState, MentalHealthState, Condition } from '../health'
import type { Dependency, MoodState, SatisfactionProfile, Scar } from '../state'
import type {
  AttachmentDistribution,
  BigFiveProfile,
  CoreBeliefs,
  DarkTriadProfile,
  SexualOrientation,
  ValuesOrientation
} from '../traits'
import type { BaseEntity, PersonId, PlaceId, RelationshipId } from './base'
import type { EventLogEntry } from './event-log-entry'
import type { PersonName } from './person-name'
import type { ReputationProfile } from './reputation'
import type { ResidenceEntry } from './residence'
import type { StatusDescriptor } from './status'

/** Modes of death per docs/20-death-textures.md. */
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
 * draws on (docs/17-first-hour.md §"Birth moment").
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
 * NPC simulation fidelity tier. 1 = full weekly simulation (~10-30 entities),
 * 2 = quarterly compressed, 3 = generated on demand from seed.
 * See docs/06-autonomy.md §"Tiered simulation fidelity".
 */
export type SimulationTier = 1 | 2 | 3

/**
 * Person — the main simulated entity. Players and NPCs share this shape.
 * Fields are grouped by trait layer (docs/04-traits.md):
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

  // Layer 1 — temperament
  readonly bigFive: BigFiveProfile
  readonly darkTriad: DarkTriadProfile

  // Layer 2 — developmental
  readonly attachment: AttachmentDistribution
  readonly coreBeliefs: CoreBeliefs
  readonly conscienceCapacity: number
  readonly values: ValuesOrientation
  readonly orientation: SexualOrientation

  // Layer 3 — fluctuating state
  readonly mood: MoodState
  readonly stress: number
  readonly energy: number
  readonly traumaLoad: number
  readonly satisfaction: SatisfactionProfile

  // Layer 4 — acquired
  readonly skills: ReadonlyMap<string, number>
  readonly knowledge: ReadonlyMap<string, number>
  readonly habits: readonly string[]
  readonly dependencies: readonly Dependency[]
  readonly scars: readonly Scar[]

  // Layer 5 — social
  readonly reputation: ReputationProfile
  readonly status: StatusDescriptor
  readonly networkCapital: number

  // Health
  readonly health: HealthState
  readonly chronicConditions: readonly Condition[]
  readonly mentalHealthState: MentalHealthState

  // Economic / career
  readonly economic: EconomicState
  readonly career: CareerState

  // Relationships + location
  readonly relationshipIds: readonly RelationshipId[]
  readonly currentPlaceId: PlaceId
  readonly residenceHistory: readonly ResidenceEntry[]

  // Simulation metadata
  readonly tier: SimulationTier
  readonly lastSimulatedAt: GameTime

  // Event history
  readonly eventLog: readonly EventLogEntry[]
  readonly memorableMoments: readonly string[]

  // Player-character flags
  readonly isPlayerCharacter: boolean
  readonly playerCharacterStartedAt: GameTime | null
  readonly playerCharacterEndedAt: GameTime | null

  // Family (denormalised for fast access; the authoritative source is the
  // Relationship entities keyed family_parent / family_child / family_spouse)
  readonly parentIds: readonly [PersonId | null, PersonId | null]
  readonly childIds: readonly PersonId[]
  readonly spouseIds: readonly PersonId[]
}
