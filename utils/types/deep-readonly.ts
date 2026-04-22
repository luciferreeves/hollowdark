/** Deep-readonly version of a structural type. */
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends Set<infer U>
      ? ReadonlySet<DeepReadonly<U>>
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T
