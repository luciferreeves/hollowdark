<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { createRNG } from '@hollowdark/rng/seeded'
  import { LEAF_VARIANTS } from '@hollowdark/lib/leaves/variants'
  import { spawnLeaf } from '@hollowdark/lib/leaves/spawn'
  import { isLeafOffscreen, stepLeaf } from '@hollowdark/lib/leaves/physics'
  import {
    initialWindSystem,
    particleOpacity,
    stepWind,
    type IdSource
  } from '@hollowdark/lib/leaves/wind'
  import type { Leaf, SceneDimensions, WindSystem } from '@hollowdark/lib/leaves/types'

  const TARGET_LEAF_COUNT = 14
  const GROUND_Y_RATIO = 0.86

  const rng = createRNG(Math.floor(performance.now() * 1000) | 0)

  let container: HTMLDivElement | null = null
  let scene: SceneDimensions = $state({ width: 0, height: 0, groundY: 0 })
  let leaves: Leaf[] = $state([])
  let wind: WindSystem = $state(initialWindSystem(rng))

  let rafId: number | null = null
  let lastTimeMs = 0
  let nextLeafId = 0
  let nextGustId = 0
  let nextParticleId = 0
  let resizeObserver: ResizeObserver | null = null

  const ids: IdSource = {
    nextGustId: () => nextGustId++,
    nextParticleId: () => nextParticleId++
  }

  function measure(): void {
    if (!container) return
    const rect = container.getBoundingClientRect()
    scene = {
      width: rect.width,
      height: rect.height,
      groundY: rect.height * GROUND_Y_RATIO
    }
  }

  onMount(() => {
    measure()

    for (let i = 0; i < TARGET_LEAF_COUNT; i++) {
      leaves = [...leaves, spawnLeaf(nextLeafId++, scene, rng)]
    }

    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(container)
    }

    const tick = (nowMs: number): void => {
      const dtMs = Math.min(50, nowMs - lastTimeMs)
      lastTimeMs = nowMs
      const dt = dtMs / 1000
      const timeS = nowMs / 1000

      wind = stepWind(wind, dtMs, scene, rng, ids)

      const next: Leaf[] = []
      for (const leaf of leaves) {
        const advanced = stepLeaf(leaf, dt, timeS, wind, scene)
        if (!isLeafOffscreen(advanced, scene)) {
          next.push(advanced)
        }
      }

      while (next.length < TARGET_LEAF_COUNT) {
        next.push(spawnLeaf(nextLeafId++, scene, rng))
      }

      leaves = next
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame((nowMs) => {
      lastTimeMs = nowMs
      rafId = requestAnimationFrame(tick)
    })
  })

  onDestroy(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    resizeObserver?.disconnect()
  })
</script>

<div class="leaf-scene" bind:this={container} aria-hidden="true">
  <svg class="defs" width="0" height="0" focusable="false">
    <defs>
      {#each LEAF_VARIANTS as variant (variant.id)}
        <symbol id="leaf-{variant.id}" viewBox={variant.viewBox}>
          <path
            d={variant.pathData}
            fill="currentColor"
            stroke="currentColor"
            stroke-width="0.6"
            stroke-linejoin="round"
          />
        </symbol>
      {/each}
    </defs>
  </svg>

  <div class="ground" style:top="{scene.groundY}px"></div>

  {#if wind.activeGust}
    {#each wind.activeGust.particles as particle (particle.id)}
      <div
        class="wind-particle"
        style:left="{particle.x}px"
        style:top="{particle.y}px"
        style:width="{particle.size}px"
        style:height="{particle.size}px"
        style:opacity={particleOpacity(particle)}
      ></div>
    {/each}
  {/if}

  {#each leaves as leaf (leaf.id)}
    <svg
      class="leaf"
      viewBox="0 0 40 48"
      style:left="{leaf.x}px"
      style:top="{leaf.y}px"
      style:width="{leaf.size}px"
      style:color={leaf.color}
      style:transform="translate(-50%, -50%) rotate({leaf.rotation}deg)"
      focusable="false"
    >
      <use href="#leaf-{leaf.variantId}" />
    </svg>
  {/each}
</div>

<style>
  .leaf-scene {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .defs {
    position: absolute;
    width: 0;
    height: 0;
  }

  .ground {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(232, 226, 213, 0) 0%,
      rgba(232, 226, 213, 0.04) 30%,
      rgba(232, 226, 213, 0.04) 70%,
      rgba(232, 226, 213, 0) 100%
    );
    opacity: 0.6;
  }

  .leaf {
    position: absolute;
    display: block;
    will-change: transform, top, left;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
  }

  .wind-particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(232, 226, 213, 0.45);
    transform: translate(-50%, -50%);
    pointer-events: none;
    box-shadow: 0 0 4px rgba(232, 226, 213, 0.2);
  }

  @media (prefers-reduced-motion: reduce) {
    .leaf-scene {
      display: none;
    }
  }
</style>
