/**
 * The "What you could afford" surface on the Money screen. Hidden numbers
 * resolve into qualitative feasibility labels so the player answers
 * "can I afford this?" without ever seeing a number (docs/09-economy.md
 * §"The 'What you could afford' design").
 */
export type Feasibility =
  | 'comfortable'
  | 'with_some_sacrifice'
  | 'only_by_stretching'
  | 'not_without_changing_careers'
  | 'not_realistically'

export interface PossiblePurchase {
  readonly description: string
  readonly feasibility: Feasibility
  readonly contextual: boolean
}

export interface AffordabilityContext {
  readonly possiblePurchases: readonly PossiblePurchase[]
}
