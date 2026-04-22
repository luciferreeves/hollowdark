import type { GameTime } from '@hollowdark/time'
import type { PersonId, ScheduledEventId } from './base'

/**
 * A future event trigger, either at a fixed time or when conditions hold.
 * Taking a bribe at 30 might schedule a `bribery_audit` at +15 years with
 * elevated weight (ARCHITECTURE.md §6 §"Scheduled events").
 */
export interface ConditionalTrigger {
  readonly kind: 'conditional'
  readonly condition: string
  readonly earliestTime: GameTime | null
  readonly latestTime: GameTime | null
}

export interface ScheduledEvent {
  readonly id: ScheduledEventId
  readonly eventTypeId: string
  readonly scheduledFor: GameTime | ConditionalTrigger
  readonly targetPersonId: PersonId
  readonly context: Readonly<Record<string, unknown>>
  readonly eligibilityRecheck: boolean
  readonly priority: number
}
