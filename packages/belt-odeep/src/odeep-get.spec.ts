// tslint:disable:no-big-function no-duplicate-string no-identical-functions
import * as assert from 'assert';
import { ODeepGet } from './index';

describe('odeep-get', () => {
  const oDeepGet = new ODeepGet();

  describe('Existing path', () => {
    it('Deep One, undefined', () => {
      const ctx: {
        propOne?: number;
      } = {};

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne']), undefined);
    });

    it('Deep One, 1', () => {
      const ctx: {
        propOne?: number;
      } = {
        propOne: 1,
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne']), 1);
    });

    it('Deep Two, undefined', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {
        propOne: {},
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne', 'propTwo']), undefined);
    });

    it('Deep Two, path undefined', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      try {
        oDeepGet.getValue(ctx, ['propOne', 'propTwo']);
        throw new Error('Must failed');
      } catch (error) {
        assert.ok(error.message.startsWith('Cannot read prop'));
      }
    });

    it('Deep Two, path undefined - shallow', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne', 'propTwo'], { shallowError: true }), undefined);
    });

    it('Deep Two, 1', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {
        propOne: {
          propTwo: 1,
        },
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne', 'propTwo']), 1);
    });

    it('Deep Two - Array', () => {
      const ctx: {
        propOne?: number[];
      } = {
        propOne: [1],
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne', 0]), 1);
    });

    it('Deep Two - Array alt', () => {
      const ctx: {
        propOne?: number[];
      } = {
        propOne: [1, 2],
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne', 1]), 2);
    });

    it('Array get array', () => {
      assert.deepStrictEqual(
        oDeepGet.getValue(
          {
            a: {
              b: {
                c: [1, 2, 3],
              },
            },
          },
          ['a', 'b', 'c']
        ),
        [1, 2, 3]
      );
    });

    it('Array get array indice', () => {
      assert.strictEqual(
        oDeepGet.getValue(
          {
            a: {
              b: {
                c: [1, 2, 3],
              },
            },
          },
          ['a', 'b', 'c', 0]
        ),
        1
      );
    });
  });

  describe('Memoize', () => {
    it('Deep One, 1', () => {
      const ctx = {
        propOne: 1,
        propTwo: 2,
      };

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['propOne'], {
          memoize: true,
        }),
        1
      );

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['propTwo'], {
          memoize: true,
        }),
        2
      );
    });
  });
});
