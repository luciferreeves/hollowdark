<script lang="ts">
  import AppTitle from '@hollowdark/lib/components/AppTitle.svelte'
  import ProgressBar from '@hollowdark/lib/components/ProgressBar.svelte'
  import type { LoadingProgress } from '@hollowdark/loading/progress'

  interface Props {
    progress: LoadingProgress
  }

  let { progress }: Props = $props()
</script>

<section class="initial-load">
  <div class="top">
    <AppTitle size={32} letterSpacing={1} />
  </div>

  <div class="bar">
    <ProgressBar value={progress.percentage} />
  </div>

  <p class="message">{progress.currentMessage}</p>
  <p class="note">This will happen once. It will not happen again.</p>
</section>

<style>
  .initial-load {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-12);
    text-align: center;
  }

  .top {
    margin-bottom: 120px;
  }

  .bar {
    margin-bottom: var(--space-6);
  }

  .message {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--color-text-secondary);
    letter-spacing: 0.5px;
    margin: 0 0 var(--space-2);
  }

  .note {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--color-text-tertiary);
    letter-spacing: 0.3px;
    margin: 0;
  }
</style>
