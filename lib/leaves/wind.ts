import type { SeededRNG } from '@hollowdark/rng/seeded'
import type {
  Gust,
  GustKind,
  SceneDimensions,
  WindParticle,
  WindSystem
} from '@hollowdark/lib/leaves/types'

const PREVAILING_VX_PX_PER_S = -28
const PREVAILING_VY_PX_PER_S = 8

const NEXT_GUST_MIN_MS = 9_000
const NEXT_GUST_MAX_MS = 22_000

const GUST_KIND_WEIGHTS: readonly (readonly [GustKind, number])[] = [
  ['breeze', 6],
  ['gust', 3],
  ['whirl', 1]
]

const BREEZE_DURATION_MS = [2_400, 4_200] as const
const GUST_DURATION_MS = [3_200, 5_500] as const
const WHIRL_DURATION_MS = [4_500, 7_500] as const

const BREEZE_RADIUS = [70, 140] as const
const GUST_RADIUS = [150, 260] as const
const WHIRL_RADIUS = [90, 170] as const

const BREEZE_STRENGTH = [25, 55] as const
const GUST_STRENGTH = [70, 130] as const
const WHIRL_STRENGTH = [55, 95] as const

/** Construct the initial wind system. Schedules the first gust a few
 *  seconds out so the scene opens on the gentle prevailing wind. */
export function initialWindSystem(rng: SeededRNG): WindSystem {
  return {
    prevailingVx: PREVAILING_VX_PX_PER_S,
    prevailingVy: PREVAILING_VY_PX_PER_S,
    activeGust: null,
    nextGustInMs: 4_000 + rng.next() * 6_000
  }
}

/**
 * Force per unit mass at a given point. Returns the prevailing wind plus,
 * if inside a gust, the gust's contribution with linear radial falloff.
 */
export function windForceAt(
  wind: WindSystem,
  x: number,
  y: number
): { readonly fx: number; readonly fy: number } {
  let fx = wind.prevailingVx
  let fy = wind.prevailingVy

  const g = wind.activeGust
  if (g) {
    const dx = x - g.centerX
    const dy = y - g.centerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < g.radius) {
      const falloff = 1 - dist / g.radius
      if (g.kind === 'whirl') {
        const safe = Math.max(0.001, dist)
        const tx = -dy / safe
        const ty = dx / safe
        fx += tx * g.strength * falloff
        fy += ty * g.strength * falloff
      } else {
        fx += Math.cos(g.direction) * g.strength * falloff
        fy += Math.sin(g.direction) * g.strength * falloff
      }
    }
  }
  return { fx, fy }
}

/** Counter-holder so the caller can issue unique monotonic ids. */
export interface IdSource {
  nextGustId(): number
  nextParticleId(): number
}

/**
 * Step the wind system by `dtMs`. Advances particles inside an active
 * gust, spawns new particles, retires the gust when its duration ends,
 * and schedules the next gust after an idle pause.
 */
export function stepWind(
  wind: WindSystem,
  dtMs: number,
  scene: SceneDimensions,
  rng: SeededRNG,
  ids: IdSource
): WindSystem {
  if (wind.activeGust) {
    const g = wind.activeGust
    const elapsed = g.elapsedMs + dtMs

    if (elapsed >= g.totalDurationMs) {
      return {
        ...wind,
        activeGust: null,
        nextGustInMs: NEXT_GUST_MIN_MS + rng.next() * (NEXT_GUST_MAX_MS - NEXT_GUST_MIN_MS)
      }
    }

    const advanced = advanceParticles(g, dtMs)
    let particles = advanced
    let nextSpawnInMs = g.nextParticleSpawnInMs - dtMs

    if (nextSpawnInMs <= 0) {
      particles = [...advanced, spawnParticle(g, ids.nextParticleId(), rng)]
      nextSpawnInMs = particleSpawnIntervalMs(g.kind)
    }

    return {
      ...wind,
      activeGust: {
        ...g,
        elapsedMs: elapsed,
        particles,
        nextParticleSpawnInMs: nextSpawnInMs
      }
    }
  }

  const remaining = wind.nextGustInMs - dtMs
  if (remaining <= 0) {
    return {
      ...wind,
      activeGust: createGust(ids.nextGustId(), scene, rng),
      nextGustInMs: 0
    }
  }
  return { ...wind, nextGustInMs: remaining }
}

