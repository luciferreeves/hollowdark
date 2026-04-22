import type { GameTime } from '@hollowdark/time/gameTime'

/**
 * Current-week emotional state on the valence × arousal plane.
 *   valence   -1 (negative) to +1 (positive)
 *   arousal   -1 (calm) to +1 (activated)
 */
export interface MoodState {
  readonly valence: number
  readonly arousal: number
  readonly lastUpdated: GameTime
}
