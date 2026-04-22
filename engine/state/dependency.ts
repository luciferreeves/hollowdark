import type { GameTime } from '@hollowdark/time/gameTime'

/**
 * A substance or behavioural dependency at a given stage of progression:
 * experimentation → regular use → problem use → dependence → crisis →
 * recovery | chronic | death.
 */
export type DependencyStage =
  | 'experimentation'
  | 'regular_use'
  | 'problem_use'
  | 'dependence'
  | 'crisis'
  | 'in_recovery'
  | 'chronic'

export interface Dependency {
  readonly id: string
  readonly substance: string
  readonly stage: DependencyStage
  readonly severity: number
  readonly startedAt: GameTime
  readonly lastRelapseAt: GameTime | null
}
