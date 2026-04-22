import type { GameTime } from '@hollowdark/time'

export type EatingPattern = 'poor' | 'irregular' | 'moderate' | 'good' | 'athletic'

/** Alcohol, smoking, drugs, activity level — the background variables that
 *  compound into long-term health outcomes. */
export interface LifestyleProfile {
  readonly alcohol: number
  readonly smoking: number
  readonly drugs: number
  readonly activity: number
  readonly diet: number
  readonly compositeRisk: number
}

export interface SexualHealthState {
  readonly activeInfections: readonly string[]
  readonly pastInfections: readonly string[]
  readonly contraceptionInUse: string | null
  readonly fertility: number
}

/** A symptom visible to the character (or to those around them). */
export interface Symptom {
  readonly id: string
  readonly kind: string
  readonly severity: number
  readonly onsetAt: GameTime
  readonly isChronic: boolean
}

/** A condition the character knows about and has a name for. */
export interface Condition {
  readonly id: string
  readonly kind: string
  readonly diagnosedAt: GameTime | null
  readonly severity: number
  readonly isTerminal: boolean
  readonly mortalityMultiplier: number
  readonly managementInPlace: boolean
}

/**
 * A condition the simulation tracks but the character doesn't yet know about.
 * Surface paths include worsening symptoms, doctor visits, routine screens,
 * or incidental discovery (docs/08-mental-health.md §"Suicide risk" for the
 * comparable mental-health pattern; this covers physical equivalents).
 */
export interface UndiagnosedCondition {
  readonly id: string
  readonly kind: string
  readonly onsetAt: GameTime
  readonly visibleSymptomIds: readonly string[]
  readonly severity: number
  readonly discoveryTriggers: readonly string[]
}

/** A past medical event kept in the character's file. */
export interface MedicalEvent {
  readonly id: string
  readonly kind: string
  readonly occurredAt: GameTime
  readonly summary: string
}

export interface HealthState {
  readonly overallQuality: number
  readonly fitness: number
  readonly sleepQuality: number
  readonly eatingPattern: EatingPattern
  readonly energyBaseline: number
  readonly lifestyle: LifestyleProfile
  readonly sexualHealth: SexualHealthState
  readonly currentSymptoms: readonly Symptom[]
  readonly undiagnosed: readonly UndiagnosedCondition[]
  readonly medicalHistory: readonly MedicalEvent[]
}
