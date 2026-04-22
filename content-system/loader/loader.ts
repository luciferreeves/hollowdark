import type { ContentManifest, ChunkPayload } from '@hollowdark/content-system/manifest/schema'
import { HollowdarkContentCache } from '@hollowdark/persistence/db'
import type { JsonValue } from '@hollowdark/utils/types/json'

let cacheInstance: HollowdarkContentCache | null = null

function cache(): HollowdarkContentCache {
  if (cacheInstance === null) {
    cacheInstance = new HollowdarkContentCache()
  }
  return cacheInstance
}

const MANIFEST_CACHE_KEY = 'latest'

/**
 * Fetch the content manifest from static hosting. Falls back to the last
 * cached manifest when the network request fails — the game works fully
 * offline once the first download has succeeded.
 */
export async function fetchManifest(baseUrl: string): Promise<ContentManifest> {
  const url = `${baseUrl}/content-manifest.json`
  try {
    const response = await fetch(url, { cache: 'no-cache' })
    if (!response.ok) throw new Error(`manifest ${response.status}`)
    const live = (await response.json()) as ContentManifest
    await cache().manifest.put({
      id: MANIFEST_CACHE_KEY,
      contentVersion: live.content_version,
      appVersion: live.app_version,
      generatedAt: live.generated_at,
      payload: live as unknown as JsonValue
    })
    return live
  } catch {
    const cached = await cache().manifest.get(MANIFEST_CACHE_KEY)
    if (cached === undefined) {
      throw new Error('Content manifest unavailable and no cached copy exists.')
    }
    return cached.payload as unknown as ContentManifest
  }
}

/**
 * Load a single chunk by id, using the manifest to resolve the hashed
 * URL. Served from the IndexedDB cache whenever the cached hash matches
 * the manifest's; refetched otherwise. Falls back to the cached payload
 * on network failure so gameplay continues offline.
 */
export async function loadChunk(
  chunkId: string,
  manifest: ContentManifest,
  baseUrl: string
): Promise<ChunkPayload> {
  const entry = manifest.chunks[chunkId]
  if (entry === undefined) {
    throw new Error(`Content chunk not listed in manifest: ${chunkId}`)
  }

  const cached = await cache().content.get(chunkId)
  if (cached !== undefined && cached.hash === entry.hash) {
    return { chunkId, data: cached.data, version: cached.version, hash: cached.hash }
  }

  try {
    const response = await fetch(`${baseUrl}${entry.url}`)
    if (!response.ok) throw new Error(`chunk ${response.status}`)
    const data = (await response.json()) as JsonValue
    await cache().content.put({
      chunkId,
      version: entry.version,
      hash: entry.hash,
      data,
      fetchedAt: new Date().toISOString()
    })
    return { chunkId, data, version: entry.version, hash: entry.hash }
  } catch (err) {
    if (cached !== undefined) {
      return { chunkId, data: cached.data, version: cached.version, hash: cached.hash }
    }
    throw err
  }
}
