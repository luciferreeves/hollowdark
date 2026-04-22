import { writable, type Writable } from 'svelte/store'

/**
 * User override that strengthens the `prefers-reduced-motion` media
 * query. When true, long transitions are trimmed regardless of the OS
 * setting. Applied as a class on `<html>`.
 */
export const reduceMotion: Writable<boolean> = writable(false)

/**
 * User override that brightens the foreground palette for readers who
 * need extra contrast. Applied as a class on `<html>`.
 */
export const highContrast: Writable<boolean> = writable(false)
