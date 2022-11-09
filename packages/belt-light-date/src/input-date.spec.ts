import * as assert from 'assert';
import { dateToInputDate, dateToInputDateTime, inputDateTimeToDate, inputDateToDate } from './index';

const isParisTZ = Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Paris';

describe('dateToInputDate', () => {
  it('String', () => {
    // iso
    assert.strictEqual(dateToInputDate('2015-12-25'), '2015-12-25');
    // local
    assert.strictEqual(dateToInputDate('2015/12/25'), '2015-12-25');
    assert.strictEqual(dateToInputDate('2018-06-12T19:30'), '2018-06-12');
  });
});

describe('inputDateToDate', () => {
  it('String', () => {
    // - => Iso
    assert.strictEqual(inputDateToDate('2015-12-25').toISOString(), isParisTZ ? '2015-12-24T23:00:00.000Z' : '2015-12-25T00:00:00.000Z');
    // / => Local
    assert.strictEqual(inputDateToDate('2015/12/25').toISOString(), isParisTZ ? '2015-12-24T23:00:00.000Z' : '2015-12-25T00:00:00.000Z');
    assert.strictEqual(inputDateToDate('2018-06-12').toISOString(), isParisTZ ? '2018-06-11T22:00:00.000Z' : '2018-06-12T00:00:00.000Z');
  });
});

describe('dateToInputDateTime', () => {
  it('String', () => {
    // iso
    assert.strictEqual(dateToInputDateTime('2015-12-25'), isParisTZ ? '2015-12-25T01:00' : '2015-12-25T00:00');
    // local
    assert.strictEqual(dateToInputDateTime('2015/12/25'), '2015-12-25T00:00');
    assert.strictEqual(dateToInputDateTime('2018-06-12T19:30'), '2018-06-12T19:30');
  });

  it('Logic', () => {
    const inputDateTime = dateToInputDateTime('2018-06-12T19:30');
    assert.strictEqual(inputDateTime, '2018-06-12T19:30');
    const revertToDate = inputDateTimeToDate(inputDateTime);
    assert.strictEqual(revertToDate.toISOString(), isParisTZ ? '2018-06-12T17:30:00.000Z' : '2018-06-12T19:30:00.000Z');
  });
});

describe('inputDateTimeToDate', () => {
  it('String', () => {
    assert.ok(inputDateTimeToDate(null as any));
    // - => Iso
    assert.strictEqual(inputDateTimeToDate('2015-12-25T19:30').toISOString(), isParisTZ ? '2015-12-25T18:30:00.000Z' : '2015-12-25T19:30:00.000Z');
    // / => Local
    assert.strictEqual(inputDateTimeToDate('2015/12/25T19:30').toISOString(), isParisTZ ? '2015-12-25T18:30:00.000Z' : '2015-12-25T19:30:00.000Z');
    assert.strictEqual(inputDateTimeToDate('2018-06-12T19:30').toISOString(), isParisTZ ? '2018-06-12T17:30:00.000Z' : '2018-06-12T19:30:00.000Z');
  });
});
