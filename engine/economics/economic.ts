/**
 * Economic state. All numbers in "marks" (the world's universal currency).
 * The player never sees any of these — they surface as prose and qualitative
 * affordability context (docs/09-economy.md, ARCHITECTURE.md §14).
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
