import {
  DAYS_PER_MONTH,
  DAYS_PER_WEEK,
  DAYS_PER_YEAR,
  FESTIVAL_DAYS,
  FESTIVAL_MONTH,
  MONTHS_PER_YEAR,
  REGULAR_MONTH_COUNT,
  daysInMonth,
  monthName
} from '@hollowdark/time/calendar'

/**
 * A position in game time. Immutable — all arithmetic returns a new value.
 *
 *   year       integer (negative allowed for pre-epoch historical events)
 *   month      1..12 for regular months, 13 for year-end festival
 *   day        1..30 for regular months, 1..5 for festival
 *   tickOfDay  0 outside crisis mode; crisis mode subdivides the day
 */
export interface GameTime {
  readonly year: number
  readonly month: number
  readonly day: number
  readonly tickOfDay: number
}

export function makeGameTime(
  year: number,
  month: number,
  day: number,
  tickOfDay = 0
): GameTime {
  if (!Number.isInteger(year)) throw new Error(`Invalid year: ${year}`)
  if (!Number.isInteger(month) || month < 1 || month > MONTHS_PER_YEAR) {
    throw new Error(`Invalid month: ${month}`)
  }
  const dim = daysInMonth(month)
  if (!Number.isInteger(day) || day < 1 || day > dim) {
    throw new Error(`Invalid day ${day} for month ${month} (allowed 1..${dim})`)
  }
  if (!Number.isInteger(tickOfDay) || tickOfDay < 0) {
    throw new Error(`Invalid tickOfDay: ${tickOfDay}`)
  }
  return { year, month, day, tickOfDay }
}

/**
 * Day of year (1-based). Thawing 1 = 1, Rimefrost 30 = 360, Festival 5 = 365.
 */
export function dayOfYear(time: GameTime): number {
  if (time.month === FESTIVAL_MONTH) {
    return REGULAR_MONTH_COUNT * DAYS_PER_MONTH + time.day
  }
  return (time.month - 1) * DAYS_PER_MONTH + time.day
}

function absoluteDays(time: GameTime): number {
  return time.year * DAYS_PER_YEAR + dayOfYear(time) - 1
}

function fromAbsoluteDays(abs: number, tickOfDay: number): GameTime {
  if (!Number.isFinite(abs)) {
    throw new Error(`Non-finite absolute day count: ${abs}`)
  }
  const year = Math.floor(abs / DAYS_PER_YEAR)
  const rem = abs - year * DAYS_PER_YEAR
  const doy = rem + 1
  const festivalStart = REGULAR_MONTH_COUNT * DAYS_PER_MONTH + 1
  let month: number
  let day: number
  if (doy >= festivalStart) {
    month = FESTIVAL_MONTH
    day = doy - festivalStart + 1
  } else {
    month = Math.floor((doy - 1) / DAYS_PER_MONTH) + 1
    day = ((doy - 1) % DAYS_PER_MONTH) + 1
  }
  return { year, month, day, tickOfDay }
}

export function addDays(time: GameTime, days: number): GameTime {
  if (!Number.isInteger(days)) {
    throw new Error(`addDays requires an integer (got ${days})`)
  }
  return fromAbsoluteDays(absoluteDays(time) + days, time.tickOfDay)
}

export function addWeeks(time: GameTime, weeks: number): GameTime {
  if (!Number.isInteger(weeks)) {
    throw new Error(`addWeeks requires an integer (got ${weeks})`)
  }
  return addDays(time, weeks * DAYS_PER_WEEK)
}

/**
 * Advance by whole months through the 13-month cycle. Day is clamped to
 * the target month's length — landing on a festival day from a month with
 * day > 5 produces festival day 5.
 */
export function addMonths(time: GameTime, months: number): GameTime {
  if (!Number.isInteger(months)) {
    throw new Error(`addMonths requires an integer (got ${months})`)
  }
  const totalCycles = (time.month - 1) + months
  const yearDelta = Math.floor(totalCycles / MONTHS_PER_YEAR)
  const monthIndex = ((totalCycles % MONTHS_PER_YEAR) + MONTHS_PER_YEAR) % MONTHS_PER_YEAR
  const month = monthIndex + 1
  const dim = daysInMonth(month)
  const day = Math.min(time.day, dim)
  return { year: time.year + yearDelta, month, day, tickOfDay: time.tickOfDay }
}

export function addYears(time: GameTime, years: number): GameTime {
  if (!Number.isInteger(years)) {
    throw new Error(`addYears requires an integer (got ${years})`)
  }
  return { ...time, year: time.year + years }
}

export function daysBetween(from: GameTime, to: GameTime): number {
  return absoluteDays(to) - absoluteDays(from)
}

export function weeksBetween(from: GameTime, to: GameTime): number {
  return Math.floor(daysBetween(from, to) / DAYS_PER_WEEK)
}

export function compareGameTime(a: GameTime, b: GameTime): number {
  const diff = absoluteDays(a) - absoluteDays(b)
  if (diff !== 0) return diff
  return a.tickOfDay - b.tickOfDay
}

export function isBefore(a: GameTime, b: GameTime): boolean {
  return compareGameTime(a, b) < 0
}

export function isAfter(a: GameTime, b: GameTime): boolean {
  return compareGameTime(a, b) > 0
}

export function isSameDay(a: GameTime, b: GameTime): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day
}

/**
 * Day of week as an integer 0..6. Stable: same GameTime always maps to the
 * same index. Anchor: year 0, Thawing 1 (the calendar's epoch) is index 0.
 */
export function dayOfWeek(time: GameTime): number {
  const abs = absoluteDays(time)
  return ((abs % DAYS_PER_WEEK) + DAYS_PER_WEEK) % DAYS_PER_WEEK
}

/**
 * Human-facing label for a GameTime. Does not attempt to express tickOfDay.
 */
export function formatGameTime(time: GameTime): string {
  return `${time.day} ${monthName(time.month)}, ${time.year}`
}

/**
 * Exported so consumers can re-key: e.g., Set<AbsoluteDay> for dedup.
 */
export function toAbsoluteDays(time: GameTime): number {
  return absoluteDays(time)
}

export {
  DAYS_PER_MONTH,
  DAYS_PER_WEEK,
  DAYS_PER_YEAR,
  FESTIVAL_DAYS,
  FESTIVAL_MONTH,
  MONTHS_PER_YEAR,
  REGULAR_MONTH_COUNT
}
