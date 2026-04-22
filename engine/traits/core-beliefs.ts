/**
 * Core beliefs shape how adult events are interpreted (docs/04-traits.md
 * §"Layer 2"). Each 0–100. Formed in early childhood, harder to shift after.
 */
export interface CoreBeliefs {
  readonly selfWorth: number
  readonly worldSafety: number
  readonly othersTrustworthy: number
  readonly agency: number
}
