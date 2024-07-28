/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { EDurationFormat } from '..';
import { cleanupDurationCache, createDurationTable } from './create-duration-table';

const { DAYS, HOURS, MILLISECONDS, MINUTES, MONTHS, SECONDS, WEEKS, YEARS } = EDurationFormat;

describe('createDurationTable', () => {
  describe('24h per day, 7 days per week', () => {
    it('default/ms', () => {
      assert.deepStrictEqual(createDurationTable(), {
        [MILLISECONDS]: {
          div: false,
          ratio: 1,
        },
        [SECONDS]: {
          div: true,
          ratio: 1000,
        },
        [MINUTES]: {
          div: true,
          ratio: 60000,
        },
        [HOURS]: {
          div: true,
          ratio: 3600000,
        },
        [DAYS]: {
          div: true,
          ratio: 86400000,
        },
        [WEEKS]: {
          div: true,
          ratio: 604800000,
        },
        [MONTHS]: {
          div: true,
          ratio: 2628001152.0000005,
        },
        [YEARS]: {
          div: true,
          ratio: 31536013824.000008,
        },
      });
    });

    it('milliseconds', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.MILLISECONDS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 1,
        },
        [SECONDS]: {
          div: true,
          ratio: 1000,
        },
        [MINUTES]: {
          div: true,
          ratio: 60000,
        },
        [HOURS]: {
          div: true,
          ratio: 3600000,
        },
        [DAYS]: {
          div: true,
          ratio: 86400000,
        },
        [WEEKS]: {
          div: true,
          ratio: 604800000,
        },
        [MONTHS]: {
          div: true,
          ratio: 2628001152.0000005,
        },
        [YEARS]: {
          div: true,
          ratio: 31536013824.000008,
        },
      });
    });

    it('seconds', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.SECONDS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 1000,
        },
        [SECONDS]: {
          div: false,
          ratio: 1,
        },
        [MINUTES]: {
          div: true,
          ratio: 60,
        },
        [HOURS]: {
          div: true,
          ratio: 3600,
        },
        [DAYS]: {
          div: true,
          ratio: 86400,
        },
        [WEEKS]: {
          div: true,
          ratio: 604800,
        },
        [MONTHS]: {
          div: true,
          ratio: 2628001.1520000002,
        },
        [YEARS]: {
          div: true,
          ratio: 31536013.824,
        },
      });
    });

    it('minutes', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.MINUTES), {
        [MILLISECONDS]: {
          div: false,
          ratio: 60000,
        },
        [SECONDS]: {
          div: false,
          ratio: 60,
        },
        [MINUTES]: {
          div: false,
          ratio: 1,
        },
        [HOURS]: {
          div: true,
          ratio: 60,
        },
        [DAYS]: {
          div: true,
          ratio: 1440,
        },
        [WEEKS]: {
          div: true,
          ratio: 10080,
        },
        [MONTHS]: {
          div: true,
          ratio: 43800.0192,
        },
        [YEARS]: {
          div: true,
          ratio: 525600.2304,
        },
      });
    });

    it('hours', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.HOURS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 3600000,
        },
        [SECONDS]: {
          div: false,
          ratio: 3600,
        },
        [MINUTES]: {
          div: false,
          ratio: 60,
        },
        [HOURS]: {
          div: false,
          ratio: 1,
        },
        [DAYS]: {
          div: true,
          ratio: 24,
        },
        [WEEKS]: {
          div: true,
          ratio: 168,
        },
        [MONTHS]: {
          div: true,
          ratio: 730.0003200000001,
        },
        [YEARS]: {
          div: true,
          ratio: 8760.003840000001,
        },
      });
    });

    it('days', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.DAYS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 86400000,
        },
        [SECONDS]: {
          div: false,
          ratio: 86400,
        },
        [MINUTES]: {
          div: false,
          ratio: 1440,
        },
        [HOURS]: {
          div: false,
          ratio: 24,
        },
        [DAYS]: {
          div: false,
          ratio: 1,
        },
        [WEEKS]: {
          div: true,
          ratio: 7,
        },
        [MONTHS]: {
          div: true,
          ratio: 30.416680000000003,
        },
        [YEARS]: {
          div: true,
          ratio: 365.00016000000005,
        },
      });
    });

    it('weeks', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.WEEKS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 604800000,
        },
        [SECONDS]: {
          div: false,
          ratio: 604800,
        },
        [MINUTES]: {
          div: false,
          ratio: 10080,
        },
        [HOURS]: {
          div: false,
          ratio: 168,
        },
        [DAYS]: {
          div: false,
          ratio: 7,
        },
        [WEEKS]: {
          div: false,
          ratio: 1,
        },
        [MONTHS]: {
          div: true,
          ratio: 4.34524,
        },
        [YEARS]: {
          div: true,
          ratio: 52.142880000000005,
        },
      });
    });

    it('months', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.MONTHS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 2628001152.0000005,
        },
        [SECONDS]: {
          div: false,
          ratio: 2628001.1520000002,
        },
        [MINUTES]: {
          div: false,
          ratio: 43800.01920000001,
        },
        [HOURS]: {
          div: false,
          ratio: 730.0003200000001,
        },
        [DAYS]: {
          div: false,
          ratio: 30.416680000000003,
        },
        [WEEKS]: {
          div: false,
          ratio: 4.34524,
        },
        [MONTHS]: {
          div: false,
          ratio: 1,
        },
        [YEARS]: {
          div: true,
          ratio: 12,
        },
      });
    });

    it('years', () => {
      assert.deepStrictEqual(createDurationTable(EDurationFormat.YEARS), {
        [MILLISECONDS]: {
          div: false,
          ratio: 31536013824.000004,
        },
        [SECONDS]: {
          div: false,
          ratio: 31536013.824000005,
        },
        [MINUTES]: {
          div: false,
          ratio: 525600.2304000001,
        },
        [HOURS]: {
          div: false,
          ratio: 8760.003840000001,
        },
        [DAYS]: {
          div: false,
          ratio: 365.00016000000005,
        },
        [WEEKS]: {
          div: false,
          ratio: 52.142880000000005,
        },
        [MONTHS]: {
          div: false,
          ratio: 12,
        },
        [YEARS]: {
          div: false,
          ratio: 1,
        },
      });
    });
  });

  describe('Memoize', () => {
    it('default/ms', () => {
      assert.deepStrictEqual(
        createDurationTable(undefined, {
          memoize: true,
        }),
        {
          [MILLISECONDS]: {
            div: false,
            ratio: 1,
          },
          [SECONDS]: {
            div: true,
            ratio: 1000,
          },
          [MINUTES]: {
            div: true,
            ratio: 60000,
          },
          [HOURS]: {
            div: true,
            ratio: 3600000,
          },
          [DAYS]: {
            div: true,
            ratio: 86400000,
          },
          [WEEKS]: {
            div: true,
            ratio: 604800000,
          },
          [MONTHS]: {
            div: true,
            ratio: 2628001152.0000005,
          },
          [YEARS]: {
            div: true,
            ratio: 31536013824.000008,
          },
        }
      );

      assert.deepStrictEqual(
        createDurationTable(undefined, {
          memoize: true,
        }),
        {
          [MILLISECONDS]: {
            div: false,
            ratio: 1,
          },
          [SECONDS]: {
            div: true,
            ratio: 1000,
          },
          [MINUTES]: {
            div: true,
            ratio: 60000,
          },
          [HOURS]: {
            div: true,
            ratio: 3600000,
          },
          [DAYS]: {
            div: true,
            ratio: 86400000,
          },
          [WEEKS]: {
            div: true,
            ratio: 604800000,
          },
          [MONTHS]: {
            div: true,
            ratio: 2628001152.0000005,
          },
          [YEARS]: {
            div: true,
            ratio: 31536013824.000008,
          },
        }
      );

      assert.deepStrictEqual(
        createDurationTable(EDurationFormat.MILLISECONDS, {
          memoize: true,
        }),
        {
          [MILLISECONDS]: {
            div: false,
            ratio: 1,
          },
          [SECONDS]: {
            div: true,
            ratio: 1000,
          },
          [MINUTES]: {
            div: true,
            ratio: 60000,
          },
          [HOURS]: {
            div: true,
            ratio: 3600000,
          },
          [DAYS]: {
            div: true,
            ratio: 86400000,
          },
          [WEEKS]: {
            div: true,
            ratio: 604800000,
          },
          [MONTHS]: {
            div: true,
            ratio: 2628001152.0000005,
          },
          [YEARS]: {
            div: true,
            ratio: 31536013824.000008,
          },
        }
      );

      assert.deepStrictEqual(
        createDurationTable(EDurationFormat.MILLISECONDS, {
          memoize: true,
        }),
        {
          [MILLISECONDS]: {
            div: false,
            ratio: 1,
          },
          [SECONDS]: {
            div: true,
            ratio: 1000,
          },
          [MINUTES]: {
            div: true,
            ratio: 60000,
          },
          [HOURS]: {
            div: true,
            ratio: 3600000,
          },
          [DAYS]: {
            div: true,
            ratio: 86400000,
          },
          [WEEKS]: {
            div: true,
            ratio: 604800000,
          },
          [MONTHS]: {
            div: true,
            ratio: 2628001152.0000005,
          },
          [YEARS]: {
            div: true,
            ratio: 31536013824.000008,
          },
        }
      );

      assert.deepStrictEqual(
        createDurationTable(undefined, {
          memoize: true,
        }),
        {
          [MILLISECONDS]: {
            div: false,
            ratio: 1,
          },
          [SECONDS]: {
            div: true,
            ratio: 1000,
          },
          [MINUTES]: {
            div: true,
            ratio: 60000,
          },
          [HOURS]: {
            div: true,
            ratio: 3600000,
          },
          [DAYS]: {
            div: true,
            ratio: 86400000,
          },
          [WEEKS]: {
            div: true,
            ratio: 604800000,
          },
          [MONTHS]: {
            div: true,
            ratio: 2628001152.0000005,
          },
          [YEARS]: {
            div: true,
            ratio: 31536013824.000008,
          },
        }
      );

      assert.deepStrictEqual(
        createDurationTable(EDurationFormat.SECONDS, {
          memoize: true,
        }),
        {
          [MILLISECONDS]: {
            div: false,
            ratio: 1000,
          },
          [SECONDS]: {
            div: false,
            ratio: 1,
          },
          [MINUTES]: {
            div: true,
            ratio: 60,
          },
          [HOURS]: {
            div: true,
            ratio: 3600,
          },
          [DAYS]: {
            div: true,
            ratio: 86400,
          },
          [WEEKS]: {
            div: true,
            ratio: 604800,
          },
          [MONTHS]: {
            div: true,
            ratio: 2628001.1520000002,
          },
          [YEARS]: {
            div: true,
            ratio: 31536013.824,
          },
        }
      );
      cleanupDurationCache();
    });
  });
});
