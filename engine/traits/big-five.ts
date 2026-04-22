/**
 * Big Five temperament profile, each 0–100. Mostly stable across a life
 * with slow drift under sustained conditions. See docs/04-traits.md §"Layer 1".
 */
export interface BigFiveProfile {
  readonly openness: number
  readonly conscientiousness: number
  readonly extraversion: number
  readonly agreeableness: number
  readonly neuroticism: number
}
