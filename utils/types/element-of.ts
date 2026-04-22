/** Element type of a readonly array (e.g., `ElementOf<typeof MONTH_NAMES>`). */
export type ElementOf<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never
