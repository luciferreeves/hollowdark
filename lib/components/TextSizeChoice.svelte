<script lang="ts">
  import type { TextSize } from '@hollowdark/lib/reading/state'

  interface Option {
    value: TextSize
    label: string
  }

  interface Props {
    value: TextSize
    onChange: (next: TextSize) => void
  }

  let { value, onChange }: Props = $props()

  const options: readonly Option[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'XL' }
  ]
</script>

<div class="group" role="radiogroup" aria-label="Text size">
  {#each options as option (option.value)}
    <button
      type="button"
      role="radio"
      aria-checked={value === option.value}
      class="choice"
      class:active={value === option.value}
      class:size-small={option.value === 'small'}
      class:size-medium={option.value === 'medium'}
      class:size-large={option.value === 'large'}
      class:size-extra-large={option.value === 'extra-large'}
      onclick={() => onChange(option.value)}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .group {
    display: flex;
    gap: var(--space-2);
  }

  .choice {
    flex: 1;
    background: transparent;
    border: 1px solid rgba(232, 226, 213, 0.12);
    border-radius: 6px;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-body);
    color: var(--color-text-secondary);
    transition:
      color var(--transition-fast),
      border-color var(--transition-fast),
      background var(--transition-fast);
  }

  .choice:hover {
    color: var(--color-text);
    border-color: rgba(232, 226, 213, 0.22);
  }

  .choice.active {
    color: var(--color-accent);
    border-color: rgba(184, 136, 74, 0.4);
    background: rgba(184, 136, 74, 0.12);
  }

  .choice.size-small {
    font-size: 13px;
  }

  .choice.size-medium {
    font-size: 15px;
  }

  .choice.size-large {
    font-size: 17px;
  }

  .choice.size-extra-large {
    font-size: 19px;
  }
</style>
