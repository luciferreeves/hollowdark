import type { SeededRNG } from '@hollowdark/rng/seeded'
import type { Leaf, SceneDimensions, WindState } from '@hollowdark/lib/leaves/types'

const GRAVITY_PX_PER_S2 = 22
const TERMINAL_VELOCITY_PX_PER_S = 48
const HORIZONTAL_DRAG = 1.4
const SWAY_AMPLITUDE_PX_PER_S = 18
const SETTLED_VX_DAMPING = 3.5
const SETTLED_ROTATION_DAMPING = 3.5
const LEAF_OFFSCREEN_MARGIN = 120

const WIND_MIN_IDLE_MS = 14_000
const WIND_MAX_IDLE_MS = 28_000
const WIND_MIN_DURATION_MS = 3_000
const WIND_MAX_DURATION_MS = 5_000
const WIND_MIN_STRENGTH_PX_PER_S2 = 80
const WIND_MAX_STRENGTH_PX_PER_S2 = 180

/**
 * Construct the first wind state. Time-until-first-gust is picked from
 * the idle range so the scene doesn't immediately gust.
 */
export function initialWindState(rng: SeededRNG): WindState {
  return {
    active: false,
    direction: rng.nextBool(0.5) ? 1 : -1,
    strength: 0,
    remainingMs: 0,
    nextGustInMs: WIND_MIN_IDLE_MS + rng.next() * (WIND_MAX_IDLE_MS - WIND_MIN_IDLE_MS)
  }
}

/**
 * Advance the wind state by `dtMs`. Triggers a new gust when the idle
 * timer expires; ends a gust when its duration runs out.
 */
export function updateWind(wind: WindState, dtMs: number, rng: SeededRNG): WindState {
  if (wind.active) {
    const remaining = wind.remainingMs - dtMs
    if (remaining <= 0) {
      return {
        active: false,
        direction: rng.nextBool(0.5) ? 1 : -1,
        strength: 0,
        remainingMs: 0,
        nextGustInMs: WIND_MIN_IDLE_MS + rng.next() * (WIND_MAX_IDLE_MS - WIND_MIN_IDLE_MS)
      }
    }
    return { ...wind, remainingMs: remaining }
  }

  const nextIdle = wind.nextGustInMs - dtMs
  if (nextIdle <= 0) {
    return {
      active: true,
      direction: rng.nextBool(0.5) ? 1 : -1,
      strength:
        WIND_MIN_STRENGTH_PX_PER_S2 +
        rng.next() * (WIND_MAX_STRENGTH_PX_PER_S2 - WIND_MIN_STRENGTH_PX_PER_S2),
      remainingMs:
        WIND_MIN_DURATION_MS + rng.next() * (WIND_MAX_DURATION_MS - WIND_MIN_DURATION_MS),
      nextGustInMs: 0
    }
  }
  return { ...wind, nextGustInMs: nextIdle }
}

/**
 * Step one leaf forward by `dt` seconds. Applies gravity, horizontal
 * sway, wind, rotation, and ground-settle damping. Returns a new leaf
 * object — never mutates the input.
 */
export function stepLeaf(
  leaf: Leaf,
  dt: number,
  timeS: number,
  wind: WindState,
  scene: SceneDimensions
): Leaf {
  const windAccel = wind.active ? wind.strength * wind.direction : 0
  const swayAccel = leaf.settled
    ? 0
    : SWAY_AMPLITUDE_PX_PER_S *
      leaf.swayFrequency *
      Math.cos(leaf.swayPhase + timeS * leaf.swayFrequency * Math.PI * 2)

  let vx = leaf.vx + (windAccel + swayAccel) * dt
  let vy = leaf.vy

  if (leaf.settled) {
    vx -= vx * Math.min(1, SETTLED_VX_DAMPING * dt)
  } else {
    vx -= vx * Math.min(1, HORIZONTAL_DRAG * dt)
    vy = Math.min(TERMINAL_VELOCITY_PX_PER_S, vy + GRAVITY_PX_PER_S2 * dt)
  }

  const x = leaf.x + vx * dt
  let y = leaf.y + (leaf.settled ? 0 : vy * dt)

  let settled = leaf.settled
  if (!settled && y >= scene.groundY) {
    settled = true
    y = scene.groundY
    vy = 0
  }

  if (settled && wind.active && Math.abs(vx) > 40) {
    settled = false
  }

  let rotationSpeed = leaf.rotationSpeed
  if (leaf.settled) {
    rotationSpeed -= rotationSpeed * Math.min(1, SETTLED_ROTATION_DAMPING * dt)
  }
  const rotation = leaf.rotation + rotationSpeed * dt

  return {
    ...leaf,
    x,
    y,
    vx,
    vy,
    rotation,
    rotationSpeed,
    settled
  }
}

/** Test predicate: true when a leaf has drifted so far off-screen that
 *  it's safe to drop it from the array. */
export function isLeafOffscreen(leaf: Leaf, scene: SceneDimensions): boolean {
  return (
    leaf.x < -LEAF_OFFSCREEN_MARGIN ||
    leaf.x > scene.width + LEAF_OFFSCREEN_MARGIN ||
    leaf.y > scene.height + LEAF_OFFSCREEN_MARGIN
  )
}
