/**
 * Life satisfaction split into hedonic (day-to-day pleasure) and eudaimonic
 * (sense of meaning / purpose). They can diverge, and eudaimonic matters
 * more for end-of-life peace (docs/13-spirituality.md §"Life satisfaction
 * is distinct from happiness"). Each 0–1.
 */
export interface SatisfactionProfile {
  readonly hedonic: number
  readonly eudaimonic: number
}
