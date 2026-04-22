<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { masterMuted, ambientVolume } from '@hollowdark/lib/audio/state'

  interface Props {
    src: string
    loop?: boolean
  }

  let { src, loop = false }: Props = $props()

  let audioEl: HTMLAudioElement | null = null
  let cleanupInteractionListeners: (() => void) | null = null

  onMount(async () => {
    if (!audioEl) return

    audioEl.volume = $ambientVolume
    audioEl.muted = $masterMuted

    try {
      await audioEl.play()
    } catch {
      const start = (): void => {
        audioEl?.play().catch(() => {})
      }
      document.addEventListener('click', start, { once: true, passive: true })
      document.addEventListener('keydown', start, { once: true, passive: true })
      document.addEventListener('touchstart', start, { once: true, passive: true })

      cleanupInteractionListeners = () => {
        document.removeEventListener('click', start)
        document.removeEventListener('keydown', start)
        document.removeEventListener('touchstart', start)
      }
    }
  })

  onDestroy(() => {
    cleanupInteractionListeners?.()
    if (audioEl) {
      audioEl.pause()
    }
  })

  $effect(() => {
    if (!audioEl) return
    audioEl.volume = $ambientVolume
    audioEl.muted = $masterMuted
  })
</script>

<audio bind:this={audioEl} {src} {loop} preload="auto"></audio>
