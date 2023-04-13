import * as assert from 'node:assert';
import { getDayNames } from './index';

describe('getDayNames', () => {
  it('short', () => {
    assert.deepStrictEqual(getDayNames('short', 'en'), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    assert.deepStrictEqual(getDayNames('short', 'en'), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  });
  it('long', () => {
    assert.deepStrictEqual(getDayNames(undefined, 'en'), ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    assert.deepStrictEqual(getDayNames('long', 'en'), ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    assert.deepStrictEqual(getDayNames('long', 'en'), ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  });
  it('cache', () => {
    assert.deepStrictEqual(getDayNames('short', 'en'), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    assert.deepStrictEqual(getDayNames('long', 'en'), ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    assert.deepStrictEqual(getDayNames('short', 'en'), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    assert.deepStrictEqual(getDayNames('long', 'fr'), ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']);
    assert.deepStrictEqual(getDayNames('long', 'en'), ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  });
});
