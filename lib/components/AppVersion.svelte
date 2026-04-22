<script lang="ts">
  interface Props {
    version: string
  }

  let { version }: Props = $props()
</script>

<p class="app-version">v {version}</p>

<style>
  .app-version {
    position: absolute;
    bottom: var(--space-6);
    left: 0;
    right: 0;
    margin: 0;
    text-align: center;
    font-family: var(--font-ui);
    font-size: 10px;
    color: #3d382f;
    letter-spacing: 1px;
  }
</style>
