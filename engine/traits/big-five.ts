/**
 * Big Five temperament profile. Each axis is 0–100, mostly stable across
 * a life with slow drift under sustained conditions.
 */
export interface BigFiveProfile {
  readonly openness: number
  readonly conscientiousness: number
  readonly extraversion: number
  readonly agreeableness: number
  readonly neuroticism: number
}
