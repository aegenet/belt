import * as assert from 'node:assert';
import { EDurationFormat, EDurationFormatMask, toDuration } from '..';

describe('toDuration', () => {
  describe('24h per day, 7 days per week', () => {
    it('invalid values', () => {
      assert.deepStrictEqual(toDuration(' a'), undefined);
      assert.deepStrictEqual(toDuration(' '), undefined);
      assert.deepStrictEqual(toDuration('  èèè'), undefined);
      assert.deepStrictEqual(toDuration(null as any), undefined);
      assert.deepStrictEqual(toDuration(undefined as any), undefined);
      try {
        assert.deepStrictEqual(toDuration(Number.MAX_SAFE_INTEGER + 1), undefined);
        throw new Error('Must fail!');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'The input value must be less than or equal to MAX_SAFE_INTEGER.');
      }
    });

    it('default/ms', () => {
      assert.deepStrictEqual(toDuration('1000'), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 0,
        months: 0,
        seconds: 1,
        weeks: 0,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(1000), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 0,
        months: 0,
        seconds: 1,
        weeks: 0,
        years: 0,
      });
    });

    it('ms', () => {
      assert.deepStrictEqual(toDuration('1000', EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 0,
        months: 0,
        seconds: 1,
        weeks: 0,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(1000, EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 0,
        months: 0,
        seconds: 1,
        weeks: 0,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(100000, EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 1,
        months: 0,
        seconds: 40,
        weeks: 0,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(1000000, EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 16,
        months: 0,
        seconds: 40,
        weeks: 0,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(100000000, EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 1,
        hours: 3,
        milliseconds: 0,
        minutes: 46,
        months: 0,
        seconds: 40,
        weeks: 0,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(999999999, EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 4,
        hours: 13,
        milliseconds: 999,
        minutes: 46,
        months: 0,
        seconds: 39,
        weeks: 1,
        years: 0,
      });

      assert.deepStrictEqual(toDuration(9999999999, EDurationFormat.MILLISECONDS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 3,
        hours: 11,
        milliseconds: 543,
        minutes: 46,
        months: 3,
        seconds: 36,
        weeks: 3,
        years: 0,
      });
    });

    it('days', () => {
      assert.deepStrictEqual(toDuration(1000, EDurationFormat.DAYS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        days: 5,
        hours: 15,
        milliseconds: 136,
        minutes: 59,
        months: 8,
        seconds: 23,
        weeks: 3,
        years: 2,
      });

      assert.strictEqual(
        toDuration(1000, EDurationFormat.DAYS, {
          mask: EDurationFormat.WEEKS,
        })?.weeks,
        143
      );

      assert.strictEqual(
        toDuration(1000, EDurationFormat.DAYS, {
          mask: EDurationFormat.DAYS,
        })?.days,
        1000
      );

      assert.deepStrictEqual(
        toDuration(1000, EDurationFormat.DAYS, {
          mask: EDurationFormat.MONTHS | EDurationFormat.DAYS,
          precision: 0.5,
        }),
        {
          days: 26.5,
          daysPerWeek: 7,
          hours: 0,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 32,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );
    });

    it('weeks', () => {
      assert.deepStrictEqual(toDuration(62, EDurationFormat.WEEKS), {
        days: 1,
        daysPerWeek: 7,
        hours: 3,
        hoursPerDay: 24,
        milliseconds: 872,
        minutes: 59,
        months: 2,
        seconds: 43,
        weeks: 1,
        years: 1,
      });

      assert.strictEqual(
        toDuration(62, EDurationFormat.WEEKS, {
          mask: EDurationFormat.WEEKS,
        })?.weeks,
        62
      );

      assert.strictEqual(
        toDuration(62, EDurationFormat.WEEKS, {
          mask: EDurationFormat.DAYS,
        })?.days,
        434
      );

      assert.deepStrictEqual(
        toDuration(62, EDurationFormat.WEEKS, {
          mask: EDurationFormat.MONTHS | EDurationFormat.DAYS,
          precision: 0.5,
        }),
        {
          hoursPerDay: 24,
          daysPerWeek: 7,
          years: 0,
          months: 14,
          weeks: 0,
          days: 8,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }
      );
    });

    it('months', () => {
      assert.deepStrictEqual(toDuration(12.5, EDurationFormat.MONTHS), {
        daysPerWeek: 7,
        hoursPerDay: 24,
        years: 1,
        months: 0,
        weeks: 2,
        days: 1,
        hours: 5,
        milliseconds: 576,
        minutes: 0,
        seconds: 0,
      });

      assert.strictEqual(
        toDuration(12.5, EDurationFormat.MONTHS, {
          mask: EDurationFormat.WEEKS,
        })?.weeks,
        54.5
      );

      assert.strictEqual(
        toDuration(12.5, EDurationFormat.MONTHS, {
          mask: EDurationFormat.DAYS,
        })?.days,
        380
      );

      assert.deepStrictEqual(
        toDuration(12.5, EDurationFormat.MONTHS, {
          mask: EDurationFormat.MONTHS | EDurationFormat.DAYS,
          precision: 0.5,
        }),
        {
          days: 15,
          daysPerWeek: 7,
          hours: 0,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 12,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );
    });

    it('years', () => {
      assert.deepStrictEqual(toDuration(1.75, EDurationFormat.YEARS), {
        days: 0,
        daysPerWeek: 7,
        hours: 0,
        hoursPerDay: 24,
        milliseconds: 0,
        minutes: 0,
        months: 9,
        seconds: 0,
        weeks: 0,
        years: 1,
      });

      assert.strictEqual(
        toDuration(1.75, EDurationFormat.YEARS, {
          mask: EDurationFormat.WEEKS,
        })?.weeks,
        91.5
      );

      assert.strictEqual(
        toDuration(1.75, EDurationFormat.YEARS, {
          mask: EDurationFormat.DAYS,
        })?.days,
        639
      );

      assert.deepStrictEqual(
        toDuration(1.75, EDurationFormat.YEARS, {
          mask: EDurationFormat.MONTHS | EDurationFormat.DAYS,
          precision: 0.5,
        }),
        {
          days: 0,
          daysPerWeek: 7,
          hours: 0,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 21,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );
    });
  });

  describe('Specific format - 7d24h', () => {
    it('ms', () => {
      assert.deepStrictEqual(
        toDuration(1000, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          daysPerWeek: 7,
          hoursPerDay: 24,
          days: 0,
          hours: 0,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(100000, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          daysPerWeek: 7,
          hoursPerDay: 24,
          days: 0,
          hours: 0,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(1000000, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          daysPerWeek: 7,
          hoursPerDay: 24,
          days: 0,
          hours: 0.5,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(100000000, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          daysPerWeek: 7,
          hoursPerDay: 24,
          days: 1,
          hours: 4,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 0,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(999999999, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          days: 4,
          daysPerWeek: 7,
          hours: 14,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 1,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(9999999999, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          days: 3,
          daysPerWeek: 7,
          hours: 18,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 16,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(9999999999, EDurationFormat.MILLISECONDS, {
          mask: EDurationFormatMask.W_D_H,
          daysPerWeek: 5,
          hoursPerDay: 8,
        }),
        {
          days: 2,
          daysPerWeek: 5,
          hours: 2,
          hoursPerDay: 8,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 69,
          years: 0,
        }
      );
    });

    it('seconds', () => {
      assert.deepStrictEqual(
        toDuration(9999999, EDurationFormat.SECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          days: 3,
          daysPerWeek: 7,
          hours: 18,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 16,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(9999999999, EDurationFormat.SECONDS, {
          mask: EDurationFormatMask.W_D_H,
        }),
        {
          days: 2,
          daysPerWeek: 7,
          hours: 18,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 0,
          seconds: 0,
          weeks: 16534,
          years: 0,
        }
      );

      assert.deepStrictEqual(
        toDuration(9999999999, EDurationFormat.SECONDS, {
          mask: EDurationFormatMask.Y_M_D,
        }),
        {
          days: 5.5,
          daysPerWeek: 7,
          hours: 0,
          hoursPerDay: 24,
          milliseconds: 0,
          minutes: 0,
          months: 1,
          seconds: 0,
          weeks: 0,
          years: 317,
        }
      );
    });
  });
});
