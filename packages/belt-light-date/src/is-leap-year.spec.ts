import * as assert from 'assert';
import { isLeapYear } from './is-leap-year';

describe('is-leap-year', () => {
  it('isLeapYear', () => {
    assert.strictEqual(isLeapYear(1800), false);
    assert.strictEqual(isLeapYear(1801), false);
    assert.strictEqual(isLeapYear(1900), false);
    assert.strictEqual(isLeapYear(1901), false);
    assert.strictEqual(isLeapYear(1999), false);
    assert.strictEqual(isLeapYear(2000), true);
    assert.strictEqual(isLeapYear(2001), false);
    assert.strictEqual(isLeapYear(2019), false);
    assert.strictEqual(isLeapYear(2020), true);
    assert.strictEqual(isLeapYear(2021), false);
    assert.strictEqual(isLeapYear(2024), true);
    assert.strictEqual(isLeapYear(2027), false);
    assert.strictEqual(isLeapYear(2028), true);
    assert.strictEqual(isLeapYear(2029), false);
    assert.strictEqual(isLeapYear(2032), true);
    assert.strictEqual(isLeapYear(2100), false);
    assert.strictEqual(isLeapYear(2200), false);
    assert.strictEqual(isLeapYear(2300), false);
    assert.strictEqual(isLeapYear(2400), true);
  });
});
