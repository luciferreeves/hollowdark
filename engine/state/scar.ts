import type { GameTime } from 'time'

/**
 * A lasting mark left by a high-weight event. Scars don't decay the way
 * mood or stress do — they persist and colour future trait drift,
 * relationship patterns, and event eligibility.
 */
export interface Scar {
  readonly id: string
  readonly kind: string
  readonly occurredAt: GameTime
  readonly severity: number
  readonly summary: string
}
