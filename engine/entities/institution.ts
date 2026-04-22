import type { GameTime } from '@hollowdark/time'
import type { BaseEntity, InstitutionId, PersonId, PlaceId } from './base'
import type { CultureDescriptor } from './place'

export type InstitutionType =
  | 'company'
  | 'government'
  | 'university'
  | 'school'
  | 'hospital'
  | 'religious'
  | 'nonprofit'
  | 'news'
  | 'cultural'
  | 'criminal'
  | 'military'

export interface InstitutionEvent {
  readonly at: GameTime
  readonly kind: string
  readonly summary: string
}

export interface Institution extends BaseEntity<InstitutionId, 'institution'> {
  readonly name: string
  readonly type: InstitutionType
  readonly placeId: PlaceId
  readonly foundedAt: GameTime

  readonly culture: CultureDescriptor

  /** Role tag (e.g., "manager", "ceo", "teacher") → person IDs holding it. */
  readonly members: ReadonlyMap<string, readonly PersonId[]>

  readonly prosperity: number
  readonly reputation: number
  readonly stability: number

  readonly majorEvents: readonly InstitutionEvent[]
}
