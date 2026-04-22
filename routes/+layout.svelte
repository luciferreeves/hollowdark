<script lang="ts">
  import { base } from '$app/paths'
  import AudioPlayer from '@hollowdark/lib/components/AudioPlayer.svelte'

  let { children } = $props()

  const titleTrackSrc = `${base}/audio/title/piano-relaxing.mp3`
</script>

<AudioPlayer src={titleTrackSrc} loop />

{@render children()}
