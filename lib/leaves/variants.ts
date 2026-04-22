import type { LeafVariant } from '@hollowdark/lib/leaves/types'

/**
 * Six recognisable leaf silhouettes sharing a 40×48 viewBox. Each path
 * includes both the leaf body and a stem line so it reads as a leaf at
 * small render sizes. Rendered with `currentColor` so the leaf's tint is
 * set by the host element's inline color style.
 */
export const LEAF_VARIANTS: readonly LeafVariant[] = [
  {
    id: 'maple',
    viewBox: '0 0 40 48',
    pathData:
      'M 20 3 L 22 13 L 30 11 L 26 19 L 34 22 L 26 24 L 30 33 L 22 29 L 20 40 L 18 29 L 10 33 L 14 24 L 6 22 L 14 19 L 10 11 L 18 13 Z M 20 40 L 20 47'
  },
  {
    id: 'oak',
    viewBox: '0 0 40 48',
    pathData:
      'M 20 3 C 17 4 14 6 12 9 C 10 8 7 8 7 11 C 7 14 10 15 12 14 C 10 16 7 18 7 22 C 8 24 11 23 13 21 C 12 24 11 28 14 30 C 16 29 18 26 18 23 C 19 27 20 34 20 40 C 20 34 21 27 22 23 C 22 26 24 29 26 30 C 29 28 28 24 27 21 C 29 23 32 24 33 22 C 33 18 30 16 28 14 C 30 15 33 14 33 11 C 33 8 30 8 28 9 C 26 6 23 4 20 3 Z M 20 35 L 20 47'
  },
  {
    id: 'birch',
    viewBox: '0 0 40 48',
    pathData:
      'M 20 3 C 12 6 8 14 8 22 C 8 32 14 40 20 43 C 26 40 32 32 32 22 C 32 14 28 6 20 3 Z M 20 10 L 20 47'
  },
  {
    id: 'aspen',
    viewBox: '0 0 40 48',
    pathData:
      'M 20 5 C 27 6 34 12 32 22 C 30 30 24 36 20 40 C 16 36 10 30 8 22 C 6 12 13 6 20 5 Z M 20 12 L 20 46'
  },
  {
    id: 'willow',
    viewBox: '0 0 40 48',
    pathData:
      'M 20 2 C 17 10 16 22 17 34 C 18 42 22 42 23 34 C 24 22 23 10 20 2 Z M 20 10 L 20 47'
  },
  {
    id: 'linden',
    viewBox: '0 0 40 48',
    pathData:
      'M 20 3 C 13 5 7 12 8 22 C 9 30 14 38 20 46 C 26 38 31 30 32 22 C 33 12 27 5 20 3 Z M 20 14 L 20 45'
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
