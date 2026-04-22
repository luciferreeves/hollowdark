/**
 * Gender identity and sexual orientation. Continuous axes plus a discrete
 * gender tag. See docs/04-traits.md §"Layer 2" and docs/10-sexuality.md.
 *
 *   sexualAttraction   0 = hetero-exclusive, 100 = homo-exclusive
 *   romanticAttraction independent continuous axis
 *   sexualityAwareness 0 = pre-discovery, 1 = fully integrated self-knowledge
 */
export type Gender = 'male' | 'female' | 'nonbinary' | 'trans-male' | 'trans-female'

export interface SexualOrientation {
  readonly sexualAttraction: number
  readonly romanticAttraction: number
  readonly gender: Gender
  readonly sexualityAwareness: number
}
