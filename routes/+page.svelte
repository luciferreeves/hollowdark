<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { assets, resolve } from '$app/paths'
  import BeginScreen from '@hollowdark/lib/screens/BeginScreen.svelte'
  import InitialLoadScreen from '@hollowdark/lib/screens/InitialLoadScreen.svelte'
  import { runInitialLoad } from '@hollowdark/loading/content'
  import { detectBeginState, type BeginState } from '@hollowdark/loading/session'
  import {
    hasCompletedInitialLoad,
    markInitialLoadComplete
  } from '@hollowdark/loading/lifecycle'

  type View = 'loading' | 'begin'

  let view: View = $state(hasCompletedInitialLoad() ? 'begin' : 'loading')
  let beginState: BeginState = $state({ kind: 'first-ever' })

  onMount(async () => {
    if (!hasCompletedInitialLoad()) {
      await runInitialLoad(assets)
      markInitialLoadComplete()
    }
    beginState = await detectBeginState()
    view = 'begin'
  })

  function handleBegin(): void {}
  function handleContinue(): void {}
  function handleSettings(): void {
    goto(resolve('/settings'))
  }
  function handleCredits(): void {
    goto(resolve('/credits'))
  }
</script>

{#if view === 'loading'}
  <InitialLoadScreen />
{:else}
  <BeginScreen
    state={beginState}
    onBegin={handleBegin}
    onContinue={handleContinue}
    onSettings={handleSettings}
    onCredits={handleCredits}
  />
{/if}
