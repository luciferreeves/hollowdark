import { writable, type Writable } from 'svelte/store'

/**
 * Phase the loading pipeline is in.
 *   `idle`      nothing running yet; percentage is 0.
 *   `loading`   a load is in flight; percentage advances 0 → 1.
 *   `complete`  load finished; percentage is 1.
 */
export type LoadingPhase = 'idle' | 'loading' | 'complete'

/** Reactive snapshot of the loading pipeline. */
export interface LoadingProgress {
  readonly percentage: number
  readonly currentMessage: string
  readonly phase: LoadingPhase
}

const DEFAULT: LoadingProgress = {
  percentage: 0,
  currentMessage: 'Preparing your reading space',
  phase: 'idle'
}

/** Global store of the initial-load progress. Components subscribe via `$`. */
export const loadingProgress: Writable<LoadingProgress> = writable(DEFAULT)

/** Reset the store to its initial state. Useful between sessions in dev. */
export function resetLoadingProgress(): void {
  loadingProgress.set(DEFAULT)
}
