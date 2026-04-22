<script lang="ts">
  import AppTitle from '@hollowdark/lib/components/AppTitle.svelte'
  import AppVersion from '@hollowdark/lib/components/AppVersion.svelte'
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
</script>

<section class="begin">
  <div class="content">
    <div class="top">
      <AppTitle size={38} subtitle="A Literary Life Simulation" />
    </div>

    <BeginActions {state} {onBegin} {onContinue} {onSettings} {onCredits} />
  </div>

  <AppVersion />
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top {
    margin-bottom: 120px;
  }
</style>
