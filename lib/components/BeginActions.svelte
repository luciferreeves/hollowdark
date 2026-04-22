<script lang="ts">
  import MenuButton from '@hollowdark/lib/components/MenuButton.svelte'
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

  function handleContinue(): void {
    onContinue?.()
  }
</script>

<div class="begin-actions">
  {#if state.kind === 'first-ever'}
    <MenuButton variant="primary" onclick={onBegin}>Begin</MenuButton>
  {:else if state.kind === 'returning-active'}
    <MenuButton variant="primary" onclick={handleContinue}>
      Continue {state.characterName}'s life
    </MenuButton>
    <MenuButton variant="secondary" onclick={onBegin}>Begin a new life</MenuButton>
  {:else}
    <MenuButton variant="primary" onclick={handleContinue}>Continue</MenuButton>
    <MenuButton variant="secondary" onclick={onBegin}>Begin a new life</MenuButton>
  {/if}

  <MenuButton variant="tertiary" onclick={onSettings}>Settings</MenuButton>
  <MenuButton variant="tertiary" onclick={onCredits}>Credits</MenuButton>
</div>

<style>
  .begin-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-8);
  }
</style>
