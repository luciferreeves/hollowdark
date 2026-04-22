// Client-side setup runs once when the app mounts.
// Later: service worker registration, audio unlock on first gesture,
// persistent-storage request, IndexedDB hydration. Empty for now.

import type { ClientInit } from '@sveltejs/kit'

export const init: ClientInit = async () => {
  // Intentionally empty. Systems attach here as they come online.
}
