<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'tertiary'

  interface Props {
    variant?: Variant
    onclick: () => void
    children: import('svelte').Snippet
  }

  let { variant = 'primary', onclick, children }: Props = $props()
</script>

<button class="menu-button {variant}" {onclick}>
  {@render children()}
</button>

<style>
  .menu-button {
    font-family: var(--font-body);
    letter-spacing: 0.3px;
    transition: color var(--transition-fast);
  }

  .primary {
    font-size: var(--text-lg);
    color: var(--color-accent);
    letter-spacing: 0.5px;
  }

  .primary:hover {
    color: var(--color-text);
  }

  .secondary {
    font-size: 15px;
    color: var(--color-text-secondary);
  }

  .secondary:hover {
    color: var(--color-text);
  }

  .tertiary {
    font-size: 13px;
    color: var(--color-text-tertiary);
  }

  .tertiary:hover {
    color: var(--color-text-secondary);
  }
</style>
