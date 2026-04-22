/**
 * Life satisfaction split into hedonic (day-to-day pleasure) and eudaimonic
 * (sense of meaning / purpose). They can diverge; eudaimonic matters more
 * for end-of-life peace. Each 0–1.
 */
export interface SatisfactionProfile {
  readonly hedonic: number
  readonly eudaimonic: number
}
