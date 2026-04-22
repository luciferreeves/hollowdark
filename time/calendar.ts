/**
 * Number of days in a regular month.
 *
 * Month order:
 *
 *   spring    1  Thawing       2  Greening       3  Blossomtide
 *   summer    4  Highsun       5  Amberhaze      6  Harvestmark
 *   autumn    7  Firstfall     8  Stormturn      9  Ashfall
 *   winter   10  Rainfall     11  Hollowdark    12  Rimefrost
 *   festival 13  Year's End Festival (5 days)
 *
 * The year begins with Thawing and closes with the festival, which sits
 * between Rimefrost and the next year's Thawing.
 */
export const DAYS_PER_MONTH = 30

/** Twelve named months — all except the festival. */
export const REGULAR_MONTH_COUNT = 12

/** Days in the Year's End Festival — the thirteenth "month". */
export const FESTIVAL_DAYS = 5

/** Month index for the festival. */
export const FESTIVAL_MONTH = 13

/** Total month slots in the calendar cycle (12 regular + festival). */
export const MONTHS_PER_YEAR = REGULAR_MONTH_COUNT + 1

/** Days in a year: 12 × 30 + 5 = 365. */
export const DAYS_PER_YEAR = REGULAR_MONTH_COUNT * DAYS_PER_MONTH + FESTIVAL_DAYS

/** Seven-day weeks. */
export const DAYS_PER_WEEK = 7

/** Month names in calendar order. Index 0 is Thawing; index 12 is the festival. */
export const MONTH_NAMES = [
  'Thawing',
  'Greening',
  'Blossomtide',
  'Highsun',
  'Amberhaze',
  'Harvestmark',
  'Firstfall',
  'Stormturn',
  'Ashfall',
  'Rainfall',
  'Hollowdark',
  'Rimefrost',
  "Year's End Festival"
] as const

/** The named-month type derived from `MONTH_NAMES`. */
export type MonthName = (typeof MONTH_NAMES)[number]

/** Four regular seasons plus a distinct `festival` tag for the year-end. */
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'festival'

const SEASON_BY_MONTH: readonly Season[] = [
  'spring',
  'spring',
  'spring',
  'summer',
  'summer',
  'summer',
  'autumn',
  'autumn',
  'autumn',
  'winter',
  'winter',
  'winter',
  'festival'
]

function validateMonth(monthIndex: number): void {
  if (!Number.isInteger(monthIndex) || monthIndex < 1 || monthIndex > MONTHS_PER_YEAR) {
    throw new Error(`Invalid month index: ${monthIndex}`)
  }
}

/**
 * Return the named month for a 1-based month index. Throws on invalid input.
 * @param monthIndex 1 (Thawing) through 13 (Year's End Festival).
 */
export function monthName(monthIndex: number): MonthName {
  validateMonth(monthIndex)
  return MONTH_NAMES[monthIndex - 1] as MonthName
}

/**
 * Return the season label for a 1-based month index. The festival has its
 * own tag ('festival') rather than reusing one of the four seasons.
 */
export function monthSeason(monthIndex: number): Season {
  validateMonth(monthIndex)
  return SEASON_BY_MONTH[monthIndex - 1] as Season
}

/**
 * Days in the given month. 30 for regular months, 5 for the festival.
 */
export function daysInMonth(monthIndex: number): number {
  validateMonth(monthIndex)
  return monthIndex === FESTIVAL_MONTH ? FESTIVAL_DAYS : DAYS_PER_MONTH
}

/** True when the supplied month index is the festival slot. */
export function isFestival(monthIndex: number): boolean {
  return monthIndex === FESTIVAL_MONTH
}
