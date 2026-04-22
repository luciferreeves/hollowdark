/**
 * Tick granularity by life stage.
 *
 * One tick represents a different span of time depending on the character's
 * age — infancy advances in years because there isn't weekly texture worth
 * resolving, adulthood in weeks because that's the rhythm the design lives
 * at. See docs/05-time-system.md and ARCHITECTURE.md §5.
 */

export type LifeStage =
  | 'infancy'
  | 'early_childhood'
  | 'middle_childhood'
  | 'adolescence'
  | 'young_adult'
  | 'middle_adult'
  | 'late_adult'
  | 'elderly'

export type TickUnit = 'year' | 'season' | 'month' | 'week'

export const TICK_UNIT_BY_LIFE_STAGE: Readonly<Record<LifeStage, TickUnit>> = {
  infancy: 'year',
  early_childhood: 'season',
  middle_childhood: 'season',
  adolescence: 'month',
  young_adult: 'week',
  middle_adult: 'week',
  late_adult: 'week',
  elderly: 'month'
}

export function lifeStageForAge(ageYears: number): LifeStage {
  if (ageYears < 0) throw new Error(`Invalid age: ${ageYears}`)
  if (ageYears < 3) return 'infancy'
  if (ageYears < 7) return 'early_childhood'
  if (ageYears < 13) return 'middle_childhood'
  if (ageYears < 18) return 'adolescence'
  if (ageYears < 30) return 'young_adult'
  if (ageYears < 60) return 'middle_adult'
  if (ageYears < 76) return 'late_adult'
  return 'elderly'
}

export function tickUnitForAge(ageYears: number): TickUnit {
  return TICK_UNIT_BY_LIFE_STAGE[lifeStageForAge(ageYears)]
}
