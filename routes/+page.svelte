<script lang="ts">
  import { onMount } from 'svelte'
  import BeginScreen from '@hollowdark/lib/screens/BeginScreen.svelte'
  import InitialLoadScreen from '@hollowdark/lib/screens/InitialLoadScreen.svelte'
  import { runStubInitialLoad } from '@hollowdark/loading/stub'
  import { detectBeginState, type BeginState } from '@hollowdark/loading/session'

  type View = 'loading' | 'begin'

  let view: View = $state('loading')
  let beginState: BeginState = $state({ kind: 'first-ever' })

  onMount(async () => {
    await runStubInitialLoad()
    beginState = await detectBeginState()
    view = 'begin'
  })

  function handleBegin(): void {}
  function handleContinue(): void {}
  function handleSettings(): void {}
  function handleCredits(): void {}
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
