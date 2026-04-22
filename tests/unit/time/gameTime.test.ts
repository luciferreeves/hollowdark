import { describe, expect, test } from 'vitest'
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  compareGameTime,
  dayOfWeek,
  dayOfYear,
  daysBetween,
  formatGameTime,
  isAfter,
  isBefore,
  isSameDay,
  makeGameTime,
  toAbsoluteDays,
  weeksBetween
} from '@hollowdark/time/gameTime'

describe('makeGameTime validation', () => {
  test('valid regular-month time', () => {
    const t = makeGameTime(1111, 1, 14)
    expect(t).toEqual({ year: 1111, month: 1, day: 14, tickOfDay: 0 })
  })

  test('valid festival time (day 5 is the max)', () => {
    expect(makeGameTime(1111, 13, 5).day).toBe(5)
  })

  test('allows negative years (pre-1111 historical events)', () => {
    expect(() => makeGameTime(-100, 5, 15)).not.toThrow()
  })

  test('rejects day 31 of a regular month', () => {
    expect(() => makeGameTime(1111, 1, 31)).toThrow()
  })

  test('rejects day 6 of the festival', () => {
    expect(() => makeGameTime(1111, 13, 6)).toThrow()
  })

  test('rejects day 0 and month 0', () => {
    expect(() => makeGameTime(1111, 1, 0)).toThrow()
    expect(() => makeGameTime(1111, 0, 1)).toThrow()
  })

  test('rejects month 14', () => {
    expect(() => makeGameTime(1111, 14, 1)).toThrow()
  })

  test('rejects non-integer year/month/day', () => {
    expect(() => makeGameTime(1111.5, 1, 1)).toThrow()
    expect(() => makeGameTime(1111, 1.5, 1)).toThrow()
    expect(() => makeGameTime(1111, 1, 1.5)).toThrow()
  })

  test('rejects negative tickOfDay', () => {
    expect(() => makeGameTime(1111, 1, 1, -1)).toThrow()
  })
})

describe('dayOfYear', () => {
  test('Thawing 1 is day 1', () => {
    expect(dayOfYear(makeGameTime(1111, 1, 1))).toBe(1)
  })

  test('Rimefrost 30 is day 360', () => {
    expect(dayOfYear(makeGameTime(1111, 12, 30))).toBe(360)
  })

  test('Festival 1 is day 361, Festival 5 is day 365', () => {
    expect(dayOfYear(makeGameTime(1111, 13, 1))).toBe(361)
    expect(dayOfYear(makeGameTime(1111, 13, 5))).toBe(365)
  })
})

describe('addDays', () => {
  test('within a month', () => {
    expect(addDays(makeGameTime(1111, 1, 5), 10)).toMatchObject({
      year: 1111,
      month: 1,
      day: 15
    })
  })

  test('crosses month boundary', () => {
    expect(addDays(makeGameTime(1111, 1, 28), 5)).toMatchObject({
      year: 1111,
      month: 2,
      day: 3
    })
  })

  test('Rimefrost 30 + 1 day = Festival 1', () => {
    expect(addDays(makeGameTime(1111, 12, 30), 1)).toMatchObject({
      year: 1111,
      month: 13,
      day: 1
    })
  })

  test('Festival 5 + 1 day = Thawing 1 next year', () => {
    expect(addDays(makeGameTime(1111, 13, 5), 1)).toMatchObject({
      year: 1112,
      month: 1,
      day: 1
    })
  })

  test('+365 days from any date = same date next year', () => {
    const start = makeGameTime(1111, 5, 15)
    const end = addDays(start, 365)
    expect(end).toMatchObject({ year: 1112, month: 5, day: 15 })
  })

  test('negative days moves backward and crosses year boundary', () => {
    expect(addDays(makeGameTime(1112, 1, 1), -1)).toMatchObject({
      year: 1111,
      month: 13,
      day: 5
    })
  })

  test('preserves tickOfDay', () => {
    const t = makeGameTime(1111, 1, 1, 3)
    expect(addDays(t, 10).tickOfDay).toBe(3)
  })

  test('rejects non-integer day count', () => {
    expect(() => addDays(makeGameTime(1111, 1, 1), 1.5)).toThrow()
  })
})

describe('addWeeks', () => {
  test('one week advances 7 days', () => {
    expect(addWeeks(makeGameTime(1111, 1, 1), 1)).toMatchObject({ day: 8 })
  })

  test('52 weeks lands in the festival, not at next year', () => {
    expect(addWeeks(makeGameTime(1111, 1, 1), 52)).toMatchObject({
      year: 1111,
      month: 13,
      day: 5
    })
  })

  test('negative weeks moves backward', () => {
    expect(addWeeks(makeGameTime(1111, 2, 1), -1)).toMatchObject({
      year: 1111,
      month: 1,
      day: 24
    })
  })
})

