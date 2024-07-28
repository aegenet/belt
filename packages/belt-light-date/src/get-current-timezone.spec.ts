/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { getCurrentTimezone, timezoneOffsetToISO } from './index';

describe('getCurrentTimezone', () => {
  it('Once', () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Europe/Paris') {
      assert.ok(getCurrentTimezone() === '+0200' || getCurrentTimezone() === '+0100');
      // memoize
      assert.ok(getCurrentTimezone() === '+0200' || getCurrentTimezone() === '+0100');
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
