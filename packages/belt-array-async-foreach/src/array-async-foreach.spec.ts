import * as assert from 'node:assert';
import { arrayAsyncForEach } from './index';

describe('asyncForEach', function () {
  describe('bad way', () => {
    it('null array', async () => {
      let i = 0;
      assert.doesNotReject(async () => {
        await arrayAsyncForEach(null as any, f => {
          i++;
        });
      });
      assert.strictEqual(i, 0);
    });
    it('undefined array', async () => {
      let i = 0;
      assert.doesNotReject(async () => {
        await arrayAsyncForEach(undefined as any, f => {
          i++;
        });
      });
      assert.strictEqual(i, 0);
    });
    it('empty array', async () => {
      let i = 0;
      assert.doesNotReject(async () => {
        await arrayAsyncForEach([], f => {
          i++;
        });
      });
      assert.strictEqual(i, 0);
    });
  });

  describe('without promise', () => {
    it('do something', async () => {
      let i = 0;
      const entries = [
        {
          id: 5,
          value: 'Yo',
        },
      ];
      await arrayAsyncForEach(entries, (value, index, array) => {
        i++;
        assert.strictEqual(value.id, 5);
        assert.strictEqual(value.value, 'Yo');
        assert.strictEqual(index, 0);
        assert.strictEqual(array, entries);
      });
      assert.strictEqual(i, 1);
    });
  });

  describe('promise', () => {
    it('do something', async () => {
      let i = 0;
      const entries = [
        {
          id: 5,
          value: 'Yo',
        },
      ];
      await arrayAsyncForEach(entries, async (value, index, array) => {
        i++;
        assert.strictEqual(value.id, 5);
        assert.strictEqual(value.value, 'Yo');
        assert.strictEqual(index, 0);
        assert.strictEqual(array, entries);
        await Promise.resolve();
      });
      assert.strictEqual(i, 1);
    });
  });
});
