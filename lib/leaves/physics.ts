import type { Leaf, SceneDimensions, WindSystem } from '@hollowdark/lib/leaves/types'
import { windForceAt } from '@hollowdark/lib/leaves/wind'

const GRAVITY_PX_PER_S2 = 14
const TERMINAL_VY_PX_PER_S = 35
const WIND_FORCE_SCALE = 0.55
const SWAY_AMPLITUDE_PX_PER_S = 16
const HORIZONTAL_DRAG_PER_FRAME = 0.98
const VERTICAL_DRAG_PER_FRAME = 0.995
const SETTLED_HORIZONTAL_DRAG_PER_FRAME = 0.88
const SETTLED_ROT_DAMPING_PER_FRAME = 0.92
const SETTLE_LIFT_THRESHOLD = 30
const OFFSCREEN_MARGIN_PX = 140

/**
 * Step one leaf forward by `dt` seconds. Applies wind-derived acceleration,
 * gravity, drag, and rotation. Ground collision settles the leaf; strong
 * upward force from a nearby gust can lift it again.
 */
export function stepLeaf(
  leaf: Leaf,
  dt: number,
  timeS: number,
  wind: WindSystem,
  scene: SceneDimensions
): Leaf {
  const { fx, fy } = windForceAt(wind, leaf.x, leaf.y)

  const sway = leaf.settled
    ? 0
    : SWAY_AMPLITUDE_PX_PER_S *
      leaf.swayFrequency *
      Math.cos(leaf.swayPhase + timeS * leaf.swayFrequency * Math.PI * 2)

  let vx = leaf.vx + (fx * WIND_FORCE_SCALE + sway) * dt
  let vy = leaf.vy + fy * WIND_FORCE_SCALE * dt

  if (!leaf.settled) {
    vy = Math.min(TERMINAL_VY_PX_PER_S, vy + GRAVITY_PX_PER_S2 * dt)
  }

  const frames = dt * 60
  vx *= Math.pow(HORIZONTAL_DRAG_PER_FRAME, frames)
  vy *= Math.pow(VERTICAL_DRAG_PER_FRAME, frames)

  if (leaf.settled) {
    vx *= Math.pow(SETTLED_HORIZONTAL_DRAG_PER_FRAME, frames)
  }

  const x = leaf.x + vx * dt
  let y = leaf.y + (leaf.settled ? 0 : vy * dt)

  let settled = leaf.settled
  if (!settled && y >= scene.groundY) {
    settled = true
    y = scene.groundY
    vy = Math.min(0, vy)
  }

  if (settled && vy < -SETTLE_LIFT_THRESHOLD) {
    settled = false
  }

  let rotationSpeed = leaf.rotationSpeed
  if (settled) {
    rotationSpeed *= Math.pow(SETTLED_ROT_DAMPING_PER_FRAME, frames)
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

/** A leaf has drifted far enough off-screen to drop from the array. */
export function isLeafOffscreen(leaf: Leaf, scene: SceneDimensions): boolean {
  return (
    leaf.x < -OFFSCREEN_MARGIN_PX ||
    leaf.x > scene.width + OFFSCREEN_MARGIN_PX ||
    leaf.y > scene.height + OFFSCREEN_MARGIN_PX
  )
}
