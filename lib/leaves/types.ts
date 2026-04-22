/**
 * An individual leaf silhouette. `pathData` is the `d` attribute of an
 * `<path>` inside a `<symbol>` with the given viewBox. Rendered at various
 * pixel sizes; the aspect ratio derives from viewBox.
 */
export interface LeafVariant {
  readonly id: string
  readonly viewBox: string
  readonly pathData: string
}

/**
 * One leaf in flight. `x` / `y` are in CSS pixels from the top-left of the
 * scene container. `rotation` is degrees. `swayPhase` offsets the horizontal
 * sway oscillation per leaf so the cloud doesn't drift in sync.
 */
export interface Leaf {
  readonly id: number
  readonly variantId: string
  readonly color: string
  readonly size: number
  readonly x: number
  readonly y: number
  readonly vx: number
  readonly vy: number
  readonly rotation: number
  readonly rotationSpeed: number
  readonly swayPhase: number
  readonly swayFrequency: number
  readonly settled: boolean
}

/** Viewport dimensions and the y-coordinate where leaves settle. */
export interface SceneDimensions {
  readonly width: number
  readonly height: number
  readonly groundY: number
}

/**
 * The three gust flavours the wind system can emit. Each has its own
 * duration, strength, and particle-spawning profile.
 *
 *   breeze  small, slow, gentle, frequent — common idle motion
 *   gust    medium, strong, mostly straight — occasional sweep
 *   whirl   small, circular — rare twirl that spirals around its centre
 */
export type GustKind = 'breeze' | 'gust' | 'whirl'

/**
 * A wisp of visible air inside a gust — a short-lived dot that traces the
 * gust's flow. Rendered as a small semi-transparent circle with opacity
 * computed from `ageMs / lifetimeMs`.
 */
export interface WindParticle {
  readonly id: number
  readonly x: number
  readonly y: number
  readonly vx: number
  readonly vy: number
  readonly ageMs: number
  readonly lifetimeMs: number
  readonly size: number
}

/**
 * A localised wind event. Lives for `totalDurationMs`, during which it
 * applies force to leaves within `radius` of (`centerX`, `centerY`) and
 * spawns `particles` that trace the wind's motion.
 */
export interface Gust {
  readonly id: number
  readonly kind: GustKind
  readonly centerX: number
  readonly centerY: number
  readonly radius: number
  readonly strength: number
  readonly direction: number
  readonly elapsedMs: number
  readonly totalDurationMs: number
  readonly particles: readonly WindParticle[]
  readonly nextParticleSpawnInMs: number
}

/**
 * The overall wind state. A constant horizontal prevailing wind drifts
 * every leaf leftward at a low speed. Gusts are seldom, one at a time,
 * and superimposed on the prevailing flow — they only apply within their
 * own radius.
 */
export interface WindSystem {
  readonly prevailingVx: number
  readonly prevailingVy: number
  readonly activeGust: Gust | null
  readonly nextGustInMs: number
}
