import { userDataDb } from '@hollowdark/persistence/client'
import type { PersonId } from '@hollowdark/engine/entities/base'
import type { Person } from '@hollowdark/engine/entities/person'

/** Fetch a single person by id, or `null` when the row is missing. */
export async function getPerson(id: PersonId): Promise<Person | null> {
  const row = await userDataDb().people.get(id)
  return row ?? null
}

/** Persist a person record. Replaces any existing row with the same id. */
export async function savePerson(person: Person): Promise<void> {
  await userDataDb().people.put(person)
}
