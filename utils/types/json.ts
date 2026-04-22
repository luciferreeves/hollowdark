/** Values that round-trip through JSON.stringify / JSON.parse. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue | undefined }
