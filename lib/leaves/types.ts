/**
 * An individual leaf silhouette. `pathData` is the `d` attribute of an
 * `<path>` inside a `<symbol>` with the given viewBox. Rendered at various
 * pixel sizes with `width`; the aspect ratio derives from viewBox.
 */
export interface LeafVariant {
  readonly id: string
  readonly viewBox: string
  readonly pathData: string
}

/**
 * One leaf in flight. `x` / `y` are in CSS pixels from the top-left of the
 * scene container. `rotation` is degrees. `swayPhase` is the phase offset
 * for the horizontal sway oscillation — different per leaf so the cloud
 * doesn't drift in sync.
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

/**
 * Periodic horizontal wind gusts that sweep across the scene. Direction
 * is -1 (rightward blown leftwards, odd convention — here we use +1 for
 * rightward, -1 for leftward). `remainingMs` counts down while a gust is
 * active. `nextGustInMs` counts down between gusts.
 */
export interface WindState {
  readonly active: boolean
  readonly direction: 1 | -1
  readonly strength: number
  readonly remainingMs: number
  readonly nextGustInMs: number
}

/** Viewport dimensions and the y-coordinate where leaves settle. */
export interface SceneDimensions {
  readonly width: number
  readonly height: number
  readonly groundY: number
}
