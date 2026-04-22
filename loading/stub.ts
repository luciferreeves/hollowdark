import { loadingProgress } from '@hollowdark/loading/progress'

const STUB_DURATION_MS = 3000

/**
 * Stand-in for the real content-manifest fetch and chunk download. Animates
 * the loading progress store from 0 to 1 over three seconds of wall-clock
 * time, then resolves. Replace with the real pipeline when content loading
 * comes online.
 */
export function runStubInitialLoad(): Promise<void> {
  loadingProgress.set({
    percentage: 0,
    currentMessage: 'Preparing your reading space',
    phase: 'loading'
  })

  return new Promise((resolve) => {
    const startedAt = performance.now()

    const tick = (): void => {
      const elapsed = performance.now() - startedAt
      const pct = Math.min(1, elapsed / STUB_DURATION_MS)
      const done = pct >= 1

      loadingProgress.set({
        percentage: pct,
        currentMessage: 'Preparing your reading space',
        phase: done ? 'complete' : 'loading'
      })

      if (done) {
        resolve()
        return
      }

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  })
}
