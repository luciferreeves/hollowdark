<script lang="ts">
  interface Props {
    value: number
    min?: number
    max?: number
    step?: number
    label: string
    onChange: (value: number) => void
  }

  let {
    value,
    min = 0,
    max = 1,
    step = 0.01,
    label,
    onChange
  }: Props = $props()

  function handleInput(event: Event): void {
    const target = event.currentTarget as HTMLInputElement
    onChange(Number(target.value))
  }
</script>

<input
  type="range"
  {min}
  {max}
  {step}
  {value}
  aria-label={label}
  class="slider"
  oninput={handleInput}
/>

<style>
  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 200px;
    height: 2px;
    background: rgba(232, 226, 213, 0.12);
    outline: none;
    border-radius: 1px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-accent);
    cursor: pointer;
    border: none;
    transition: transform var(--transition-fast);
  }

  .slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-accent);
    cursor: pointer;
    border: none;
    transition: transform var(--transition-fast);
  }

  .slider:hover::-webkit-slider-thumb,
  .slider:focus-visible::-webkit-slider-thumb {
    transform: scale(1.15);
  }

  .slider:hover::-moz-range-thumb,
  .slider:focus-visible::-moz-range-thumb {
    transform: scale(1.15);
  }
</style>
