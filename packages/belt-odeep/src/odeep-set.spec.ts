/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { ODeepSet } from './index';

describe('odeep-set', () => {
  const oDeepSet = new ODeepSet();

  describe('Existing path', () => {
    it('Deep One - string[] path', () => {
      const ctx: {
        propOne?: number;
      } = {};

      oDeepSet.setValue(ctx, ['propOne'], 1);
      assert.strictEqual(ctx.propOne, 1);
    });

    it('Deep One - object[] path', () => {
      const ctx: {
        propOne?: number;
      } = {};

      oDeepSet.setValue(ctx, [{ propName: 'propOne', type: 'object' }], 1);
      assert.strictEqual(ctx.propOne, 1);
    });

    it('Deep One - Null context', () => {
      const ctx: {
        propOne?: number;
      } = null as any;

      oDeepSet.setValue(ctx, [{ propName: 'propOne', type: 'object' }], 1);
      assert.strictEqual(ctx, null);
    });

    it('Deep One - Null path', () => {
      const ctx: {
        propOne?: number;
      } = {};

      oDeepSet.setValue(ctx, null as any, 1);
      assert.strictEqual(ctx.propOne, undefined);
    });

    it('Deep Two', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {
        propOne: {},
      };

      oDeepSet.setValue(ctx, ['propOne', 'propTwo'], 1);
      assert.strictEqual(ctx.propOne!.propTwo, 1);
    });

    it('Deep Two, skip #', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {
        propOne: {},
      };

      oDeepSet.setValue(ctx, ['#', 'propOne', 'propTwo'], 1);
      assert.strictEqual(ctx.propOne!.propTwo, 1);
    });

    it('Deep Two - propOne is null', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      try {
        oDeepSet.setValue(ctx, ['propOne', 'propTwo'], 1);
        throw new Error('Must failed.');
      } catch (error) {
        assert.ok((error as Error).message.startsWith('Cannot set proper'));
      }
    });

    it('Deep Two - Array', () => {
      const ctx: {
        propOne?: number[];
      } = {
        propOne: [],
      };

      oDeepSet.setValue(ctx, ['propOne', { propName: '0', type: 'indice' }], 1);
      assert.strictEqual(ctx.propOne![0], 1);
    });

    it('Deep Two - Array alt', () => {
      const ctx: {
        propOne?: number[];
      } = {
        propOne: [],
      };

      oDeepSet.setValue(ctx, ['propOne', 0], 1);
      assert.strictEqual(ctx.propOne![0], 1);
    });

    it('Deep Two - Array 1', () => {
      const ctx: {
        propOne?: number[];
      } = {
        propOne: [],
      };

      oDeepSet.setValue(ctx, ['propOne', { propName: '1', type: 'indice' }], 1);
      assert.strictEqual(ctx.propOne![1], 1);
    });

    it('Deep Two - Array 1 alt', () => {
      const ctx: {
        propOne?: number[];
      } = {
        propOne: [],
      };

      oDeepSet.setValue(ctx, ['propOne', 1], 1);
      assert.strictEqual(ctx.propOne![1], 1);
    });
  });

  describe('Create null object', () => {
    it('Deep Two', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      oDeepSet.setValue(ctx, ['propOne', 'propTwo'], 1, { autoCreate: true });
      assert.strictEqual(ctx.propOne!.propTwo, 1);
    });

    it('Deep Two, skip #', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      oDeepSet.setValue(ctx, ['#', 'propOne', 'propTwo'], 1, { autoCreate: true });
      assert.strictEqual(ctx.propOne!.propTwo, 1);
    });

    it('Deep Two - Array', () => {
      const ctx: {
        propOne?: number[];
      } = {};

      oDeepSet.setValue(ctx, ['propOne', { propName: '0', type: 'indice' }], 1, { autoCreate: true });
      assert.strictEqual(ctx.propOne![0], 1);
    });

    it('Deep Two - Array 1', () => {
      const ctx: {
        propOne?: number[];
      } = {};

      oDeepSet.setValue(ctx, ['propOne', { propName: '1', type: 'indice' }], 1, { autoCreate: true });
      assert.strictEqual(ctx.propOne![1], 1);
    });

    it('Deep Two - Array - alt', () => {
      const ctx: {
        propOne?: number[];
      } = {};

      oDeepSet.setValue(ctx, ['propOne', 0], 1, { autoCreate: true });
      assert.strictEqual(ctx.propOne![0], 1);
    });

    it('Deep Two - Array 1 - alt', () => {
      const ctx: {
        propOne?: number[];
      } = {};

      oDeepSet.setValue(ctx, ['propOne', 1], 1, { autoCreate: true });
      assert.strictEqual(ctx.propOne![1], 1);
    });
  });

  describe('Memoize', () => {
    it('Deep One - string[] path', () => {
      const ctx: {
        propOne?: number;
      } = {};

      oDeepSet.setValue(ctx, ['propOne'], 1, {
        memoize: true,
      });
      assert.strictEqual(ctx.propOne, 1);

      oDeepSet.setValue(ctx, ['propOne'], 2, {
        memoize: true,
      });
      assert.strictEqual(ctx.propOne, 2);

      oDeepSet.clear();
    });

    it('Deep One - object[] path', () => {
      const ctx: {
        propOne?: number;
      } = {};

      oDeepSet.setValue(ctx, [{ propName: 'propOne', type: 'object' }], 1, {
        memoize: true,
      });
      assert.strictEqual(ctx.propOne, 1);

      oDeepSet.setValue(ctx, [{ propName: 'propOne', type: 'object' }], 2, {
        memoize: true,
      });
      assert.strictEqual(ctx.propOne, 2);

      oDeepSet.clear();
    });
  });
});
