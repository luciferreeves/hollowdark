let completed = false

/**
 * Whether the initial-load pipeline has finished during this browser
 * session. Navigating away from the Begin screen and returning should
 * not replay the progress bar — once it has run, it has run.
 */
export function hasCompletedInitialLoad(): boolean {
  return completed
}

/** Record that the initial load has finished. Idempotent. */
export function markInitialLoadComplete(): void {
  completed = true
}
