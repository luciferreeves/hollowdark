import { describe, expect, test } from 'vitest'
import {
  AUDIO_CACHE_DB_NAME,
  AUDIO_CACHE_SCHEMA_V1,
  CONTENT_CACHE_DB_NAME,
  CONTENT_CACHE_SCHEMA_V1,
  SCHEMA_VERSION,
  USER_DATA_DB_NAME,
  USER_DATA_SCHEMA_V1
} from '@hollowdark/persistence'

/**
 * The Dexie schema is a versioned contract with on-device storage. Any
 * change to these strings requires a migration in persistence/migrations
 * (added later). These snapshots lock the v1 shape so drift fails loudly
 * rather than silently breaking existing saves.
 */
describe('persistence schema v1 — locked shapes', () => {
  test('schema version is 1', () => {
    expect(SCHEMA_VERSION).toBe(1)
  })

  test('database names', () => {
    expect(USER_DATA_DB_NAME).toBe('HollowdarkUserData')
    expect(CONTENT_CACHE_DB_NAME).toBe('HollowdarkContentCache')
    expect(AUDIO_CACHE_DB_NAME).toBe('HollowdarkAudioCache')
  })

  test('user-data schema v1 snapshot', () => {
    expect(USER_DATA_SCHEMA_V1).toMatchInlineSnapshot(`
      {
        "eventLogs": "&id, personId, time, [personId+time]",
        "flowHistory": "&id, personId, time, [personId+time]",
        "institutions": "&id, placeId, type",
        "memoirs": "&id, personId, generatedAt",
        "people": "&id, tier, isPlayerCharacter, lastSimulatedAt, currentPlaceId, [currentPlaceId+tier], *relationshipIds",
        "places": "&id, parentPlaceId, type",
        "relationships": "&id, personAId, personBId, type, currentState, lastInteractionAt, [personAId+personBId], [type+currentState]",
        "routines": "&id, personId",
        "scheduledEvents": "&id, targetPersonId, priority",
        "settings": "&key",
        "worldEvents": "&id, category, startedAt, endedAt",
        "worlds": "&id, seed, currentPlayerCharacterId",
      }
    `)
  })

  test('content-cache schema v1 snapshot', () => {
    expect(CONTENT_CACHE_SCHEMA_V1).toMatchInlineSnapshot(`
      {
        "content": "&chunkId, version, fetchedAt",
        "manifest": "&id",
      }
    `)
  })

  test('audio-cache schema v1 snapshot', () => {
    expect(AUDIO_CACHE_SCHEMA_V1).toMatchInlineSnapshot(`
      {
        "audio": "&trackId, version, fetchedAt",
        "manifest": "&id",
      }
    `)
  })

  test('schema objects are frozen so a typo at call-time throws', () => {
    expect(Object.isFrozen(USER_DATA_SCHEMA_V1)).toBe(true)
    expect(Object.isFrozen(CONTENT_CACHE_SCHEMA_V1)).toBe(true)
    expect(Object.isFrozen(AUDIO_CACHE_SCHEMA_V1)).toBe(true)
  })
})
