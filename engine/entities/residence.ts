import type { GameTime } from '@hollowdark/time/gameTime'
import type { PlaceId } from '@hollowdark/engine/entities/base'

/** A span of time a character lived at a specific place. Open-ended if the
 *  character still lives there. */
export interface ResidenceEntry {
  readonly placeId: PlaceId
  readonly from: GameTime
  readonly to: GameTime | null
}
