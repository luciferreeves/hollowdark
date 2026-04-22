<script lang="ts">
  import { CREDITS, type CreditKind } from '@hollowdark/lib/credits/credits'

  interface Props {
    onBack: () => void
  }

  let { onBack }: Props = $props()

  const KIND_LABELS: Record<CreditKind, string> = {
    font: 'Fonts',
    audio: 'Audio',
    library: 'Libraries'
  }

  const KIND_ORDER: readonly CreditKind[] = ['font', 'audio', 'library']

  const grouped = $derived(
    KIND_ORDER.map((kind) => ({
      kind,
      label: KIND_LABELS[kind],
      entries: CREDITS.filter((c) => c.kind === kind)
    })).filter((section) => section.entries.length > 0)
  )
</script>

<section class="credits">
  <header class="top">
    <button class="back" onclick={onBack}>← Back</button>
    <h1 class="heading">Credits</h1>
  </header>

  <div class="body">
    <p class="intro">
      Hollowdark stands on other people's work. The fonts, music, and libraries
      below are used under their respective licenses, reproduced alongside the
      files in the repository.
    </p>

    {#each grouped as section (section.kind)}
      <section class="group">
        <h2 class="group-label">{section.label}</h2>

        {#each section.entries as credit (credit.title)}
          <article class="entry">
            <p class="entry-title">{credit.title}</p>
            <p class="entry-meta">
              <span class="author">{credit.author}</span>
              <span class="dot">·</span>
              <span class="license">{credit.license}</span>
            </p>
            {#if credit.note}
              <p class="entry-note">{credit.note}</p>
            {/if}
            {#if credit.sourceUrl}
              <a class="entry-source" href={credit.sourceUrl} target="_blank" rel="noopener">
                {credit.sourceUrl}
              </a>
            {/if}
          </article>
        {/each}
      </section>
    {/each}
  </div>
</section>

<style>
  .credits {
    min-height: 100dvh;
    padding: var(--space-8) var(--space-6) var(--space-12);
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .top {
    display: flex;
    align-items: baseline;
    gap: var(--space-6);
    margin-bottom: var(--space-12);
  }

  .back {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    letter-spacing: 0.3px;
    transition: color var(--transition-fast);
  }

  .back:hover {
    color: var(--color-text);
  }

  .heading {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    font-style: italic;
    font-weight: 400;
    letter-spacing: 1px;
    color: var(--color-text);
    margin: 0;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .intro {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--color-text-secondary);
    margin: 0;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .group-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 var(--space-2);
  }

  .entry {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .entry-title {
    font-family: var(--font-body);
    font-size: var(--text-md);
    color: var(--color-text);
    margin: 0;
  }

  .entry-meta {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    margin: 0;
  }

  .author,
  .license {
    color: var(--color-text-secondary);
  }

  .dot {
    color: var(--color-text-tertiary);
    margin: 0 var(--space-1);
  }

  .entry-note {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-text-tertiary);
    font-style: italic;
    margin: 0;
  }

  .entry-source {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
    letter-spacing: 0.3px;
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .entry-source:hover {
    color: var(--color-accent);
  }
</style>
