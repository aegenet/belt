import type { IMemoryCache } from './i-memory-cache';
import type { MemoryCacheEntry } from './memory-cache-entry';
import type { MemoryCacheOptions } from './memory-cache-options';

/**
 * Memory cache
 */
export class MemoryCache implements IMemoryCache {
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

  constructor(options: MemoryCacheOptions = {}) {
    const { cleanupIntervalMinutes = 5, cloneValues = true } = options;

    this._cache = Object.create(null);
    // interval in milliseconds
    this._cleanupInterval = cleanupIntervalMinutes * 60 * 1000;
    this._cloneValues = cloneValues;
  }

  /**
   * @inheritdoc
   */
  public set<T = unknown>(key: string, value: T, ttlInSeconds: number): void {
    this._cache[key] = {
      value: this._cloneValues ? this._deepCopy<T>(value) : value,
      expiredAt: Date.now() + ttlInSeconds * 1000,
    };
  }

  /**
   * @inheritdoc
   */
  public get<T = unknown>(key: string): T | undefined {
    const cachedItem = this._cache[key];
    if (!cachedItem) {
      return undefined;
    }

    const { value, expiredAt: expirationTime } = cachedItem;

    // If the item is expired, we don't return it
    if (Date.now() > expirationTime) {
      if (!this._gcInterval) {
        // If the garbage collection interval is not set, we can delete the item immediately
        delete this._cache[key];
      }
      return undefined;
    }

    return value as T;
  }

  /**
   * @inheritdoc
   */
  public has(key: string): boolean {
    const cachedItem = this._cache[key];
    if (!cachedItem) {
      return false;
    }

    // If the item is expired, it is no longer considered present
    if (Date.now() > cachedItem.expiredAt) {
      if (!this._gcInterval) {
        // If the garbage collection interval is not set, we can delete the item immediately
        delete this._cache[key];
      }
      return false;
    }

    return true;
  }

  /**
   * @inheritdoc
   */
  public delete(key: string): void {
    if (this._cache[key]) {
      delete this._cache[key];
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
