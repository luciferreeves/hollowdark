<script lang="ts">
  interface Props {
    size?: number
    subtitle?: string | null
    letterSpacing?: number
  }

  let { size = 38, subtitle = null, letterSpacing = 2 }: Props = $props()
</script>

<div class="app-title">
  <p class="name" style:font-size="{size}px" style:letter-spacing="{letterSpacing}px">
    Hollowdark
  </p>
  {#if subtitle}
    <p class="subtitle">{subtitle}</p>
  {/if}
</div>

<style>
  .app-title {
    text-align: center;
  }

  .name {
    font-family: var(--font-body);
    font-style: italic;
    font-weight: 400;
    color: var(--color-text);
    margin: 0 0 var(--space-6);
  }

  .subtitle {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--color-text-tertiary);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
  }
</style>
