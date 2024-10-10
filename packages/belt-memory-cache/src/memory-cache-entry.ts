/**
 * Memory cache entry.
 */
export type MemoryCacheEntry<T = unknown> = {
  value: T;
  expiredAt: number;
};
