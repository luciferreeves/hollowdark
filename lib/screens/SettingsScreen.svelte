<script lang="ts">
  import Slider from '@hollowdark/lib/components/Slider.svelte'
  import ToggleSwitch from '@hollowdark/lib/components/ToggleSwitch.svelte'
  import { ambientVolume, masterMuted } from '@hollowdark/lib/audio/state'
  import { reduceMotion } from '@hollowdark/lib/display/state'
  import { APP_VERSION_FULL } from '@hollowdark/lib/version/version'

  interface Props {
    onBack: () => void
  }

  let { onBack }: Props = $props()

  const volumePercent = $derived(Math.round($ambientVolume * 100))

  function setMuted(next: boolean): void {
    masterMuted.set(next)
  }

  function setVolume(next: number): void {
    ambientVolume.set(next)
  }

  function setReduceMotion(next: boolean): void {
    reduceMotion.set(next)
  }
</script>

<section class="settings">
  <header class="top">
    <button class="back" onclick={onBack}>← Back</button>
    <h1 class="heading">Settings</h1>
  </header>

  <div class="body">
    <section class="group">
      <h2 class="group-label">Audio</h2>

      <div class="row">
        <div class="row-label">
          <p class="row-name">Mute everything</p>
          <p class="row-hint">Silence all sound, regardless of volume.</p>
        </div>
        <ToggleSwitch value={$masterMuted} label="Mute everything" onChange={setMuted} />
      </div>

      <div class="row">
        <div class="row-label">
          <p class="row-name">Ambient volume</p>
          <p class="row-hint">Title music and region beds.</p>
        </div>
        <div class="slider-cell">
          <Slider
            value={$ambientVolume}
            min={0}
            max={1}
            step={0.01}
            label="Ambient volume"
            onChange={setVolume}
          />
          <span class="slider-value">{volumePercent}%</span>
        </div>
      </div>
    </section>

    <section class="group">
      <h2 class="group-label">Display</h2>

      <div class="row">
        <div class="row-label">
          <p class="row-name">Reduce motion</p>
          <p class="row-hint">
            Hide the falling leaves and trim long transitions. Overrides
            the system preference.
          </p>
        </div>
        <ToggleSwitch
          value={$reduceMotion}
          label="Reduce motion"
          onChange={setReduceMotion}
        />
      </div>
    </section>

    <section class="group">
      <h2 class="group-label">About</h2>

      <div class="about">
        <p class="about-title">Hollowdark</p>
        <p class="about-line">Version {APP_VERSION_FULL}</p>
        <p class="about-line">A literary life simulation.</p>
      </div>
    </section>
  </div>
</section>

<style>
  .settings {
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

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
    padding: var(--space-3) 0;
    border-bottom: 1px solid rgba(232, 226, 213, 0.06);
  }

  .row-label {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    flex: 1;
    min-width: 0;
  }

  .row-name {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text);
    margin: 0;
  }

  .row-hint {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-text-tertiary);
    margin: 0;
  }

  .slider-cell {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .slider-value {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    min-width: 3.5ch;
    text-align: right;
  }

  .about {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3) 0;
  }

  .about-title {
    font-family: var(--font-body);
    font-size: var(--text-md);
    font-style: italic;
    color: var(--color-text);
    margin: 0;
  }

  .about-line {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-text-tertiary);
    margin: 0;
  }
</style>
