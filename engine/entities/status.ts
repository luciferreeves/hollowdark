/**
 * Status descriptor surfaces derived labels for display prose. Socioeconomic
 * is drawn from the character's EconomicClass; professional and social come
 * out of career + reputation. Never shown as numbers to the player.
 */
export type SocioeconomicTier =
  | 'struggling'
  | 'working'
  | 'middle'
  | 'upper_middle'
  | 'wealthy'
  | 'old_money'

export interface StatusDescriptor {
  readonly socioeconomic: SocioeconomicTier
  readonly professional: string
  readonly social: string
}
