import type { BaseEntity, PersonId, PlaceId } from '@hollowdark/engine/entities/base'

export type PlaceType = 'region' | 'city' | 'neighborhood' | 'specific_location'

/**
 * Cultural character of a region or city — drives event textures,
 * stereotypes, attitudes. Open-ended because cultures differ on many axes;
 * specific named attributes live alongside this via content references.
 */
export interface CultureDescriptor {
  readonly dominantFaithId: string | null
  readonly cosmopolitanism: number
  readonly conservatism: number
  readonly hospitality: number
  readonly tags: readonly string[]
}

export interface ClimateDescriptor {
  readonly latitudeBand: 'tropical' | 'temperate' | 'continental' | 'arid' | 'alpine' | 'tundra'
  readonly summerSeverity: number
  readonly winterSeverity: number
  readonly rainfall: number
  readonly notes: string
}

export interface EconomicCharacter {
  readonly primaryIndustries: readonly string[]
  readonly inequality: number
  readonly prosperity: number
}

export interface PoliticalCharacter {
  readonly form: 'democracy' | 'mixed' | 'authoritarian' | 'oligarchy' | 'other'
  readonly stability: number
  readonly currentTensions: readonly string[]
}

export interface Place extends BaseEntity<PlaceId, 'place'> {
  readonly name: string
  readonly type: PlaceType
  readonly parentPlaceId: PlaceId | null

  readonly culture: CultureDescriptor | null
  readonly climate: ClimateDescriptor | null
  readonly economy: EconomicCharacter | null
  readonly politics: PoliticalCharacter | null

  readonly population: number

  readonly ownerId: PersonId | null
  readonly currentResidents: readonly PersonId[]
  readonly propertyValue: number | null
}
