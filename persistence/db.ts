import Dexie, { type Table } from 'dexie'

import type { EventLogEntry } from '@hollowdark/engine/entities/event-log-entry'
import type { FlowEntry } from '@hollowdark/engine/entities/flow-entry'
import type { Institution } from '@hollowdark/engine/entities/institution'
import type { Memoir } from '@hollowdark/engine/entities/memoir'
import type { Person } from '@hollowdark/engine/entities/person'
import type { Place } from '@hollowdark/engine/entities/place'
import type { Relationship } from '@hollowdark/engine/entities/relationship'
import type { Routine } from '@hollowdark/engine/entities/routine'
import type { ScheduledEvent } from '@hollowdark/engine/entities/scheduled-event'
import type { World } from '@hollowdark/engine/entities/world'
import type { WorldEvent } from '@hollowdark/engine/entities/world-event'
import type { JsonValue } from '@hollowdark/utils/types/json'

import {
  AUDIO_CACHE_DB_NAME,
  AUDIO_CACHE_SCHEMA_V1,
  CONTENT_CACHE_DB_NAME,
  CONTENT_CACHE_SCHEMA_V1,
  USER_DATA_DB_NAME,
  USER_DATA_SCHEMA_V1
} from '@hollowdark/persistence/schema'

/**
 * A single key/value pair on the Settings table. Keys are short slugs
 * (e.g., 'audio.masterMuted'); values serialise as JSON.
 */
export interface Setting {
  readonly key: string
  readonly value: JsonValue
}

/** Cached content chunk — the in-memory registry is rebuilt from these on
 *  every session start. */
export interface CachedContentChunk {
  readonly chunkId: string
  readonly version: string
  readonly hash: string
  readonly data: JsonValue
  readonly fetchedAt: string
}

/** Last-seen manifest, stored so the diff-download can decide what to
 *  re-fetch without a second round-trip. */
export interface CachedManifest {
  readonly id: 'latest'
  readonly contentVersion: string
  readonly appVersion: string
  readonly generatedAt: string
  readonly payload: JsonValue
}

/** Cached audio track; mirrors CachedContentChunk but binary-friendly. */
export interface CachedAudioTrack {
  readonly trackId: string
  readonly version: string
  readonly hash: string
  readonly data: Blob
  readonly fetchedAt: string
}

/**
 * User save data — the player's world(s). Persists forever on device,
 * untouched by content updates. Changes to this schema require a
 * migration in `persistence/migrations` (added later).
 */
export class HollowdarkUserData extends Dexie {
  worlds!: Table<World, string>
  people!: Table<Person, string>
  relationships!: Table<Relationship, string>
  institutions!: Table<Institution, string>
  places!: Table<Place, string>
  worldEvents!: Table<WorldEvent, string>
  eventLogs!: Table<EventLogEntry, string>
  memoirs!: Table<Memoir, string>
  routines!: Table<Routine, string>
  flowHistory!: Table<FlowEntry, string>
  scheduledEvents!: Table<ScheduledEvent, string>
  settings!: Table<Setting, string>

  constructor() {
    super(USER_DATA_DB_NAME)
    this.version(1).stores(USER_DATA_SCHEMA_V1)
  }
}

/**
 * Content cache — the compiled JSON chunks the client fetched from the
 * CDN. Independently versioned from user data; can be cleared without
 * touching saves.
 */
export class HollowdarkContentCache extends Dexie {
  content!: Table<CachedContentChunk, string>
  manifest!: Table<CachedManifest, string>

  constructor() {
    super(CONTENT_CACHE_DB_NAME)
    this.version(1).stores(CONTENT_CACHE_SCHEMA_V1)
  }
}

/** Audio cache — decoded later in the AudioEngine; stored as Blobs so the
 *  browser can serve them through `URL.createObjectURL` without re-fetch. */
export class HollowdarkAudioCache extends Dexie {
  audio!: Table<CachedAudioTrack, string>
  manifest!: Table<CachedManifest, string>

  constructor() {
    super(AUDIO_CACHE_DB_NAME)
    this.version(1).stores(AUDIO_CACHE_SCHEMA_V1)
  }
}
