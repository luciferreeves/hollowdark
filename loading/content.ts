import { fetchManifest } from '@hollowdark/content-system/loader/loader'
import { populateFromManifest } from '@hollowdark/content-system/registry/registry'
import { setContentRegistry } from '@hollowdark/content-system/registry/singleton'
import { loadingProgress } from '@hollowdark/loading/progress'

/**
 * Run the real initial-load pipeline. Fetches the content manifest,
 * walks every chunk into the shared registry, and reports progress to
 * the loading store so the initial-load screen's bar moves in real
 * time. Falls back to whatever is cached when offline.
 *
 * `baseUrl` is the app's base path — empty string in local dev, the
 * hosting sub-path under GitHub Pages.
 */
export async function runInitialLoad(baseUrl: string): Promise<void> {
  loadingProgress.set({
    percentage: 0,
    currentMessage: 'Preparing your reading space',
    phase: 'loading'
  })

  const manifest = await fetchManifest(baseUrl)
  const chunkCount = Object.keys(manifest.chunks).length

  if (chunkCount === 0) {
    setContentRegistry(
      await populateFromManifest(manifest, baseUrl, () => {})
    )
    loadingProgress.set({
      percentage: 1,
      currentMessage: 'Preparing your reading space',
      phase: 'complete'
    })
    return
  }

  const registry = await populateFromManifest(manifest, baseUrl, (loaded, total) => {
    loadingProgress.set({
      percentage: loaded / total,
      currentMessage: 'Preparing your reading space',
      phase: loaded === total ? 'complete' : 'loading'
    })
  })

  setContentRegistry(registry)
}
