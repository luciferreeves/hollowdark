<script lang="ts">
  interface Props {
    value: number
    width?: number
  }

  let { value, width = 320 }: Props = $props()

  const percentage = $derived(Math.max(0, Math.min(1, value)) * 100)
</script>

<div class="progress-track" style:width="{width}px">
  <div class="progress-fill" style:width="{percentage}%"></div>
</div>

<style>
  .progress-track {
    height: 2px;
    background: rgba(232, 226, 213, 0.06);
    border-radius: 1px;
    position: relative;
    overflow: hidden;
  }

  .progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--color-accent);
    border-radius: 1px;
    transition: width 300ms ease-out;
  }
</style>
