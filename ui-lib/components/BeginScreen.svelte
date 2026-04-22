<script lang="ts">
  import type { BeginState } from '@hollowdark/loading/session'

  interface Props {
    state: BeginState
    appVersion?: string
    onBegin: () => void
    onContinue?: () => void
    onSettings: () => void
  }

  let {
    state,
    appVersion = 'v 0.1',
    onBegin,
    onContinue,
    onSettings
  }: Props = $props()

  function handleContinue(): void {
    onContinue?.()
  }
</script>

<section class="begin">
  <div class="top">
    <p class="title">Hollowdark</p>
    <p class="subtitle">A life simulation</p>
  </div>

  <div class="actions">
    {#if state.kind === 'first-ever'}
      <button class="primary" onclick={onBegin}>Begin</button>
    {:else if state.kind === 'returning-active'}
      <button class="primary" onclick={handleContinue}>
        Continue {state.characterName}'s life
      </button>
      <button class="secondary" onclick={onBegin}>Begin a new life</button>
    {:else}
      <button class="primary" onclick={handleContinue}>Continue</button>
      <button class="secondary" onclick={onBegin}>Begin a new life</button>
    {/if}

    <button class="tertiary" onclick={onSettings}>Settings</button>
  </div>

  <p class="version">{appVersion}</p>
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
    text-align: center;
  }

  .top {
    margin-bottom: 120px;
  }

  .title {
    font-family: var(--font-body);
    font-size: 38px;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 2px;
    color: var(--color-text);
    margin-bottom: var(--space-6);
  }

  .subtitle {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--color-text-tertiary);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-8);
  }

  .primary {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-accent);
    letter-spacing: 0.5px;
    transition: color var(--transition-fast);
  }

  .primary:hover {
    color: var(--color-text);
  }

  .secondary {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--color-text-secondary);
    letter-spacing: 0.3px;
    transition: color var(--transition-fast);
  }

  .secondary:hover {
    color: var(--color-text);
  }

  .tertiary {
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--color-text-tertiary);
    letter-spacing: 0.3px;
    transition: color var(--transition-fast);
  }

  .tertiary:hover {
    color: var(--color-text-secondary);
  }

  .version {
    position: absolute;
    bottom: var(--space-6);
    left: 0;
    right: 0;
    text-align: center;
    font-family: var(--font-ui);
    font-size: 10px;
    color: #3d382f;
    letter-spacing: 1px;
  }
</style>
