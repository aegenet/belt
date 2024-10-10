/**
 * Memory cache
 */
export interface IMemoryCache {
  /**
   * Start periodic cleanup.
   */
  start(): void;

  /**
   * Stop periodic cleanup.
   */
  stop(): void;

  /**
   * Add an item to the cache with an expiration time.
   */
  set<T = unknown>(key: string, value: T, ttlInSeconds: number): void;

  /**
   * Get an item from the cache. Returns undefined if the item is expired.
   */
  get<T = unknown>(key: string): T | undefined;

  /**
   * Check if a key is present in the cache and not expired.
   */
  has(key: string): boolean;

  /**
   * Delete an item from the cache.
   */
  delete(key: string): void;

  /**
   * Clear the cache.
   */
  clear(): void;
}