describe('addMonths', () => {
  test('same day, later month', () => {
    expect(addMonths(makeGameTime(1111, 4, 15), 7)).toMatchObject({
      year: 1111,
      month: 11,
      day: 15
    })
  })

  test('day clamps when crossing into festival (only 5 days)', () => {
    expect(addMonths(makeGameTime(1111, 12, 15), 1)).toMatchObject({
      year: 1111,
      month: 13,
      day: 5
    })
  })

  test('overflow into next year wraps through the 13-month cycle', () => {
    expect(addMonths(makeGameTime(1111, 12, 15), 2)).toMatchObject({
      year: 1112,
      month: 1,
      day: 15
    })
  })

  test('13 months advances exactly one year', () => {
    expect(addMonths(makeGameTime(1111, 5, 10), 13)).toMatchObject({
      year: 1112,
      month: 5,
      day: 10
    })
  })

  test('negative months moves backward', () => {
    expect(addMonths(makeGameTime(1112, 1, 1), -1)).toMatchObject({
      year: 1111,
      month: 13,
      day: 1
    })
  })
})

describe('addYears', () => {
  test('preserves month and day', () => {
    expect(addYears(makeGameTime(1111, 5, 15), 10)).toMatchObject({
      year: 1121,
      month: 5,
      day: 15
    })
  })
})

describe('daysBetween / weeksBetween', () => {
  test('zero on same time', () => {
    const t = makeGameTime(1111, 1, 1)
    expect(daysBetween(t, t)).toBe(0)
  })

  test('positive when to is later', () => {
    expect(daysBetween(makeGameTime(1111, 1, 1), makeGameTime(1111, 1, 11))).toBe(10)
  })

  test('negative when to is earlier', () => {
    expect(daysBetween(makeGameTime(1111, 1, 11), makeGameTime(1111, 1, 1))).toBe(-10)
  })

  test('a full year is 365 days', () => {
    expect(daysBetween(makeGameTime(1111, 1, 1), makeGameTime(1112, 1, 1))).toBe(365)
  })

  test('weeksBetween floors toward zero of a week count', () => {
    expect(weeksBetween(makeGameTime(1111, 1, 1), makeGameTime(1111, 1, 8))).toBe(1)
    expect(weeksBetween(makeGameTime(1111, 1, 1), makeGameTime(1111, 1, 7))).toBe(0)
  })
})

describe('compareGameTime / isBefore / isAfter / isSameDay', () => {
  const a = makeGameTime(1111, 1, 1)
  const b = makeGameTime(1111, 1, 2)

  test('ordering matches calendar', () => {
    expect(isBefore(a, b)).toBe(true)
    expect(isAfter(b, a)).toBe(true)
    expect(isBefore(a, a)).toBe(false)
  })

  test('isSameDay', () => {
    expect(isSameDay(a, a)).toBe(true)
    expect(isSameDay(a, b)).toBe(false)
  })

  test('tickOfDay breaks ties when the calendar day is equal', () => {
    const morning = makeGameTime(1111, 1, 1, 0)
    const evening = makeGameTime(1111, 1, 1, 5)
    expect(compareGameTime(morning, evening)).toBeLessThan(0)
    expect(isSameDay(morning, evening)).toBe(true)
  })
})

describe('dayOfWeek', () => {
  test('advances by 1 each day, wrapping at 7', () => {
    const start = makeGameTime(1111, 5, 1)
    const d0 = dayOfWeek(start)
    expect(dayOfWeek(addDays(start, 7))).toBe(d0)
    expect(dayOfWeek(addDays(start, 14))).toBe(d0)
    expect(dayOfWeek(addDays(start, 1))).toBe((d0 + 1) % 7)
  })

  test('every day of the week is hit within 7 consecutive days', () => {
    const seen = new Set<number>()
    const start = makeGameTime(1111, 5, 1)
    for (let i = 0; i < 7; i++) {
      seen.add(dayOfWeek(addDays(start, i)))
    }
    expect(seen.size).toBe(7)
  })
})

describe('formatGameTime', () => {
  test('renders "<day> <MonthName>, <year>"', () => {
    expect(formatGameTime(makeGameTime(1111, 1, 14))).toBe('14 Thawing, 1111')
    expect(formatGameTime(makeGameTime(1145, 10, 2))).toBe('2 Rainfall, 1145')
    expect(formatGameTime(makeGameTime(1111, 13, 3))).toBe("3 Year's End Festival, 1111")
  })
})

describe('toAbsoluteDays round-trip', () => {
  test('monotonic with addDays', () => {
    const start = makeGameTime(1111, 1, 1)
    for (let i = 0; i < 1000; i++) {
      const next = addDays(start, i)
      expect(toAbsoluteDays(next) - toAbsoluteDays(start)).toBe(i)
    }
  })
})
