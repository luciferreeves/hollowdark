import { HollowdarkUserData } from '@hollowdark/persistence/db'

let userData: HollowdarkUserData | null = null

/**
 * The shared `HollowdarkUserData` Dexie client. Lazily constructed on
 * first access so pure unit tests that never touch persistence do not
 * open an IndexedDB connection. Repositories should import this helper
 * rather than instantiating `HollowdarkUserData` themselves.
 */
export function userDataDb(): HollowdarkUserData {
  if (userData === null) {
    userData = new HollowdarkUserData()
  }
  return userData
}
