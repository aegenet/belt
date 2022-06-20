import * as assert from 'assert';
import { getCurrentTimezone, timezoneOffsetToISO } from './index';

describe('getCurrentTimezone', () => {
  it('Once', () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Europe/Paris') {
      assert.strictEqual(getCurrentTimezone(), '+0200');
      // memoize
      assert.strictEqual(getCurrentTimezone(), '+0200');
    } else {
      assert.strictEqual(getCurrentTimezone(), '+0000');
      // memoize
      assert.strictEqual(getCurrentTimezone(), '+0000');
    }
  });
});

describe('timezoneOffsetToISO', () => {
  it('Once', () => {
    assert.strictEqual(timezoneOffsetToISO(330), '-0530');
    // memoize
    assert.strictEqual(timezoneOffsetToISO(-120), '+0200');
  });
});
