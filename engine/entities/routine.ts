import type { GameTime } from '@hollowdark/time/gameTime'
import type { PersonId, RoutineId } from './base'

export type RoutineCategory = 'work' | 'relationships' | 'self' | 'home' | 'play' | 'service'

/**
 * How a routine item modifies state each week. `targetSkill` and
 * `targetStatVariable` are mutually exclusive per effect — one effect
 * either grows a skill or nudges a state variable, not both.
 */
export interface RoutineEffect {
  readonly targetSkill: string | null
  readonly targetStatVariable: string | null
  readonly delta: number
}

export interface RoutineItem {
  readonly id: string
  readonly category: RoutineCategory
  readonly description: string
  readonly effects: readonly RoutineEffect[]
  readonly hoursPerWeek: number
  readonly startedAt: GameTime
  readonly endedAt: GameTime | null
}

/**
 * Persistent weekly commitments for a character. Routines run silently in
 * the flow stream — the player sets them once, they keep running until
 * changed (docs/05-time-system.md §"Routines and flow").
 */
export interface Routine {
  readonly id: RoutineId
  readonly personId: PersonId
  readonly items: readonly RoutineItem[]
  readonly lastModifiedAt: GameTime
}
