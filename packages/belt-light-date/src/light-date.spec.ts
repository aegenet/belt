/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { lightDate } from './index';

describe('light-date', () => {
  it('today', () => {
    assert.equal(lightDate.today().getDate(), new Date().getDate());
    assert.equal(lightDate.today('2022-04-20T12:14:00.072Z').toISOString(), '2022-04-20T12:14:00.072Z');
  });
  it('todayStart', () => {
    assert.equal(lightDate.todayStart().getDate(), new Date().getDate());
    assert.equal(lightDate.todayStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '20/04/2022 00:00:00');
  });
  it('todayEnd', () => {
    assert.equal(lightDate.todayEnd().getDate(), new Date().getDate());
    assert.equal(lightDate.todayEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '20/04/2022 23:59:59');
  });
  it('tomorrow', () => {
    assert.equal(lightDate.tomorrow('2022-04-20T12:14:00.072Z').toISOString(), '2022-04-21T12:14:00.072Z');
  });
  it('yesterday', () => {
    assert.equal(lightDate.yesterday('2022-04-20T12:14:00.072Z').toISOString(), '2022-04-19T12:14:00.072Z');
  });
  it('tomorrowStart', () => {
    assert.equal(lightDate.tomorrowStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '21/04/2022 00:00:00');
  });
  it('tomorrowEnd', () => {
    assert.equal(lightDate.tomorrowEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '21/04/2022 23:59:59');
  });
  it('monthStart', () => {
    assert.equal(lightDate.monthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/04/2022 00:00:00');
  });
  it('monthEnd', () => {
    assert.equal(lightDate.monthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '30/04/2022 23:59:59');
  });
  it('nextMonthStart', () => {
    assert.equal(lightDate.nextMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/05/2022 00:00:00');
  });
  it('nextMonthEnd', () => {
    assert.equal(lightDate.nextMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '31/05/2022 23:59:59');
  });
  it('prevMonthStart', () => {
    assert.equal(lightDate.prevMonthStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/03/2022 00:00:00');
  });
  it('prevMonthEnd', () => {
    assert.equal(lightDate.prevMonthEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '31/03/2022 23:59:59');
  });
  it('yearStart', () => {
    assert.equal(lightDate.yearStart('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '01/01/2022 00:00:00');
  });
  it('yearEnd', () => {
    assert.equal(lightDate.yearEnd('2022-04-20T12:14:00.072Z').toLocaleString('fr'), '31/12/2022 23:59:59');
  });
  it('weekStart', () => {
    assert.equal(lightDate.weekStart('2022-04-20', 'en-US').toLocaleString('fr'), '17/04/2022 00:00:00');
    assert.equal(lightDate.weekStart('2022-06-12', 'fr-FR').toLocaleString('fr'), '06/06/2022 00:00:00');
    assert.equal(lightDate.weekStart('2022-04-20', 'fr-FR').toLocaleString('fr'), '18/04/2022 00:00:00');
  });
  it('weekEnd', () => {
    assert.equal(lightDate.weekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'), '24/04/2022 23:59:59');
    assert.equal(lightDate.weekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'), '23/04/2022 23:59:59');
  });
  it('prevWeekStart', () => {
    assert.equal(
      lightDate.prevWeekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'),
      '11/04/2022 00:00:00'
    );
    assert.equal(
      lightDate.prevWeekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'),
      '10/04/2022 00:00:00'
    );
  });
  it('prevWeekEnd', () => {
    assert.equal(
      lightDate.prevWeekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'),
      '17/04/2022 23:59:59'
    );
    assert.equal(
      lightDate.prevWeekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'),
      '16/04/2022 23:59:59'
    );
  });
  it('nextWeekStart', () => {
    assert.equal(
      lightDate.nextWeekStart('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'),
      '25/04/2022 00:00:00'
    );
    assert.equal(
      lightDate.nextWeekStart('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'),
      '24/04/2022 00:00:00'
    );
  });
  it('nextWeekEnd', () => {
    assert.equal(
      lightDate.nextWeekEnd('2022-04-20T12:14:00.072Z', 'fr-FR').toLocaleString('fr'),
      '01/05/2022 23:59:59'
    );
    assert.equal(
      lightDate.nextWeekEnd('2022-04-20T12:14:00.072Z', 'en-US').toLocaleString('fr'),
      '30/04/2022 23:59:59'
    );
  });

  it('getIntlLocale', () => {
    const localeInfoUs = lightDate.getIntlLocale('en-US');
    assert.strictEqual(localeInfoUs.language, 'en');
    assert.strictEqual(localeInfoUs.region, 'US');
    assert.strictEqual(localeInfoUs.hourCycle, 'h12');
    assert.strictEqual(localeInfoUs.weekInfo.firstDay, 7);
    assert.strictEqual(localeInfoUs.weekInfo.minimalDays, 1);
    assert.deepStrictEqual(localeInfoUs.weekInfo.weekend, [6, 7]);

    const localeInfoFr = lightDate.getIntlLocale('fr-FR');
    assert.strictEqual(localeInfoFr.language, 'fr');
    assert.strictEqual(localeInfoFr.region, 'FR');
    assert.strictEqual(localeInfoFr.hourCycle, 'h23');
    assert.strictEqual(localeInfoFr.weekInfo.firstDay, 1);
    assert.strictEqual(localeInfoFr.weekInfo.minimalDays, 4);
    assert.deepStrictEqual(localeInfoFr.weekInfo.weekend, [6, 7]);
  });
});
