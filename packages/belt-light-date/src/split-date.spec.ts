import * as assert from 'assert';
import { splitDate } from './';

describe('split-date', () => {
  it('splitDate classic', () => {
    const dates = splitDate({
      days: 30,
      dateFrom: '2022-04-20T12:14:00.072Z',
    });

    assert.equal(dates.start.toLocaleString('fr'), '05/04/2022 00:00:00');
    assert.equal(dates.end.toLocaleString('fr'), '05/05/2022 23:59:59');
  });
  it('splitDate week', () => {
    const locale = new Intl.NumberFormat().resolvedOptions().locale;
    assert.equal(
      splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).start.toLocaleString('fr'),
      locale === 'en-US' ? '03/04/2022 00:00:00' : '04/04/2022 00:00:00'
    );
    assert.equal(
      splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).end.toLocaleString('fr'),
      locale === 'en-US' ? '30/04/2022 23:59:59' : '01/05/2022 23:59:59'
    );
  });
  it('splitDate month', () => {
    assert.equal(
      splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'month',
      }).start.toLocaleString('fr'),
      '01/04/2022 00:00:00'
    );
    assert.equal(
      splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'month',
      }).end.toLocaleString('fr'),
      '31/05/2022 23:59:59'
    );
  });
  it('splitDate year', () => {
    assert.equal(
      splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'year',
      }).start.toLocaleString('fr'),
      '01/01/2022 00:00:00'
    );
    assert.equal(
      splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'year',
      }).end.toLocaleString('fr'),
      '31/12/2022 23:59:59'
    );
  });
  it('splitDate 365d week', () => {
    const locale = new Intl.NumberFormat().resolvedOptions().locale;
    assert.equal(
      splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).start.toLocaleString('fr'),
      locale === 'en-US' ? '17/10/2021 00:00:00' : '18/10/2021 00:00:00'
    );
    assert.equal(
      splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).end.toLocaleString('fr'),
      locale === 'en-US' ? '15/10/2022 23:59:59' : '16/10/2022 23:59:59'
    );
  });
  it('splitDate 365d', () => {
    assert.equal(
      splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
      }).start.toLocaleString('fr'),
      '20/10/2021 00:00:00'
    );
    assert.equal(
      splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
      }).end.toLocaleString('fr'),
      '19/10/2022 23:59:59'
    );
  });
});
