/**
 * Dark Triad profile, each 0–100. Distribution is skewed low — most
 * characters sit in the 20–40 range; a small minority above 60 drives
 * specific life shapes (docs/04-traits.md §"Dark Triad characters in play").
 */
export interface DarkTriadProfile {
  readonly narcissism: number
  readonly machiavellianism: number
  readonly psychopathy: number
}
