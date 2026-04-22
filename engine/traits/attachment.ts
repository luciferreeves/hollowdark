/**
 * Attachment is tracked as a distribution, not a single tag. Fractions sum
 * to 1.0; a character is rarely purely one style. Set by age 3 based on
 * caregiver behaviour, mostly fixed thereafter.
 */
export interface AttachmentDistribution {
  readonly secure: number
  readonly anxious: number
  readonly avoidant: number
  readonly disorganized: number
}
