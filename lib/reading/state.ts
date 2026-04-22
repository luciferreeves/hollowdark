import { writable, type Writable } from 'svelte/store'

/** Text-size scale presets. Each maps to a class on the document root. */
export type TextSize = 'small' | 'medium' | 'large' | 'extra-large'

/**
 * Reader's chosen text size. Drives the `--text-*` custom properties
 * through a class on `<html>` that swaps the whole scale at once. The
 * layout subscribes to this store and applies the class.
 */
export const textSize: Writable<TextSize> = writable('medium')
