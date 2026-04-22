import type { JsonValue } from '@hollowdark/utils/types/json'

/**
 * A single entry in the content manifest — one compiled chunk served
 * from static hosting. `url` is relative to the app base path.
 */
export interface ManifestEntry {
  readonly version: string
  readonly hash: string
  readonly url: string
  readonly size_bytes: number
}

/**
 * The content manifest — an index of every compiled content chunk the
 * client might need. Fetched once at session start; diffed against the
 * cached copy to decide which chunks must be re-downloaded.
 */
export interface ContentManifest {
  readonly content_version: string
  readonly app_version: string
  readonly generated_at: string
  readonly chunks: Readonly<Record<string, ManifestEntry>>
}

/** Chunk ids are stable, slash-separated, human-readable. */
export type ChunkId = string

/** A raw chunk payload as received from the network. */
export interface ChunkPayload {
  readonly chunkId: ChunkId
  readonly data: JsonValue
  readonly version: string
  readonly hash: string
}
