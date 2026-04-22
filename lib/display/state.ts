import { writable, type Writable } from 'svelte/store'

/**
 * User-facing override for motion-heavy visuals. When true, the leaf
 * scene is suppressed and long transitions are skipped even on systems
 * that do not signal `prefers-reduced-motion`. The CSS media query still
 * applies independently — this store only strengthens it.
 */
export const reduceMotion: Writable<boolean> = writable(false)
