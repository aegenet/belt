/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { MemoryCache } from './index';
import { setTimeout } from 'node:timers/promises';

describe('memory-cache', function () {
  it('should set and get values', function () {
    const cache = new MemoryCache();
    cache.set('key', 'value', 1);
    assert.strictEqual(cache.get('key'), 'value');
  });

  it('expired -> should set and get undefined', async () => {
    const cache = new MemoryCache();
    cache.set('key', 'value', 1);
    await setTimeout(1000);
    assert.strictEqual(cache.get('key'), undefined);
  });

  it('set, delete & get values', function () {
    const cache = new MemoryCache();
    cache.set('key', 'value', 1);
    cache.delete('key');
    assert.strictEqual(cache.get('key'), undefined);
  });

  it('set, multiple delete & get values', function () {
    const cache = new MemoryCache();
    cache.set('key', 'value', 1);
    cache.delete('key');
    cache.delete('key');
    cache.delete('key');
    assert.strictEqual(cache.get('key'), undefined);
  });

  it('set, has, multiple delete & has', function () {
    const cache = new MemoryCache();
    cache.set('key', 'value', 1);
    assert.strictEqual(cache.has('key'), true);
    cache.delete('key');
    assert.strictEqual(cache.has('key'), false);
  });

  it('set, has, expired, has', async () => {
    const cache = new MemoryCache();
    cache.set('key', 'value', 1);
    assert.strictEqual(cache.has('key'), true);
    await setTimeout(1000);
    assert.strictEqual(cache.has('key'), false);
  });

  it('garbage collection', async () => {
    const cache = new MemoryCache({
      cleanupIntervalMinutes: 0.01,
    });
    try {
      cache.start();
      for (let i = 0; i < 100; i++) {
        cache.set('key' + i, 'value', 2);
      }
      for (let i = 0; i < 100; i++) {
        assert.strictEqual(cache.has('key' + i), true);
      }
      await setTimeout(2000);
      for (let i = 0; i < 100; i++) {
        assert.strictEqual(cache.has('key' + i), false);
      }
    } finally {
      cache.stop();
    }
  });
});
