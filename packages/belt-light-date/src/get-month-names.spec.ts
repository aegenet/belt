import * as assert from 'assert';
import { getMonthNames } from './index';

describe('getMonthNames', () => {
  it('short', () => {
    assert.deepStrictEqual(getMonthNames('short', 'en'), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    assert.deepStrictEqual(getMonthNames('short', 'en'), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });
  it('long', () => {
    assert.deepStrictEqual(getMonthNames(undefined, 'en'), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    assert.deepStrictEqual(getMonthNames('long', 'en'), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    assert.deepStrictEqual(getMonthNames('long', 'en'), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
  });
  it('cache', () => {
    assert.deepStrictEqual(getMonthNames('short', 'en'), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    assert.deepStrictEqual(getMonthNames('long', 'en'), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    assert.deepStrictEqual(getMonthNames('short', 'en'), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    assert.deepStrictEqual(getMonthNames('long', 'fr'), ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']);
    assert.deepStrictEqual(getMonthNames('long', 'en'), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
  });
});
