<script lang="ts">
  import ProgressBar from '@hollowdark/ui-lib/components/ProgressBar.svelte'
  import { loadingProgress } from '@hollowdark/loading/progress'

  const progress = $derived($loadingProgress)
</script>

<section class="initial-load">
  <p class="title">Hollowdark</p>

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

  .title {
    font-family: var(--font-body);
    font-size: 32px;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 1px;
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
    margin-bottom: var(--space-2);
  }

  .note {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--color-text-tertiary);
    letter-spacing: 0.3px;
  }
</style>
