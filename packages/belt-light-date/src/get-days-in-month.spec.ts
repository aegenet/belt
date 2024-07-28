/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { getDaysArrayInMonth, getDaysInMonth } from './get-days-in-month';

describe('get-days-in-month', () => {
  describe('getDaysArrayInMonth', () => {
    it('normal', () => {
      assert.deepStrictEqual(getDaysArrayInMonth(2021), [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    });
    it('leap', () => {
      assert.deepStrictEqual(getDaysArrayInMonth(2020), [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    });
  });
  describe('getDaysInMonth', () => {
    it('normal', () => {
      assert.strictEqual(getDaysInMonth(new Date(2019, 0)), 31);
      assert.strictEqual(getDaysInMonth(new Date(2021, 1)), 28);
    });
    it('leap', () => {
      assert.strictEqual(getDaysInMonth(new Date(2020, 0)), 31);
      assert.strictEqual(getDaysInMonth(new Date(2020, 1)), 29);
    });
  });
});
