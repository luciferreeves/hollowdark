import type { GameTime } from 'time'
import type { EventLogEntryId, MemoirId, PersonId } from './base'

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
 * Generated at character death. 15,000–30,000 words, 8–15 chapters. Persists
 * forever in the world's archive; descendants may find it on the Memoirs
 * shelf or referenced in flow (docs/14-memoirs.md, ARCHITECTURE.md §17).
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
