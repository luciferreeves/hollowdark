<script lang="ts">
  import { base } from '$app/paths'
  import AudioPlayer from '@hollowdark/lib/audio/AudioPlayer.svelte'
  import { highContrast, reduceMotion } from '@hollowdark/lib/accessibility/state'
  import { textSize, type TextSize } from '@hollowdark/lib/reading/state'

  let { children } = $props()

  const titleTrackSrc = `${base}/audio/title/piano-relaxing.mp3`

  const ALL_TEXT_SIZE_CLASSES: readonly string[] = [
    'text-size-small',
    'text-size-medium',
    'text-size-large',
    'text-size-extra-large'
  ]

  function applyTextSize(size: TextSize): void {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.remove(...ALL_TEXT_SIZE_CLASSES)
    root.classList.add(`text-size-${size}`)
  }

  function applyFlag(className: string, active: boolean): void {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle(className, active)
  }

  $effect(() => applyTextSize($textSize))
  $effect(() => applyFlag('reduce-motion', $reduceMotion))
  $effect(() => applyFlag('high-contrast', $highContrast))
</script>

<AudioPlayer src={titleTrackSrc} loop />

{@render children()}
