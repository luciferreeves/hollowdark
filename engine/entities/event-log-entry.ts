import type { GameTime } from 'time'
import type { EventLogEntryId, PersonId } from './base'

/**
 * Consequences logged against a specific event resolution. The shape is
 * kept deliberately open — events may mutate a wide range of state — and
 * the consequence writer (events/consequence.ts, later) fills it in.
 */
export interface AppliedConsequence {
  readonly targetPath: string
  readonly operation: 'set' | 'add' | 'multiply' | 'append'
  readonly value: unknown
}

/**
 * One event's entry in a character's event log. Entry IDs are stable so
 * memoir generation and History views can reference specific moments.
 * Passage text lives in the content registry, keyed by renderedPassageRef,
 * so logs stay small.
 */
export interface EventLogEntry {
  readonly id: EventLogEntryId
  readonly personId: PersonId
  readonly time: GameTime
  readonly eventTypeId: string
  readonly participants: readonly PersonId[]
  readonly emotionalWeight: number
  readonly themes: readonly string[]
  readonly consequences: readonly AppliedConsequence[]
  readonly renderedPassageRef: string
  readonly playerChoice: string | null
  readonly memorableMarker: boolean
}
