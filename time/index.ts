export {
  DAYS_PER_MONTH,
  DAYS_PER_WEEK,
  DAYS_PER_YEAR,
  FESTIVAL_DAYS,
  FESTIVAL_MONTH,
  MONTHS_PER_YEAR,
  MONTH_NAMES,
  REGULAR_MONTH_COUNT,
  daysInMonth,
  isFestival,
  monthName,
  monthSeason,
  type MonthName,
  type Season
} from 'time/calendar'

export {
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
  weeksBetween,
  type GameTime
} from 'time/gameTime'

export {
  TICK_UNIT_BY_LIFE_STAGE,
  lifeStageForAge,
  tickUnitForAge,
  type LifeStage,
  type TickUnit
} from 'time/granularity'

export { SPEEDS, type Speed } from 'time/speed'
