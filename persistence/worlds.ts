import { userDataDb } from '@hollowdark/persistence/client'
import type { World } from '@hollowdark/engine/entities/world'

/**
 * The single world a player has on this device, or `null` if they have
 * never begun one. Design invariant: one continuous world per player.
 * Should the table ever hold more than one row, the earliest-created
 * row wins — newer rows would only arise from explicit import.
 */
export async function getCurrentWorld(): Promise<World | null> {
  const rows = await userDataDb().worlds.toArray()
  if (rows.length === 0) return null
  return rows.reduce((earliest, candidate) =>
    candidate.createdAt < earliest.createdAt ? candidate : earliest
  )
}

/** Persist a world record. Replaces any existing row with the same id. */
export async function saveWorld(world: World): Promise<void> {
  await userDataDb().worlds.put(world)
}
