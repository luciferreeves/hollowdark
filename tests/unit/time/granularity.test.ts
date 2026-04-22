import { describe, expect, test } from 'vitest'
import { TICK_UNIT_BY_LIFE_STAGE, lifeStageForAge, tickUnitForAge } from 'time/granularity'

describe('lifeStageForAge', () => {
  test('stage boundaries', () => {
    expect(lifeStageForAge(0)).toBe('infancy')
    expect(lifeStageForAge(2)).toBe('infancy')
    expect(lifeStageForAge(3)).toBe('early_childhood')
    expect(lifeStageForAge(6)).toBe('early_childhood')
    expect(lifeStageForAge(7)).toBe('middle_childhood')
    expect(lifeStageForAge(12)).toBe('middle_childhood')
    expect(lifeStageForAge(13)).toBe('adolescence')
    expect(lifeStageForAge(17)).toBe('adolescence')
    expect(lifeStageForAge(18)).toBe('young_adult')
    expect(lifeStageForAge(29)).toBe('young_adult')
    expect(lifeStageForAge(30)).toBe('middle_adult')
    expect(lifeStageForAge(59)).toBe('middle_adult')
    expect(lifeStageForAge(60)).toBe('late_adult')
    expect(lifeStageForAge(75)).toBe('late_adult')
    expect(lifeStageForAge(76)).toBe('elderly')
    expect(lifeStageForAge(100)).toBe('elderly')
  })

  test('rejects negative age', () => {
    expect(() => lifeStageForAge(-1)).toThrow()
  })
})

describe('tickUnitForAge', () => {
  test('infancy = year', () => {
    expect(tickUnitForAge(1)).toBe('year')
  })

  test('childhood = season', () => {
    expect(tickUnitForAge(5)).toBe('season')
    expect(tickUnitForAge(10)).toBe('season')
  })

  test('adolescence = month', () => {
    expect(tickUnitForAge(15)).toBe('month')
  })

  test('adult life = week', () => {
    expect(tickUnitForAge(25)).toBe('week')
    expect(tickUnitForAge(45)).toBe('week')
    expect(tickUnitForAge(70)).toBe('week')
  })

  test('elderly = month', () => {
    expect(tickUnitForAge(80)).toBe('month')
  })
})

describe('TICK_UNIT_BY_LIFE_STAGE has every stage', () => {
  test('every life stage has a tick unit', () => {
    const stages = [
      'infancy',
      'early_childhood',
      'middle_childhood',
      'adolescence',
      'young_adult',
      'middle_adult',
      'late_adult',
      'elderly'
    ] as const
    for (const s of stages) {
      expect(TICK_UNIT_BY_LIFE_STAGE[s]).toBeDefined()
    }
  })
})
