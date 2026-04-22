/**
 * Player-controlled simulation speed. Only three states ever exist
 * (docs/05-time-system.md): time is stopped, running at reading pace,
 * or running fast with compressed flow.
 *
 * Scenes auto-set the effective speed to 'paused'; the intended speed is
 * preserved so the simulation returns to it when the scene resolves.
 */
export type Speed = 'paused' | 'play' | 'fast'

export const SPEEDS: readonly Speed[] = ['paused', 'play', 'fast']
