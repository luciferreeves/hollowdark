/**
 * IndexedDB schema strings for each of the three Dexie databases.
 *
 * The schema is versioned deliberately — any change here requires a
 * migration in persistence/migrations.ts (added later). Snapshot tests
 * lock these strings so accidental drift shows up as a failing test
 * rather than a silent mismatch between code and on-device data.
 *
 * Index syntax recap:
 *   &field              primary key (unique)
 *   ++id                auto-incrementing primary key
 *   field               plain index on a scalar
 *   [a+b]               compound index
 *   *field              multi-entry index on an array field
 *
 * See ARCHITECTURE.md §24 for the user-data schema and §7 for the content
 * cache; technical/04-persistence.md for the two-database separation
 * (user data persists forever, content is replaceable per update).
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

export const CONTENT_CACHE_SCHEMA_V1 = Object.freeze({
  content: '&chunkId, version, fetchedAt',
  manifest: '&id'
})

export const AUDIO_CACHE_SCHEMA_V1 = Object.freeze({
  audio: '&trackId, version, fetchedAt',
  manifest: '&id'
})

export const SCHEMA_VERSION = 1 as const

export const USER_DATA_DB_NAME = 'HollowdarkUserData' as const
export const CONTENT_CACHE_DB_NAME = 'HollowdarkContentCache' as const
export const AUDIO_CACHE_DB_NAME = 'HollowdarkAudioCache' as const
