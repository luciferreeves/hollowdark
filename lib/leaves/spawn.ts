import type { SeededRNG } from '@hollowdark/rng/seeded'
import { LEAF_COLORS, LEAF_VARIANTS } from '@hollowdark/lib/leaves/variants'
import type { Leaf, SceneDimensions } from '@hollowdark/lib/leaves/types'

const MIN_SIZE = 18
const MAX_SIZE = 36
const MIN_ROT_SPEED = -35
const MAX_ROT_SPEED = 35
const MIN_SWAY_FREQ_HZ = 0.18
const MAX_SWAY_FREQ_HZ = 0.5
const FROM_RIGHT_PROBABILITY = 0.72

/**
 * Create a fresh leaf entering the scene from the upwind edge. With
 * `FROM_RIGHT_PROBABILITY`, leaves spawn off the right side at a random y
 * above the ground; the rest drop in from above at a random x. This
 * matches a horizontal-wind feel rather than vertical snowfall.
 */
export function spawnLeaf(id: number, scene: SceneDimensions, rng: SeededRNG): Leaf {
  const variant = rng.pick(LEAF_VARIANTS)
  const color = rng.pick(LEAF_COLORS)
  const size = MIN_SIZE + rng.next() * (MAX_SIZE - MIN_SIZE)
  const fromRight = rng.nextBool(FROM_RIGHT_PROBABILITY)

  let x: number
  let y: number
  let vx: number
  let vy: number

  if (fromRight) {
    x = scene.width + size
    y = rng.next() * scene.groundY * 0.88
    vx = -18 - rng.next() * 12
    vy = 2 + rng.next() * 8
  } else {
    x = rng.next() * scene.width
    y = -size - rng.next() * 40
    vx = -4 + rng.next() * 4
    vy = 12 + rng.next() * 10
  }

  return {
    id,
    variantId: variant.id,
    color,
    size,
    x,
    y,
    vx,
    vy,
    rotation: rng.next() * 360,
    rotationSpeed: MIN_ROT_SPEED + rng.next() * (MAX_ROT_SPEED - MIN_ROT_SPEED),
    swayPhase: rng.next() * Math.PI * 2,
    swayFrequency: MIN_SWAY_FREQ_HZ + rng.next() * (MAX_SWAY_FREQ_HZ - MIN_SWAY_FREQ_HZ),
    settled: false
  }
}
