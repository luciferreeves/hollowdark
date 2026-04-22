import { writable, type Writable } from 'svelte/store'

/**
 * Master mute. When true, every audio source is silenced regardless of
 * category volume. Surfaced on the Settings screen as a single toggle.
 */
export const masterMuted: Writable<boolean> = writable(false)

/**
 * Volume for ambient layers — title music, location textures, region
 * beds. 0..1. Ceremonial pieces (death, memoir) use a separate store
 * when that category comes online.
 */
export const ambientVolume: Writable<number> = writable(0.6)
