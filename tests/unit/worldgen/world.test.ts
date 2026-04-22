import { describe, expect, test } from 'vitest'

import type { WorldId } from '@hollowdark/engine/entities/base'
import { FIRST_EVER_YEAR, generateWorld } from '@hollowdark/worldgen/world'

const FIXED_ID = 'test-world-1111' as WorldId
const FIXED_SEED = 'test-seed-1111'
const FIXED_CREATED_AT = '2026-04-22T09:00:00.000Z'

describe('generateWorld', () => {
  test('lands at year 1111, Thawing 1', () => {
    const world = generateWorld({ id: FIXED_ID, seed: FIXED_SEED, createdAt: FIXED_CREATED_AT })
    expect(world.currentGameTime).toEqual({
      year: FIRST_EVER_YEAR,
      month: 1,
      day: 1,
      tickOfDay: 0
    })
  })

  test('starts with no characters, no events, no crisis', () => {
    const world = generateWorld({ id: FIXED_ID, seed: FIXED_SEED, createdAt: FIXED_CREATED_AT })
    expect(world.currentPlayerCharacterId).toBeNull()
    expect(world.playedCharacterIds).toEqual([])
    expect(world.tierOneIds).toEqual([])
    expect(world.tierTwoIds).toEqual([])
    expect(world.activeEventIds).toEqual([])
    expect(world.scheduledEvents).toEqual([])
    expect(world.crisisState.active).toBe(false)
    expect(world.politicsByRegion.size).toBe(0)
  })

  test('seeded generation is deterministic given fixed inputs', () => {
    const a = generateWorld({ id: FIXED_ID, seed: FIXED_SEED, createdAt: FIXED_CREATED_AT })
    const b = generateWorld({ id: FIXED_ID, seed: FIXED_SEED, createdAt: FIXED_CREATED_AT })
    expect(a).toEqual(b)
  })

  test('defaults the seed to the generated id when only id is provided', () => {
    const world = generateWorld({ id: FIXED_ID, createdAt: FIXED_CREATED_AT })
    expect(world.seed).toBe(FIXED_ID)
  })

  test('records the current schema version in settings', () => {
    const world = generateWorld({ id: FIXED_ID, seed: FIXED_SEED, createdAt: FIXED_CREATED_AT })
    expect(world.settings.schemaVersion).toBe(1)
  })
})
