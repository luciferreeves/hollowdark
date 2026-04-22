/**
 * Values orientation. Each axis is 0–100 where 0 anchors the left-named
 * pole and 100 the right (e.g., `tradition_vs_novelty`: 0 = deeply
 * traditional, 100 = novelty-seeking).
 */
export interface ValuesOrientation {
  readonly tradition_vs_novelty: number
  readonly selfDirection_vs_conformity: number
  readonly hedonism_vs_duty: number
  readonly universalism_vs_ingroup: number
  readonly power_vs_egalitarian: number
}
