import type { SeededRNG } from '@hollowdark/rng/seeded'
import { LEAF_COLORS, LEAF_VARIANTS } from '@hollowdark/lib/leaves/variants'
import type { Leaf, SceneDimensions } from '@hollowdark/lib/leaves/types'

const MIN_SIZE = 18
const MAX_SIZE = 38
const MIN_ROTATION_SPEED = -40
const MAX_ROTATION_SPEED = 40
const MIN_SWAY_FREQ_HZ = 0.2
const MAX_SWAY_FREQ_HZ = 0.55
const INITIAL_VY_MIN = 8
const INITIAL_VY_MAX = 22

/**
 * Create a fresh leaf at the top of the scene. `id` must be unique across
 * all leaves currently on stage; the caller holds the counter so it can
 * be strictly monotonic.
 */
export function spawnLeaf(id: number, scene: SceneDimensions, rng: SeededRNG): Leaf {
  const variant = rng.pick(LEAF_VARIANTS)
  const color = rng.pick(LEAF_COLORS)
  const size = MIN_SIZE + rng.next() * (MAX_SIZE - MIN_SIZE)
  const x = rng.next() * scene.width
  const y = -size - rng.next() * 40
  const vy = INITIAL_VY_MIN + rng.next() * (INITIAL_VY_MAX - INITIAL_VY_MIN)
  const rotation = rng.next() * 360
  const rotationSpeed =
    MIN_ROTATION_SPEED + rng.next() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED)
  const swayFrequency =
    MIN_SWAY_FREQ_HZ + rng.next() * (MAX_SWAY_FREQ_HZ - MIN_SWAY_FREQ_HZ)
  const swayPhase = rng.next() * Math.PI * 2

  return {
    id,
    variantId: variant.id,
    color,
    size,
    x,
    y,
    vx: 0,
    vy,
    rotation,
    rotationSpeed,
    swayPhase,
    swayFrequency,
    settled: false
  }
}
