import type { GameTime } from 'time'

/**
 * Current-week emotional state on the valence × arousal plane.
 *   valence   -1 (negative) to +1 (positive)
 *   arousal   -1 (calm) to +1 (activated)
 * See docs/08-mental-health.md §"Separate variables".
 */
export interface MoodState {
  readonly valence: number
  readonly arousal: number
  readonly lastUpdated: GameTime
}
