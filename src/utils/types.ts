export type Expand<T> = T extends unknown
  ? { [K in keyof T]: Expand<T[K]> }
  : never;
