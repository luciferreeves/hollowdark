import type { GameTime } from '@hollowdark/time/gameTime'
import type { BaseEntity, PersonId, RelationshipId } from './base'

export type RelationType =
  | 'family_parent'
  | 'family_child'
  | 'family_sibling'
  | 'family_cousin'
  | 'family_grandparent'
  | 'family_grandchild'
  | 'family_inlaw'
  | 'romantic_dating'
  | 'romantic_married'
  | 'romantic_divorced'
  | 'romantic_ex'
  | 'romantic_affair'
  | 'friend_close'
  | 'friend_casual'
  | 'friend_drifted'
  | 'professional_colleague'
  | 'professional_boss'
  | 'professional_report'
  | 'professional_client'
  | 'professional_mentor'
  | 'professional_mentee'
  | 'acquaintance'
  | 'stranger_known'
  | 'enemy'

export type RelationshipState = 'warm' | 'neutral' | 'strained' | 'ruptured' | 'dormant'

/**
 * The four axes of intimacy (docs/07-relationships.md §"Relationship state
 * vector"). Each 0–1. Tracked separately because a marriage can be high
 * on practical and low on emotional — that's a specific life texture, not
 * a compatibility score.
 */
export interface IntimacyAxes {
  readonly emotional: number
  readonly intellectual: number
  readonly physical: number
  readonly practical: number
}

export interface TrustEvent {
  readonly at: GameTime
  readonly delta: number
  readonly eventRef: string
}

export interface ConflictEvent {
  readonly at: GameTime
  readonly topic: string
  readonly intensity: number
  readonly resolved: boolean
  readonly residue: number
}

export interface SharedExperience {
  readonly at: GameTime
  readonly kind: string
  readonly emotionalWeight: number
  readonly summary: string
}

export interface Tension {
  readonly id: string
  readonly topic: string
  readonly since: GameTime
  readonly intensity: number
}

/** The five love languages, matched per side — what each person gives vs.
 *  what they need from the other. Misalignment is a real relationship shape. */
export interface LoveLanguageProfile {
  readonly wordsOfAffirmation: number
  readonly actsOfService: number
  readonly receivingGifts: number
  readonly qualityTime: number
  readonly physicalTouch: number
}

export interface LoveLanguageMatrix {
  readonly aGives: LoveLanguageProfile
  readonly aNeeds: LoveLanguageProfile
  readonly bGives: LoveLanguageProfile
  readonly bNeeds: LoveLanguageProfile
}

/**
 * Asymmetric perception: A and B each have their own mental model of the
 * relationship. Large asymmetries fire scenes (confession, rebuff, shocked
 * realisation). See docs/07-relationships.md §"Asymmetric perception".
 */
export interface RelationshipPerception {
  readonly perceivedType: RelationType
  readonly perceivedIntimacy: IntimacyAxes
  readonly perceivedTrust: number
  readonly lastUpdated: GameTime
}

export type RomanticPhase =
  | 'attraction'
  | 'infatuation'
  | 'deepening'
  | 'committed'
  | 'power_struggle'
  | 'stability'
  | 'mature_love'
  | 'decline'
  | 'rupture'

export interface SexualActivityState {
  readonly frequencyPerMonth: number
  readonly mutualSatisfaction: number
  readonly openness: number
}

export interface InfidelityEvent {
  readonly at: GameTime
  readonly withPersonId: PersonId | null
  readonly kind: 'emotional' | 'physical' | 'both'
  readonly discoveredAt: GameTime | null
}

export type FamilyRelation =
  | 'parent'
  | 'child'
  | 'sibling'
  | 'cousin'
  | 'grandparent'
  | 'grandchild'
  | 'inlaw'

export type WorkRelation = 'colleague' | 'boss' | 'report' | 'client' | 'mentor' | 'mentee'

export interface Relationship extends BaseEntity<RelationshipId, 'relationship'> {
  readonly personAId: PersonId
  readonly personBId: PersonId

  readonly type: RelationType
  readonly typeHistory: readonly { readonly type: RelationType; readonly from: GameTime }[]

  readonly startedAt: GameTime

  readonly intimacy: IntimacyAxes
  readonly trust: number
  readonly trustHistory: readonly TrustEvent[]
  readonly powerBalance: number

  readonly conflicts: readonly ConflictEvent[]
  readonly sharedExperiences: readonly SharedExperience[]
  readonly unresolvedTensions: readonly Tension[]

  readonly loveLanguages: LoveLanguageMatrix

  readonly currentState: RelationshipState

  readonly aPerception: RelationshipPerception
  readonly bPerception: RelationshipPerception

  readonly lastInteractionAt: GameTime
  readonly interactionFrequency: number

  // Romantic-only details; null when the relationship isn't romantic.
  readonly romanticPhase: RomanticPhase | null
  readonly sexualActivity: SexualActivityState | null
  readonly infidelityHistory: readonly InfidelityEvent[]
  readonly commitmentLevel: number

  // Family-only.
  readonly familyRelationType: FamilyRelation | null

  // Professional-only.
  readonly workRelationType: WorkRelation | null
}
