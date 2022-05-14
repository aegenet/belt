import * as assert from 'assert';
import { LightDate } from './index';

describe('light-date', () => {
  it('today', () => {
    assert.equal(LightDate.today().getDate(), new Date().getDate());
    assert.equal(LightDate.today('2022-04-20T12:14:00.072Z').toISOString(), '2022-04-20T12:14:00.072Z');
  });
  it('todayStart', () => {
    assert.equal(LightDate.todayStart().getDate(), new Date().getDate());
    assert.equal(LightDate.todayStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '20/04/2022, 00:00:00');
  });
  it('todayEnd', () => {
    assert.equal(LightDate.todayEnd().getDate(), new Date().getDate());
    assert.equal(LightDate.todayEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '20/04/2022, 23:59:59');
  });
  it('tomorrow', () => {
    assert.equal(LightDate.tomorrow('2022-04-20T12:14:00.072Z').toISOString(), '2022-04-21T12:14:00.072Z');
  });
  it('yesterday', () => {
    assert.equal(LightDate.yesterday('2022-04-20T12:14:00.072Z').toISOString(), '2022-04-19T12:14:00.072Z');
  });
  it('tomorrowStart', () => {
    assert.equal(LightDate.tomorrowStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '21/04/2022, 00:00:00');
  });
  it('tomorrowEnd', () => {
    assert.equal(LightDate.tomorrowEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '21/04/2022, 23:59:59');
  });
  it('monthStart', () => {
    assert.equal(LightDate.monthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/04/2022, 00:00:00');
  });
  it('monthEnd', () => {
    assert.equal(LightDate.monthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '30/04/2022, 23:59:59');
  });
  it('nextMonthStart', () => {
    assert.equal(LightDate.nextMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/05/2022, 00:00:00');
  });
  it('nextMonthEnd', () => {
    assert.equal(LightDate.nextMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '31/05/2022, 23:59:59');
  });
  it('prevMonthStart', () => {
    assert.equal(LightDate.prevMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/03/2022, 00:00:00');
  });
  it('prevMonthEnd', () => {
    assert.equal(LightDate.prevMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '31/03/2022, 23:59:59');
  });
  it('yearStart', () => {
    assert.equal(LightDate.yearStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/01/2022, 00:00:00');
  });
  it('yearEnd', () => {
    assert.equal(LightDate.yearEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '31/12/2022, 23:59:59');
  });
  it('weekStart', () => {
    assert.equal(LightDate.weekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '18/04/2022, 00:00:00');
    assert.equal(LightDate.weekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '17/04/2022, 00:00:00');
  });
  it('weekEnd', () => {
    assert.equal(LightDate.weekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '24/04/2022, 23:59:59');
    assert.equal(LightDate.weekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '23/04/2022, 23:59:59');
  });
  it('prevWeekStart', () => {
    assert.equal(LightDate.prevWeekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '11/04/2022, 00:00:00');
    assert.equal(LightDate.prevWeekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '10/04/2022, 00:00:00');
  });
  it('prevWeekEnd', () => {
    assert.equal(LightDate.prevWeekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '17/04/2022, 23:59:59');
    assert.equal(LightDate.prevWeekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '16/04/2022, 23:59:59');
  });
  it('nextWeekStart', () => {
    assert.equal(LightDate.nextWeekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '25/04/2022, 00:00:00');
    assert.equal(LightDate.nextWeekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '24/04/2022, 00:00:00');
  });
  it('nextWeekEnd', () => {
    assert.equal(LightDate.nextWeekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '01/05/2022, 23:59:59');
    assert.equal(LightDate.nextWeekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '30/04/2022, 23:59:59');
  });
  it('splitDate classic', () => {
    const dates = LightDate.splitDate({
      days: 30,
      dateFrom: '2022-04-20T12:14:00.072Z',
    });

    assert.equal(dates.start.toLocaleString('fr'), '05/04/2022, 00:00:00');
    assert.equal(dates.end.toLocaleString('fr'), '05/05/2022, 23:59:59');
  });
  it('splitDate week', () => {
    const locale = new Intl.NumberFormat().resolvedOptions().locale;
    assert.equal(
      LightDate.splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).start.toLocaleString('fr'),
      locale === 'en-US' ? '03/04/2022, 00:00:00' : '04/04/2022, 00:00:00'
    );
    assert.equal(
      LightDate.splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).end.toLocaleString('fr'),
      locale === 'en-US' ? '30/04/2022, 23:59:59' : '01/05/2022, 23:59:59'
    );
  });
  it('splitDate month', () => {
    assert.equal(
      LightDate.splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'month',
      }).start.toLocaleString('fr'),
      '01/04/2022, 00:00:00'
    );
    assert.equal(
      LightDate.splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'month',
      }).end.toLocaleString('fr'),
      '31/05/2022, 23:59:59'
    );
  });
  it('splitDate year', () => {
    assert.equal(
      LightDate.splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'year',
      }).start.toLocaleString('fr'),
      '01/01/2022, 00:00:00'
    );
    assert.equal(
      LightDate.splitDate({
        days: 30,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'year',
      }).end.toLocaleString('fr'),
      '31/12/2022, 23:59:59'
    );
  });
  it('splitDate 365d week', () => {
    const locale = new Intl.NumberFormat().resolvedOptions().locale;
    assert.equal(
      LightDate.splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).start.toLocaleString('fr'),
      locale === 'en-US' ? '17/10/2021, 00:00:00' : '18/10/2021, 00:00:00'
    );
    assert.equal(
      LightDate.splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
        startEndOf: 'week',
      }).end.toLocaleString('fr'),
      locale === 'en-US' ? '15/10/2022, 23:59:59' : '16/10/2022, 23:59:59'
    );
  });
  it('splitDate 365d', () => {
    assert.equal(
      LightDate.splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
      }).start.toLocaleString('fr'),
      '20/10/2021, 00:00:00'
    );
    assert.equal(
      LightDate.splitDate({
        days: 365,
        dateFrom: '2022-04-20T12:14:00.072Z',
      }).end.toLocaleString('fr'),
      '19/10/2022, 23:59:59'
    );
  });
  it('getIntlLocale', () => {
    const localeInfoUs = LightDate.getIntlLocale('en-US');
    assert.strictEqual(localeInfoUs.language, 'en');
    assert.strictEqual(localeInfoUs.region, 'US');
    assert.strictEqual(localeInfoUs.hourCycle, 'h12');
    assert.strictEqual(localeInfoUs.weekInfo.firstDay, 7);
    assert.strictEqual(localeInfoUs.weekInfo.minimalDays, 1);
    assert.deepStrictEqual(localeInfoUs.weekInfo.weekend, [6, 7]);

    const localeInfoFr = LightDate.getIntlLocale('fr-FR');
    assert.strictEqual(localeInfoFr.language, 'fr');
    assert.strictEqual(localeInfoFr.region, 'FR');
    assert.strictEqual(localeInfoFr.hourCycle, 'h23');
    assert.strictEqual(localeInfoFr.weekInfo.firstDay, 1);
    assert.strictEqual(localeInfoFr.weekInfo.minimalDays, 4);
    assert.deepStrictEqual(localeInfoFr.weekInfo.weekend, [6, 7]);
  });
});
