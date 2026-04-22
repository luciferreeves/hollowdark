import type { GameTime } from '@hollowdark/time'

/** Currently-active mental-health condition. Specific disorder vocabulary
 *  lives in content; the runtime state is shape + kind tag. */
export interface MentalCondition {
  readonly id: string
  readonly kind: string
  readonly onsetAt: GameTime
  readonly severity: number
  readonly inTreatment: boolean
}

/** A condition the character has had and no longer meets active criteria for,
 *  but which still informs relapse probability and event eligibility. */
export interface HistoricalCondition {
  readonly id: string
  readonly kind: string
  readonly startedAt: GameTime
  readonly endedAt: GameTime
  readonly peakSeverity: number
  readonly inRemission: boolean
}

export interface TraumaPattern {
  readonly id: string
  readonly source: string
  readonly firstOnsetAt: GameTime
  readonly hypervigilance: number
  readonly avoidance: number
  readonly intrusions: number
}

export interface CopingStrategy {
  readonly id: string
  readonly kind: string
  readonly adaptive: boolean
  readonly reliance: number
}

export interface Medication {
  readonly id: string
  readonly name: string
  readonly startedAt: GameTime
  readonly endedAt: GameTime | null
  readonly dosage: number
  readonly effectiveness: number
}

/**
 * Hidden even from the character until crisis. The simulation knows; the
 * prose surfaces behaviour, not numbers (docs/08-mental-health.md §"Suicide").
 */
export interface SuicidalRisk {
  readonly current: number
  readonly history: readonly { readonly at: GameTime; readonly value: number }[]
  readonly lastAssessedAt: GameTime
}

export interface MentalHealthState {
  readonly activeConditions: readonly MentalCondition[]
  readonly historyOfConditions: readonly HistoricalCondition[]
  readonly traumaPatterns: readonly TraumaPattern[]
  readonly copingStrategies: readonly CopingStrategy[]
  readonly inTherapy: boolean
  readonly medication: readonly Medication[]
  readonly suicidalRisk: SuicidalRisk
}
