import type { GameTime } from '@hollowdark/time/gameTime'
import type { InstitutionId } from '../entities/base'

export type CareerTrajectory = 'rising' | 'steady' | 'declining' | 'stalled'

export interface CareerPerformance {
  readonly quality: number
  readonly reputationAtEmployer: number
  readonly yearsSinceLastRecognition: number
}

export interface CareerHistoryEntry {
  readonly careerId: string
  readonly employerId: InstitutionId | null
  readonly role: string
  readonly startedAt: GameTime
  readonly endedAt: GameTime | null
  readonly reasonEnded: string | null
  readonly notableEvents: readonly string[]
}

export interface CareerState {
  readonly currentCareerId: string | null
  readonly currentRole: string
  readonly currentEmployerId: InstitutionId | null
  readonly yearsInCurrentRole: number
  readonly yearsInCurrentCareer: number
  readonly careerHistory: readonly CareerHistoryEntry[]
  readonly performance: CareerPerformance
  readonly trajectory: CareerTrajectory
  readonly jobSatisfaction: number
}
