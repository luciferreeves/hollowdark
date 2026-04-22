import type { LeafVariant } from '@hollowdark/lib/leaves/types'

/**
 * Six hand-drawn leaf silhouettes. Each variant is a single path rendered
 * with `currentColor`, so the leaf colour is driven by the element's
 * inline color style rather than baked into the path. All share a
 * 40×48 viewBox for consistent scaling.
 */
export const LEAF_VARIANTS: readonly LeafVariant[] = [
  {
    id: 'oval',
    viewBox: '0 0 40 48',
    pathData:
      'M20 2 C 10 6 6 20 10 36 C 14 44 26 44 30 36 C 34 20 30 6 20 2 Z M20 34 L20 46'
  },
  {
    id: 'willow',
    viewBox: '0 0 40 48',
    pathData:
      'M20 2 C 17 10 17 24 18 36 C 19 42 21 42 22 36 C 23 24 23 10 20 2 Z'
  },
  {
    id: 'wide',
    viewBox: '0 0 40 48',
    pathData:
      'M20 4 C 6 8 4 18 8 28 C 10 36 16 38 20 36 C 24 38 30 36 32 28 C 36 18 34 8 20 4 Z M20 36 L20 44'
  },
  {
    id: 'curled',
    viewBox: '0 0 40 48',
    pathData:
      'M18 4 C 8 10 6 24 14 30 C 22 34 28 30 30 24 C 26 28 20 28 18 24 C 20 18 26 14 30 16 C 26 8 22 4 18 4 Z'
  },
  {
    id: 'round',
    viewBox: '0 0 40 48',
    pathData:
      'M20 8 C 8 10 6 22 10 30 C 14 36 26 36 30 30 C 34 22 32 10 20 8 Z M20 30 L20 42'
  },
  {
    id: 'jagged',
    viewBox: '0 0 40 48',
    pathData:
      'M20 2 L24 10 L32 10 L28 18 L34 24 L26 26 L28 34 L20 30 L12 34 L14 26 L6 24 L12 18 L8 10 L16 10 Z'
  }
]

/** Autumn palette — muted warm tones that sit against the dark background. */
export const LEAF_COLORS: readonly string[] = [
  '#b8884a',
  '#a67035',
  '#6e4923',
  '#8b6a3a',
  '#c4975a',
  '#7a4e22'
]
