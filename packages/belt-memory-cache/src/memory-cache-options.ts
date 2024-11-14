/**
 * Options for the memory cache.
 */
export type MemoryCacheOptions = {
  /**
   * The interval in minutes at which the cache will be cleaned up.
   */
  cleanupIntervalMinutes?: number;

  /**
   * If true, values will be cloned before being stored in the cache.
   * This is more secure, but can be slower and consume more memory.
   *
   * @default true
   */
  cloneValues?: boolean;

  /**
   * Convert the cache key
   */
  convertKey?: (key: string) => string;
};
