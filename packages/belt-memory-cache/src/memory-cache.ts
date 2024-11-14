import type { IMemoryCache } from './i-memory-cache';
import type { MemoryCacheEntry } from './memory-cache-entry';
import type { MemoryCacheOptions } from './memory-cache-options';

/**
 * Memory cache
 */
export class MemoryCache<KeyType = string> implements IMemoryCache<KeyType> {
  /**
   * Cache object
   */
  private _cache: { [key: string]: MemoryCacheEntry<unknown> };
  /**
   * Interval in milliseconds at which the cache will be cleaned up
   */
  private readonly _cleanupInterval: number;
  /**
   * Clone values before storing them in the cache
   */
  private readonly _cloneValues: boolean;
  /**
   * Garbage collection interval
   */
  private _gcInterval?: unknown;
  /**
   * Convert the cache key
   */
  private _convertKey: ((key: KeyType) => string) | undefined;

  constructor(options: MemoryCacheOptions<KeyType> = {}) {
    const { cleanupIntervalMinutes = 5, cloneValues = true } = options;
    this._convertKey = options.convertKey;

    this._cache = Object.create(null);
    // interval in milliseconds
    this._cleanupInterval = cleanupIntervalMinutes * 60 * 1000;
    this._cloneValues = cloneValues;
  }

  /**
   * @inheritdoc
   */
  public set<T = unknown>(key: KeyType, value: T, ttlInSeconds: number): void {
    this._cache[this._convertKey ? this._convertKey(key) : <string>key] = {
      value: this._cloneValues ? this._deepCopy<T>(value) : value,
      expiredAt: Date.now() + ttlInSeconds * 1000,
    };
  }

  /**
   * @inheritdoc
   */
  public get<T = unknown>(key: KeyType): T | undefined {
    const formattedKey = this._convertKey ? this._convertKey(key) : <string>key;
    const cachedItem = this._cache[formattedKey];
    if (!cachedItem) {
      return undefined;
    }

    const { value, expiredAt: expirationTime } = cachedItem;

    // If the item is expired, we don't return it
    if (Date.now() > expirationTime) {
      if (!this._gcInterval) {
        // If the garbage collection interval is not set, we can delete the item immediately
        delete this._cache[formattedKey];
      }
      return undefined;
    }

    return value as T;
  }

  /**
   * @inheritdoc
   */
  public has(key: KeyType): boolean {
    const formattedKey = this._convertKey ? this._convertKey(key) : <string>key;
    const cachedItem = this._cache[formattedKey];
    if (!cachedItem) {
      return false;
    }

    // If the item is expired, it is no longer considered present
    if (Date.now() > cachedItem.expiredAt) {
      if (!this._gcInterval) {
        // If the garbage collection interval is not set, we can delete the item immediately
        delete this._cache[formattedKey];
      }
      return false;
    }

    return true;
  }

  /**
   * @inheritdoc
   */
  public delete(key: KeyType): void {
    const formattedKey = this._convertKey ? this._convertKey(key) : <string>key;
    if (this._cache[formattedKey]) {
      delete this._cache[formattedKey];
    }
  }

  /**
   * @inheritdoc
   */
  public clear(): void {
    this._cache = Object.create(null);
  }

  /**
   * @inheritdoc
   */
  public start(): void {
    if (!this._gcInterval) {
      this._gcInterval = setInterval(() => this._cleanup(), this._cleanupInterval);
    }
  }

  /**
   * @inheritdoc
   */
  public stop(): void {
    if (this._gcInterval) {
      clearInterval(this._gcInterval as any);
      this._gcInterval = undefined;
    }
  }

  /**
   * Clean up expired items.
   */
  private _cleanup(): void {
    const now = Date.now();
    for (const key in this._cache) {
      if (this._cache[key].expiredAt <= now) {
        delete this._cache[key];
      }
    }
  }

  /**
   * Default deep copy function.
   */
  private _deepCopy<T = unknown>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
