import * as assert from 'assert';
import { crc32 } from './index';

describe('crc8', () => {
  it('Ok', () => {
    assert.equal(crc32('Hello'), 0xf7d18982);
  });

  it('Empty', () => {
    assert.equal(crc32(''), 0x00);
  });

  it('Null', () => {
    assert.equal(crc32(null as any), 0x00);
  });

  it('undefined', () => {
    assert.equal(crc32(undefined as any), 0x00);
  });
});
