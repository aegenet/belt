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
});
