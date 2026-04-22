/**
 * The three states the Begin screen can render.
 *
 *   `first-ever`            no world exists on device yet. Only option is
 *                           to begin (create the first world + character).
 *   `returning-active`      a world exists with a currently-active player
 *                           character. Primary option is to continue them.
 *   `returning-no-active`   a world exists but the current character has
 *                           died (or been ended) without a successor yet.
 *                           Primary option is to pick a successor via the
 *                           continuation flow.
 */
export type BeginState =
  | { readonly kind: 'first-ever' }
  | { readonly kind: 'returning-active'; readonly characterName: string }
  | { readonly kind: 'returning-no-active' }

/**
 * Inspect device-local state and decide which Begin variant to show. The
 * real implementation queries IndexedDB for worlds and the currently
 * active player character; while persistence is still being wired up this
 * returns `first-ever` unconditionally.
 */
export async function detectBeginState(): Promise<BeginState> {
  return { kind: 'first-ever' }
}
