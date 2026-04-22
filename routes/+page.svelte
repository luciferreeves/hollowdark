<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import BeginScreen from '@hollowdark/lib/screens/BeginScreen.svelte'
  import InitialLoadScreen from '@hollowdark/lib/screens/InitialLoadScreen.svelte'
  import { runStubInitialLoad } from '@hollowdark/loading/stub'
  import { detectBeginState, type BeginState } from '@hollowdark/loading/session'
  import {
    hasCompletedInitialLoad,
    markInitialLoadComplete
  } from '@hollowdark/loading/lifecycle'
  import { saveWorld } from '@hollowdark/persistence/worlds'
  import { generateWorld } from '@hollowdark/worldgen/world'

  type View = 'loading' | 'begin'

  let view: View = $state(hasCompletedInitialLoad() ? 'begin' : 'loading')
  let beginState: BeginState = $state({ kind: 'first-ever' })

  onMount(async () => {
    if (!hasCompletedInitialLoad()) {
      await runStubInitialLoad()
      markInitialLoadComplete()
    }
    beginState = await detectBeginState()
    view = 'begin'
  })

  async function handleBegin(): Promise<void> {
    const world = generateWorld()
    await saveWorld(world)
    beginState = await detectBeginState()
  }
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
