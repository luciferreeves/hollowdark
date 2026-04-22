import type { Brand } from '@hollowdark/utils/types/brand'

/** Stable slug identifying a region across versions. */
export type RegionId = Brand<string, 'RegionId'>

/** Stable slug identifying a city across versions. */
export type CityId = Brand<string, 'CityId'>

/** Stable slug identifying an institution across versions. */
export type InstitutionContentId = Brand<string, 'InstitutionContentId'>

/** Dominant economic sector categories used across the world's regions. */
export type EconomicSector =
  | 'agriculture'
  | 'publishing'
  | 'education'
  | 'finance'
  | 'government'
  | 'industry'
  | 'logistics'
  | 'mining'
  | 'oil_and_gas'
  | 'renewable_energy'
  | 'services'
  | 'shipping'
  | 'technology'
  | 'timber'
  | 'tourism'
  | 'trades'
  | 'entertainment'
  | 'fishing'
  | 'retail'
  | 'design'
  | 'construction'
  | 'healthcare'
  | 'transportation'

/** Coarse measure of income disparity in a region. */
export type Inequality = 'flat' | 'moderate' | 'high' | 'extreme'

/**
 * Share of the population affiliated, nominally or actively, with each of
 * the three main religions plus secular/unaffiliated. Values in [0, 1],
 * sum ~= 1 per region.
 */
export interface ReligiousComposition {
  readonly covenant: number
  readonly old_faith: number
  readonly quiet_path: number
  readonly secular: number
}

/** Climate texture — prose for scenes, plus rough numeric anchors. */
export interface RegionClimate {
  readonly summary: string
  readonly temperature_range_c: readonly [number, number]
  readonly annual_rainfall_mm: number
}

/** The role a city plays relative to its region. */
export type CityRole =
  | 'metropolis'
  | 'port'
  | 'university_town'
  | 'industrial_town'
  | 'capital'
  | 'agricultural_hub'
  | 'resort'
  | 'mining_town'
  | 'frontier_town'
  | 'tourist'
  | 'mill_town'

/** Region-level content source, one YAML file per region. */
export interface RegionContent {
  readonly id: RegionId
  readonly display_name: string
  readonly population_weight: number
  readonly climate: RegionClimate
  readonly economy: {
    readonly summary: string
    readonly dominant_sectors: readonly EconomicSector[]
    readonly inequality: Inequality
  }
  readonly culture: {
    readonly summary: string
    readonly texture: string
  }
  readonly class_texture: string
  readonly religion: ReligiousComposition
  readonly city_ids: readonly CityId[]
  readonly institution_ids: readonly InstitutionContentId[]
  readonly stereotypes: {
    readonly held_by_others: string
    readonly self_image: string
  }
}

/** City-level content source, one YAML file per city. */
export interface CityContent {
  readonly id: CityId
  readonly region_id: RegionId
  readonly display_name: string
  readonly population: number
  readonly role: CityRole
  readonly character: string
}

/** Institution-level content source, one YAML file per institution. */
export interface InstitutionContent {
  readonly id: InstitutionContentId
  readonly region_id: RegionId
  readonly city_id: CityId
  readonly display_name: string
  readonly kind: 'publisher' | 'university' | 'hospital' | 'newspaper' | 'employer' | 'religious' | 'government'
  readonly character: string
}
