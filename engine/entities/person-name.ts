/**
 * A character's name as tracked by the simulation. Surnames follow
 * inheritance rules per region/era (docs/19-names.md) — including keep-
 * maiden, hyphenate, matrilineal, and ad-hoc changes — so the structure
 * preserves both the current surname and the maiden form when relevant.
 */
export interface PersonName {
  readonly given: string
  readonly middle: string | null
  readonly surname: string
  readonly maidenSurname: string | null
  readonly nicknames: readonly string[]
  readonly preferredName: string | null
}
