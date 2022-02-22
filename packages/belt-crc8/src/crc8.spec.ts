import * as assert from 'assert';
import { crc8 } from './index';

describe('crc8', () => {
  it('Ok', () => {
    assert.equal(crc8('Hello'), 0xf6);
  });

  it('Empty', () => {
    assert.equal(crc8(''), 0x00);
  });

  it('Null', () => {
    assert.equal(crc8(null), 0x00);
  });

  it('undefined', () => {
    assert.equal(crc8(undefined), 0x00);
  });
});
