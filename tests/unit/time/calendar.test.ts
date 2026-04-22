import { describe, expect, test } from 'vitest'
import {
  DAYS_PER_YEAR,
  FESTIVAL_DAYS,
  FESTIVAL_MONTH,
  MONTH_NAMES,
  daysInMonth,
  isFestival,
  monthName,
  monthSeason
} from '@hollowdark/time/calendar'

describe('calendar constants', () => {
  test('year is 365 days', () => {
    expect(DAYS_PER_YEAR).toBe(365)
  })

  test('festival is 5 days', () => {
    expect(FESTIVAL_DAYS).toBe(5)
    expect(daysInMonth(FESTIVAL_MONTH)).toBe(5)
  })

  test('regular months are 30 days each', () => {
    for (let m = 1; m <= 12; m++) {
      expect(daysInMonth(m)).toBe(30)
    }
  })

  test('month count including festival is 13', () => {
    expect(MONTH_NAMES).toHaveLength(13)
  })
})

describe('monthName', () => {
  test('spring months', () => {
    expect(monthName(1)).toBe('Thawing')
    expect(monthName(2)).toBe('Greening')
    expect(monthName(3)).toBe('Blossomtide')
  })

  test('summer, autumn, winter months', () => {
    expect(monthName(4)).toBe('Highsun')
    expect(monthName(7)).toBe('Firstfall')
    expect(monthName(12)).toBe('Rimefrost')
  })

  test('festival is month 13', () => {
    expect(monthName(13)).toBe("Year's End Festival")
    expect(isFestival(13)).toBe(true)
    expect(isFestival(12)).toBe(false)
  })

  test('rejects out-of-range months', () => {
    expect(() => monthName(0)).toThrow()
    expect(() => monthName(14)).toThrow()
    expect(() => monthName(1.5)).toThrow()
  })
})

describe('monthSeason', () => {
  test('each season has three months', () => {
    const seasons = new Map<string, number>()
    for (let m = 1; m <= 13; m++) {
      const s = monthSeason(m)
      seasons.set(s, (seasons.get(s) ?? 0) + 1)
    }
    expect(seasons.get('spring')).toBe(3)
    expect(seasons.get('summer')).toBe(3)
    expect(seasons.get('autumn')).toBe(3)
    expect(seasons.get('winter')).toBe(3)
    expect(seasons.get('festival')).toBe(1)
  })

  test('specific month → season mappings', () => {
    expect(monthSeason(1)).toBe('spring')
    expect(monthSeason(4)).toBe('summer')
    expect(monthSeason(7)).toBe('autumn')
    expect(monthSeason(10)).toBe('winter')
    expect(monthSeason(13)).toBe('festival')
  })
})
