import { getPerson } from '@hollowdark/persistence/people'
import { getCurrentWorld } from '@hollowdark/persistence/worlds'

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
 * Inspect device-local state and decide which Begin variant to show. Reads
 * the single world record (design invariant) and, when a current player
 * character is set, reads their name for the continue prompt.
 */
export async function detectBeginState(): Promise<BeginState> {
  const world = await getCurrentWorld()
  if (world === null) return { kind: 'first-ever' }

  const activeId = world.currentPlayerCharacterId
  if (activeId === null) return { kind: 'returning-no-active' }

  const active = await getPerson(activeId)
  if (active === null) return { kind: 'returning-no-active' }

  return { kind: 'returning-active', characterName: displayName(active.name) }
}

function displayName(name: { given: string; preferredName: string | null }): string {
  return name.preferredName ?? name.given
}
