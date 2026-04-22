/**
 * Dark Triad profile. Each axis is 0–100. Distribution in the simulation
 * skews low — most characters sit in the 20–40 range; a small minority
 * above 60 drives specific life shapes.
 */
export interface DarkTriadProfile {
  readonly narcissism: number
  readonly machiavellianism: number
  readonly psychopathy: number
}
