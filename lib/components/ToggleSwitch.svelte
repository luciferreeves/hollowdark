<script lang="ts">
  interface Props {
    value: boolean
    label: string
    onChange: (value: boolean) => void
  }

  let { value, label, onChange }: Props = $props()

  function handleClick(): void {
    onChange(!value)
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={value}
  aria-label={label}
  class="toggle"
  class:on={value}
  onclick={handleClick}
>
  <span class="thumb"></span>
</button>

<style>
  .toggle {
    position: relative;
    width: 38px;
    height: 20px;
    border-radius: 999px;
    background: rgba(232, 226, 213, 0.08);
    border: 1px solid rgba(232, 226, 213, 0.12);
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast);
  }

  .toggle.on {
    background: var(--color-accent);
    border-color: var(--color-accent);
  }

  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-text);
    transition: transform var(--transition-fast);
  }

  .toggle.on .thumb {
    transform: translateX(18px);
    background: var(--color-bg);
  }
</style>
