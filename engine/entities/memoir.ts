import type { GameTime } from '@hollowdark/time/gameTime'
import type { EventLogEntryId, MemoirId, PersonId } from '@hollowdark/engine/entities/base'

export interface MemoirChapter {
  readonly order: number
  readonly title: string
  readonly prose: string
  readonly startAge: number
  readonly endAge: number
  readonly keyEventIds: readonly EventLogEntryId[]
  readonly themeEmphasis: readonly string[]
}

/**
 * A character's generated life story. Produced at death, 15,000–30,000
 * words across 8–15 chapters. Persists forever in the world's archive;
 * descendants may find it on the Memoirs shelf or see it referenced in
 * their own flow.
 */
export interface Memoir {
  readonly id: MemoirId
  readonly personId: PersonId
  readonly generatedAt: GameTime
  readonly chapters: readonly MemoirChapter[]
  readonly totalWordCount: number
  readonly themes: readonly string[]
  readonly publicVersion: boolean
  readonly publishedAt: GameTime | null
}
