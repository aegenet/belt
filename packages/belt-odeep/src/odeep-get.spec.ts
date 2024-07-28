// tslint:disable:no-big-function no-duplicate-string no-identical-functions
/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { ODeepGet } from './index';

describe('odeep-get', () => {
  const oDeepGet = new ODeepGet();

  describe('Safer', () => {
    it('Invalid path', () => {
      const ctx: {
        propOne?: number;
      } = {};

      try {
        new ODeepGet().getValue(ctx, [' && '], {
          memoize: true,
          shallowError: false,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, "Unexpected token '&&'");
      }

      try {
        new ODeepGet().getValue(ctx, [' && '], {
          safer: true,
          memoize: true,
          shallowError: false,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path ( && ) seems invalid');
      }

      try {
        new ODeepGet().getValue(
          {
            first: [{}, {}],
          },
          ['first', 'toString'],
          {
            safer: true,
            memoize: true,
            shallowError: false,
          }
        );
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (first.toString) seems invalid');
      }

      assert.strictEqual(
        new ODeepGet().getValue(ctx, [' && '], {
          memoize: true,
          safer: true,
          shallowError: true,
        }),
        undefined
      );

      assert.strictEqual(
        new ODeepGet().getValue(ctx, [' && '], {
          memoize: true,
          safer: true,
          shallowError: true,
        }),
        undefined
      );

      assert.strictEqual(
        new ODeepGet().getValue(ctx, [' && '], {
          shallowError: true,
        }),
        undefined
      );

      assert.strictEqual(
        new ODeepGet().getValue(ctx, [' && '], {
          safer: true,
          shallowError: true,
        }),
        undefined
      );

      try {
        new ODeepGet().getValue(ctx, [' && '], {
          safer: true,
          shallowError: false,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path ( && ) seems invalid');
      }
    });

    it('No access toString', () => {
      const ctx: {
        propOne?: number;
      } = {};

      assert.ok(oDeepGet.getValue(ctx, ['toString']));
      assert.ok(
        !oDeepGet.getValue(ctx, ['toString'], {
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['toString'], {
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (toString) seems invalid');
      }
    });

    it('No access toString deeper', () => {
      const ctx = {
        propOne: {
          propTwo: {
            propThree: {
              something: 'else',
            },
          },
        },
      };

      // Lvl 0
      assert.ok(
        new ODeepGet().getValue(ctx, ['toString'], {
          memoize: false,
        })
      );
      assert.ok(
        !new ODeepGet().getValue(ctx, ['toString'], {
          memoize: false,
          safer: true,
          shallowError: true,
        })
      );

      assert.ok(
        !new ODeepGet().getValue(ctx, ['#', 'toString'], {
          memoize: false,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['toString'], {
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (toString) seems invalid');
      }

      try {
        new ODeepGet().getValue(ctx, ['#', 'toString'], {
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne'], {
          memoize: false,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne'], {
          memoize: false,
          safer: true,
        })
      );

      // Lvl 1
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'toString'], {
          memoize: false,
        })
      );
      assert.ok(
        !new ODeepGet().getValue(ctx, ['propOne', 'toString'], {
          memoize: false,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['toString'], {
          memoize: false,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo'], {
          memoize: false,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo'], {
          memoize: false,
          safer: true,
        })
      );

      // Lvl 2
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'toString'], {
          memoize: false,
        })
      );
      assert.ok(
        !new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'toString'], {
          memoize: false,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'toString'], {
          memoize: false,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (propOne.propTwo.toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'propThree'], {
          memoize: false,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'propThree'], {
          memoize: false,
          safer: true,
        })
      );
    });

    it('Memoize No access toString', () => {
      const ctx: {
        propOne?: number;
      } = {
        propOne: 1,
      };

      assert.ok(
        new ODeepGet().getValue(ctx, ['toString'], {
          memoize: true,
        })
      );

      assert.ok(
        !new ODeepGet().getValue(ctx, ['toString'], {
          memoize: true,
          safer: true,
          shallowError: true,
        })
      );

      assert.ok(
        !new ODeepGet().getValue(ctx, ['#', 'toString'], {
          memoize: true,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['toString'], {
          memoize: true,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (toString) seems invalid');
      }

      try {
        new ODeepGet().getValue(ctx, ['#', 'toString'], {
          memoize: true,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (#.toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne'], {
          memoize: true,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne'], {
          memoize: true,
          safer: true,
        })
      );
    });

    it('Memoize No access toString deeper', () => {
      const ctx = {
        propOne: {
          propTwo: {
            propThree: {
              something: 'else',
            },
          },
        },
      };

      // Lvl 0
      assert.ok(
        new ODeepGet().getValue(ctx, ['toString'], {
          memoize: true,
        })
      );

      assert.ok(
        !new ODeepGet().getValue(ctx, ['toString'], {
          memoize: true,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['toString'], {
          memoize: true,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne'], {
          memoize: true,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne'], {
          memoize: true,
          safer: true,
        })
      );

      // Lvl 1
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'toString'], {
          memoize: true,
        })
      );
      assert.ok(
        !new ODeepGet().getValue(ctx, ['propOne', 'toString'], {
          memoize: true,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['propOne', 'toString'], {
          memoize: true,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (propOne.toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo'], {
          memoize: true,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo'], {
          memoize: true,
          safer: true,
        })
      );

      // Lvl 2
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'toString'], {
          memoize: true,
        })
      );
      assert.ok(
        !new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'toString'], {
          memoize: true,
          safer: true,
          shallowError: true,
        })
      );

      try {
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'toString'], {
          memoize: true,
          safer: true,
        });
        throw new Error('Must fail');
      } catch (error: any) {
        assert.strictEqual(error.message, 'The property path (propOne.propTwo.toString) seems invalid');
      }

      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'propThree'], {
          memoize: true,
        })
      );
      assert.ok(
        new ODeepGet().getValue(ctx, ['propOne', 'propTwo', 'propThree'], {
          memoize: true,
          safer: true,
        })
      );
    });
  });

  describe('Existing path', () => {
    it('Deep One, undefined', () => {
      const ctx: {
        propOne?: number;
      } = {};

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne']), undefined);
    });

    it('Deep array', () => {
      const ctx = [{ a: 'b' }];

      assert.strictEqual(oDeepGet.getValue(ctx, [0, 'a']), 'b');
      assert.strictEqual(
        oDeepGet.getValue(ctx, [0, 'a'], {
          safer: true,
        }),
        'b'
      );
      assert.strictEqual(
        new ODeepGet().getValue(ctx, [0, 'a'], {
          memoize: true,
        }),
        'b'
      );
      assert.strictEqual(
        new ODeepGet().getValue(ctx, [0, 'a'], {
          memoize: true,
          safer: true,
        }),
        'b'
      );
    });

    it('Deep One, 1', () => {
      const ctx: {
        propOne?: number;
      } = {
        propOne: 1,
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['propOne']), 1);
    });

    it('Deep One, 1, skip #', () => {
      const ctx: {
        propOne?: number;
      } = {
        propOne: 1,
      };

      assert.strictEqual(oDeepGet.getValue(ctx, ['#', 'propOne']), 1);
    });

    it('No ctx', () => {
      assert.strictEqual(oDeepGet.getValue(null, ['#', 'propOne']), undefined);
    });

    it('No path', () => {
      assert.strictEqual(oDeepGet.getValue({ id: 0 }, null as any), undefined);
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
        assert.ok((error as Error).message.startsWith('Cannot read prop'));
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
      };

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['propOne'], {
          memoize: true,
        }),
        1
      );

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['propOne'], {
          memoize: true,
        }),
        1
      );

      oDeepGet.clear();
    });

    it('Deep One, 1, skip one', () => {
      const ctx = {
        propOne: 1,
      };

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['#', 'propOne'], {
          memoize: true,
        }),
        1
      );

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['#', 'propOne'], {
          memoize: true,
        }),
        1
      );

      oDeepGet.clear();
    });

    it('Deep Two, path undefined, error, memoize', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      try {
        oDeepGet.getValue(ctx, ['propOne', 'propTwo'], {
          memoize: true,
        });
        throw new Error('Must failed');
      } catch (error) {
        assert.ok((error as Error).message.startsWith('Cannot read prop'));
      }
    });

    it('Deep Two, path undefined, shallow error, memoize', () => {
      const ctx: {
        propOne?: {
          propTwo?: number;
        };
      } = {};

      assert.strictEqual(
        oDeepGet.getValue(ctx, ['propOne', 'propTwo'], {
          memoize: true,
          shallowError: true,
        }),
        undefined
      );
    });
  });
});
