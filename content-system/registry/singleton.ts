import type { ContentRegistry } from '@hollowdark/content-system/registry/registry'

let instance: ContentRegistry | null = null

/** Record the registry populated during session startup. */
export function setContentRegistry(registry: ContentRegistry): void {
  instance = registry
}

/**
 * Access the shared content registry. Throws if called before the
 * loading pipeline has populated it — simulation code should never run
 * until initial load is complete.
 */
export function getContentRegistry(): ContentRegistry {
  if (instance === null) {
    throw new Error('Content registry not initialised. Initial load must complete first.')
  }
  return instance
}

/** True once the registry has been populated. */
export function hasContentRegistry(): boolean {
  return instance !== null
}
