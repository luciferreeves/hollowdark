/**
 * A coarse wealth tier derived from the hidden economic state. Never
 * displayed numerically; informs surface prose ("struggling", "comfortable",
 * "old money").
 */
export type EconomicClass =
  | 'destitute'
  | 'struggling'
  | 'working'
  | 'lower_middle'
  | 'middle'
  | 'upper_middle'
  | 'wealthy'
  | 'very_wealthy'
  | 'old_money'
  | 'generationally_wealthy'

export type AccountKind = 'checking' | 'savings' | 'brokerage' | 'retirement'

export interface Account {
  readonly id: string
  readonly kind: AccountKind
  readonly balance: number
}

export type AssetKind = 'home' | 'vehicle' | 'business' | 'collectible' | 'real_estate'

export interface Asset {
  readonly id: string
  readonly kind: AssetKind
  readonly description: string
  readonly estimatedValue: number
  readonly encumbered: boolean
}

export type DebtKind = 'mortgage' | 'auto' | 'student' | 'credit_card' | 'personal' | 'medical'

export interface Debt {
  readonly id: string
  readonly kind: DebtKind
  readonly balance: number
  readonly monthlyPayment: number
  readonly apr: number
}

/**
 * Hidden economic state for a character. All numbers are in "marks" (the
 * world's universal currency). Never surfaced to the player as digits —
 * the simulation drives prose and qualitative affordability context.
 */
export interface EconomicState {
  readonly cashOnHand: number
  readonly accounts: readonly Account[]
  readonly assets: readonly Asset[]
  readonly debts: readonly Debt[]
  readonly monthlyIncome: number
  readonly monthlyExpenses: number
  readonly netWorth: number
  readonly classification: EconomicClass
}