function createGust(id: number, scene: SceneDimensions, rng: SeededRNG): Gust {
  const kind = rng.weightedPick(GUST_KIND_WEIGHTS)
  const centerX = rng.next() * scene.width
  const centerY = scene.height * (0.25 + rng.next() * 0.55)

  let radius: number
  let strength: number
  let duration: number
  let direction: number

  if (kind === 'breeze') {
    radius = BREEZE_RADIUS[0] + rng.next() * (BREEZE_RADIUS[1] - BREEZE_RADIUS[0])
    strength = BREEZE_STRENGTH[0] + rng.next() * (BREEZE_STRENGTH[1] - BREEZE_STRENGTH[0])
    duration = BREEZE_DURATION_MS[0] + rng.next() * (BREEZE_DURATION_MS[1] - BREEZE_DURATION_MS[0])
    direction = Math.PI + (rng.next() - 0.5) * 0.5
  } else if (kind === 'gust') {
    radius = GUST_RADIUS[0] + rng.next() * (GUST_RADIUS[1] - GUST_RADIUS[0])
    strength = GUST_STRENGTH[0] + rng.next() * (GUST_STRENGTH[1] - GUST_STRENGTH[0])
    duration = GUST_DURATION_MS[0] + rng.next() * (GUST_DURATION_MS[1] - GUST_DURATION_MS[0])
    direction = Math.PI + (rng.next() - 0.5) * 0.35
  } else {
    radius = WHIRL_RADIUS[0] + rng.next() * (WHIRL_RADIUS[1] - WHIRL_RADIUS[0])
    strength = WHIRL_STRENGTH[0] + rng.next() * (WHIRL_STRENGTH[1] - WHIRL_STRENGTH[0])
    duration = WHIRL_DURATION_MS[0] + rng.next() * (WHIRL_DURATION_MS[1] - WHIRL_DURATION_MS[0])
    direction = rng.nextBool(0.5) ? 1 : -1
  }

  return {
    id,
    kind,
    centerX,
    centerY,
    radius,
    strength,
    direction,
    elapsedMs: 0,
    totalDurationMs: duration,
    particles: [],
    nextParticleSpawnInMs: 0
  }
}

function particleSpawnIntervalMs(kind: GustKind): number {
  return kind === 'breeze' ? 160 : kind === 'gust' ? 110 : 140
}

function spawnParticle(gust: Gust, id: number, rng: SeededRNG): WindParticle {
  const angle = rng.next() * Math.PI * 2
  const r = rng.next() * gust.radius * 0.9
  const x = gust.centerX + Math.cos(angle) * r
  const y = gust.centerY + Math.sin(angle) * r

  let vx: number
  let vy: number
  if (gust.kind === 'whirl') {
    const safe = Math.max(0.001, r)
    vx = (-Math.sin(angle) * gust.direction * gust.strength) / Math.max(1, safe / 40)
    vy = (Math.cos(angle) * gust.direction * gust.strength) / Math.max(1, safe / 40)
  } else {
    vx = Math.cos(gust.direction) * gust.strength * 0.55
    vy = Math.sin(gust.direction) * gust.strength * 0.55
  }

  return {
    id,
    x,
    y,
    vx,
    vy,
    ageMs: 0,
    lifetimeMs: 800 + rng.next() * 1_200,
    size: 1.2 + rng.next() * 1.6
  }
}

function advanceParticles(gust: Gust, dtMs: number): readonly WindParticle[] {
  const dt = dtMs / 1000
  const out: WindParticle[] = []
  for (const p of gust.particles) {
    const age = p.ageMs + dtMs
    if (age >= p.lifetimeMs) continue

    let vx = p.vx
    let vy = p.vy

    if (gust.kind === 'whirl') {
      const dx = p.x - gust.centerX
      const dy = p.y - gust.centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 0) {
        const safe = Math.max(0.001, dist)
        vx += (-dy / safe) * gust.direction * 45 * dt
        vy += (dx / safe) * gust.direction * 45 * dt
      }
    }

    const drag = Math.pow(0.94, dt * 60)
    vx *= drag
    vy *= drag

    out.push({
      ...p,
      x: p.x + vx * dt,
      y: p.y + vy * dt,
      vx,
      vy,
      ageMs: age
    })
  }
  return out
}

/** Opacity envelope for a particle: fade in the first 20%, hold, fade out
 *  the last 30%. */
export function particleOpacity(p: WindParticle): number {
  const phase = p.ageMs / p.lifetimeMs
  if (phase < 0.2) return phase / 0.2
  if (phase > 0.7) return Math.max(0, (1 - phase) / 0.3)
  return 1
}
