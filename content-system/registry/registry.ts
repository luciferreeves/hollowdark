import type {
  CityContent,
  CityId,
  InstitutionContent,
  InstitutionContentId,
  RegionContent,
  RegionId
} from '@hollowdark/content-system/regions/schema'
import type { ContentManifest } from '@hollowdark/content-system/manifest/schema'
import { loadChunk } from '@hollowdark/content-system/loader/loader'

/**
 * The in-memory content registry. Populated once at session start by
 * walking the manifest and loading every chunk into typed maps. All
 * simulation-time reads go through here — synchronous, typed, fast.
 */
export class ContentRegistry {
  readonly #regions = new Map<RegionId, RegionContent>()
  readonly #cities = new Map<CityId, CityContent>()
  readonly #institutions = new Map<InstitutionContentId, InstitutionContent>()

  get regions(): ReadonlyMap<RegionId, RegionContent> {
    return this.#regions
  }

  get cities(): ReadonlyMap<CityId, CityContent> {
    return this.#cities
  }

  get institutions(): ReadonlyMap<InstitutionContentId, InstitutionContent> {
    return this.#institutions
  }

  addRegion(region: RegionContent): void {
    this.#regions.set(region.id, region)
  }

  addCity(city: CityContent): void {
    this.#cities.set(city.id, city)
  }

  addInstitution(institution: InstitutionContent): void {
    this.#institutions.set(institution.id, institution)
  }

  region(id: RegionId): RegionContent {
    const value = this.#regions.get(id)
    if (value === undefined) throw new Error(`Unknown region: ${id}`)
    return value
  }

  city(id: CityId): CityContent {
    const value = this.#cities.get(id)
    if (value === undefined) throw new Error(`Unknown city: ${id}`)
    return value
  }

  institution(id: InstitutionContentId): InstitutionContent {
    const value = this.#institutions.get(id)
    if (value === undefined) throw new Error(`Unknown institution: ${id}`)
    return value
  }
}

/**
 * Populate a fresh registry from the supplied manifest. Fetches every
 * chunk whose id begins with a world-content prefix; ignores unknown
 * prefixes so the registry can grow without breaking older clients.
 */
export async function populateFromManifest(
  manifest: ContentManifest,
  baseUrl: string
): Promise<ContentRegistry> {
  const registry = new ContentRegistry()

  const entries = Object.entries(manifest.chunks)
  await Promise.all(
    entries.map(async ([chunkId]) => {
      const { data } = await loadChunk(chunkId, manifest, baseUrl)
      if (chunkId.startsWith('world/regions/')) {
        registry.addRegion(data as unknown as RegionContent)
      } else if (chunkId.startsWith('world/cities/')) {
        registry.addCity(data as unknown as CityContent)
      } else if (chunkId.startsWith('world/institutions/')) {
        registry.addInstitution(data as unknown as InstitutionContent)
      }
    })
  )

  return registry
}
