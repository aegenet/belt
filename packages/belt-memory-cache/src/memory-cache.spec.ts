/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { MemoryCache, type MemoryCacheOptions } from './index';
import { setTimeout } from 'node:timers/promises';
import { createHash } from 'node:crypto';

describe('memory-cache', function () {
  (
    [
      { title: 'Default options', options: {} },
      {
        title: 'With convertKey',
        options: {
          convertKey: (key: string) => createHash('sha256').update(key).digest('hex'),
        },
      },
    ] as Array<{ options: MemoryCacheOptions; title: string }>
  ).forEach(config => {
    describe('Options ' + config.title, function () {
      it('should set and get values', function () {
        const cache = new MemoryCache(config.options);
        cache.set('key', 'value', 1);
        assert.strictEqual(cache.get('key'), 'value');
      });

      it('expired -> should set and get undefined', async () => {
        const cache = new MemoryCache(config.options);
        cache.set('key', 'value', 1);
        await setTimeout(1000);
        assert.strictEqual(cache.get('key'), undefined);
      });

      it('set, delete & get values', function () {
        const cache = new MemoryCache(config.options);
        cache.set('key', 'value', 1);
        cache.delete('key');
        assert.strictEqual(cache.get('key'), undefined);
      });

      it('set, multiple delete & get values', function () {
        const cache = new MemoryCache(config.options);
        cache.set('key', 'value', 1);
        cache.delete('key');
        cache.delete('key');
        cache.delete('key');
        assert.strictEqual(cache.get('key'), undefined);
      });

      it('set, has, multiple delete & has', function () {
        const cache = new MemoryCache(config.options);
        cache.set('key', 'value', 1);
        assert.strictEqual(cache.has('key'), true);
        cache.delete('key');
        assert.strictEqual(cache.has('key'), false);
      });

      it('set, has, expired, has', async () => {
        const cache = new MemoryCache(config.options);
        cache.set('key', 'value', 1);
        assert.strictEqual(cache.has('key'), true);
        await setTimeout(1000);
        assert.strictEqual(cache.has('key'), false);
      });

      it('garbage collection', async () => {
        const cache = new MemoryCache({
          ...config.options,
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
  });

  it('Get object id -> key', async () => {
    const something = { id: 'key' };
    const cache = new MemoryCache<{
      id: string;
    }>({
      convertKey: (key: { id: string }) => key.id,
    });
    cache.set(something, 'value', 1);
    assert.strictEqual(cache.has(something), true);
    await setTimeout(1000);
    assert.strictEqual(cache.has(something), false);
  });

  it('Get object without id -> key', async () => {
    const something = { something: 'key', else: 'other' };
    const somethingElse = { something: 'key2', else: 'other2' };
    const cache = new MemoryCache<Record<string, unknown>>({
      convertKey: (key: Record<string, unknown>) => createHash('sha256').update(JSON.stringify(key)).digest('hex'),
    });
    cache.set(something, 'value', 1);
    assert.strictEqual(cache.has(something), true);
    assert.strictEqual(cache.has(somethingElse), false);
    await setTimeout(1000);
    assert.strictEqual(cache.has(something), false);
  });
});
