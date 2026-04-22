/**
 * IndexedDB schema for the user-data database. The string values follow
 * Dexie's index notation:
 *
 *   &field              primary key (unique)
 *   ++id                auto-incrementing primary key
 *   field               plain index on a scalar
 *   [a+b]               compound index
 *   *field              multi-entry index on an array field
 *
 * Frozen at module load so a runtime typo on the wrong key throws rather
 * than silently mutating the schema object. Snapshot tests lock these
 * strings; any change here requires a migration.
 */
export const USER_DATA_SCHEMA_V1 = Object.freeze({
  worlds: '&id, seed, currentPlayerCharacterId',
  people:
    '&id, tier, isPlayerCharacter, lastSimulatedAt, currentPlaceId, [currentPlaceId+tier], *relationshipIds',
  relationships:
    '&id, personAId, personBId, type, currentState, lastInteractionAt, [personAId+personBId], [type+currentState]',
  institutions: '&id, placeId, type',
  places: '&id, parentPlaceId, type',
  worldEvents: '&id, category, startedAt, endedAt',
  eventLogs: '&id, personId, time, [personId+time]',
  memoirs: '&id, personId, generatedAt',
  routines: '&id, personId',
  flowHistory: '&id, personId, time, [personId+time]',
  scheduledEvents: '&id, targetPersonId, priority',
  settings: '&key'
})

/** IndexedDB schema for the content cache — replaceable per content update. */
export const CONTENT_CACHE_SCHEMA_V1 = Object.freeze({
  content: '&chunkId, version, fetchedAt',
  manifest: '&id'
})

/** IndexedDB schema for the audio cache — blobs + a manifest row. */
export const AUDIO_CACHE_SCHEMA_V1 = Object.freeze({
  audio: '&trackId, version, fetchedAt',
  manifest: '&id'
})

/** Current persistence schema version. Bump when any schema above changes. */
export const SCHEMA_VERSION = 1 as const

export const USER_DATA_DB_NAME = 'HollowdarkUserData' as const
export const CONTENT_CACHE_DB_NAME = 'HollowdarkContentCache' as const
export const AUDIO_CACHE_DB_NAME = 'HollowdarkAudioCache' as const
