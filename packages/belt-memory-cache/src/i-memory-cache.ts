/**
 * Memory cache
 */
export interface IMemoryCache<KeyType = string> {
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
  set<T = unknown>(key: KeyType, value: T, ttlInSeconds: number): void;

  /**
   * Get an item from the cache. Returns undefined if the item is expired.
   */
  get<T = unknown>(key: KeyType): T | undefined;

  /**
   * Check if a key is present in the cache and not expired.
   */
  has(key: KeyType): boolean;

  /**
   * Delete an item from the cache.
   */
  delete(key: KeyType): void;

  /**
   * Clear the cache.
   */
  clear(): void;
}
