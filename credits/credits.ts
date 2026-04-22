/**
 * The kind of third-party resource a credit entry describes. Drives
 * grouping on the Credits screen.
 */
export type CreditKind = 'font' | 'audio' | 'library'

/**
 * One entry on the Credits screen. Add a new `Credit` to `CREDITS` below
 * whenever a new third-party resource lands in the repo, alongside its
 * license file.
 */
export interface Credit {
  readonly title: string
  readonly kind: CreditKind
  readonly author: string
  readonly license: string
  readonly sourceUrl?: string
  readonly note?: string
}

/**
 * The master list of third-party credits. Append a new entry whenever a
 * new resource is added to the repo.
 */
export const CREDITS: readonly Credit[] = [
  {
    title: 'Literata',
    kind: 'font',
    author: 'Type Network',
    license: 'SIL Open Font License 1.1',
    sourceUrl: 'https://fonts.google.com/specimen/Literata'
  },
  {
    title: 'Inter',
    kind: 'font',
    author: 'Rasmus Andersson',
    license: 'SIL Open Font License 1.1',
    sourceUrl: 'https://fonts.google.com/specimen/Inter'
  },
  {
    title: 'Piano Relaxing',
    kind: 'audio',
    author: 'atlasaudio',
    license: 'Pixabay Content License',
    sourceUrl: 'https://pixabay.com/music/ambient-piano-relaxing-510242/',
    note: 'Title screen music.'
  }
]
