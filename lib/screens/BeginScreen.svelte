<script lang="ts">
  import { base } from '$app/paths'
  import AppTitle from '@hollowdark/lib/components/AppTitle.svelte'
  import AppVersion from '@hollowdark/lib/components/AppVersion.svelte'
  import AudioPlayer from '@hollowdark/lib/components/AudioPlayer.svelte'
  import BeginActions from '@hollowdark/lib/components/BeginActions.svelte'
  import type { BeginState } from '@hollowdark/loading/session'

  interface Props {
    state: BeginState
    onBegin: () => void
    onContinue?: () => void
    onSettings: () => void
    onCredits: () => void
  }

  let {
    state,
    onBegin,
    onContinue,
    onSettings,
    onCredits
  }: Props = $props()

  const titleTrackSrc = `${base}/audio/title/piano-relaxing.mp3`
</script>

<section class="begin">
  <div class="top">
    <AppTitle size={38} subtitle="A Literary Life Simulation" />
  </div>

  <BeginActions {state} {onBegin} {onContinue} {onSettings} {onCredits} />

  <AppVersion />

  <AudioPlayer src={titleTrackSrc} loop />
</section>

<style>
  .begin {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-12);
    position: relative;
  }

  .top {
    margin-bottom: 120px;
  }
</style>
