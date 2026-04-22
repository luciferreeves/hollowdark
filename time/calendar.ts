/**
 * The Hollowdark calendar: 12 months × 30 days + a 5-day year-end festival,
 * 365 days per year, 7-day weeks.
 *
 * Month order (per docs/01-world.md and style-bible/00-style-bible.md):
 *
 *   spring    1  Thawing       2  Greening       3  Blossomtide
 *   summer    4  Highsun       5  Amberhaze      6  Harvestmark
 *   autumn    7  Firstfall     8  Stormturn      9  Ashfall
 *   winter   10  Rainfall     11  Hollowdark    12  Rimefrost
 *   festival 13  Year's End Festival (5 days)
 *
 * The year begins with Thawing (spring) and closes with the festival,
 * which sits between Rimefrost and the next year's Thawing. This matches
 * the style bible's cold-half / warm-half grouping and the "year-end
 * festival" phrasing in world lore.
 */

export const DAYS_PER_MONTH = 30
export const REGULAR_MONTH_COUNT = 12
export const FESTIVAL_DAYS = 5
export const FESTIVAL_MONTH = 13
export const MONTHS_PER_YEAR = REGULAR_MONTH_COUNT + 1 // 12 regular + festival
export const DAYS_PER_YEAR = REGULAR_MONTH_COUNT * DAYS_PER_MONTH + FESTIVAL_DAYS // 365
export const DAYS_PER_WEEK = 7

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

export type MonthName = (typeof MONTH_NAMES)[number]

export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'festival'

const SEASON_BY_MONTH: readonly Season[] = [
  'spring', // Thawing
  'spring', // Greening
  'spring', // Blossomtide
  'summer', // Highsun
  'summer', // Amberhaze
  'summer', // Harvestmark
  'autumn', // Firstfall
  'autumn', // Stormturn
  'autumn', // Ashfall
  'winter', // Rainfall
  'winter', // Hollowdark
  'winter', // Rimefrost
  'festival'
]

function validateMonth(monthIndex: number): void {
  if (!Number.isInteger(monthIndex) || monthIndex < 1 || monthIndex > MONTHS_PER_YEAR) {
    throw new Error(`Invalid month index: ${monthIndex}`)
  }
}

export function monthName(monthIndex: number): MonthName {
  validateMonth(monthIndex)
  return MONTH_NAMES[monthIndex - 1] as MonthName
}

export function monthSeason(monthIndex: number): Season {
  validateMonth(monthIndex)
  return SEASON_BY_MONTH[monthIndex - 1] as Season
}

export function daysInMonth(monthIndex: number): number {
  validateMonth(monthIndex)
  return monthIndex === FESTIVAL_MONTH ? FESTIVAL_DAYS : DAYS_PER_MONTH
}

export function isFestival(monthIndex: number): boolean {
  return monthIndex === FESTIVAL_MONTH
}
