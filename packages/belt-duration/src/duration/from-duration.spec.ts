/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { EDurationFormat, fromDuration, toDuration } from '..';

describe('fromDuration', () => {
  describe('24h per day, 7 days per week', () => {
    it('invalid values', () => {
      assert.deepStrictEqual(fromDuration(null as any), 0);
      assert.deepStrictEqual(fromDuration(undefined as any), 0);
    });

    it('default/ms', () => {
      assert.deepStrictEqual(fromDuration(toDuration('1000')), 1000);
      assert.deepStrictEqual(fromDuration(toDuration(1000)), 1000);
    });

    it('ms', () => {
      assert.deepStrictEqual(
        fromDuration(toDuration('1000', EDurationFormat.MILLISECONDS), EDurationFormat.MILLISECONDS),
        1000
      );
      assert.deepStrictEqual(
        fromDuration(toDuration(1000, EDurationFormat.MILLISECONDS), EDurationFormat.MILLISECONDS),
        1000
      );
    });

    it('seconds', () => {
      assert.deepStrictEqual(fromDuration(toDuration('1000', EDurationFormat.SECONDS), EDurationFormat.SECONDS), 1000);
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.SECONDS), EDurationFormat.SECONDS), 1000);
    });

    it('minutes', () => {
      assert.deepStrictEqual(fromDuration(toDuration('1000', EDurationFormat.MINUTES), EDurationFormat.MINUTES), 1000);
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.MINUTES), EDurationFormat.MINUTES), 1000);
    });

    it('hours', () => {
      assert.deepStrictEqual(fromDuration(toDuration('1000', EDurationFormat.HOURS), EDurationFormat.HOURS), 1000);
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.HOURS), EDurationFormat.HOURS), 1000);
    });

    it('days', () => {
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.DAYS), EDurationFormat.DAYS), 1000);
    });

    it('weeks', () => {
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.WEEKS), EDurationFormat.WEEKS), 1000);
    });

    it('months', () => {
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.MONTHS), EDurationFormat.MONTHS), 1000);
    });

    it('years', () => {
      assert.deepStrictEqual(fromDuration(toDuration(1000, EDurationFormat.YEARS), EDurationFormat.YEARS), 1000);
    });
  });
});
