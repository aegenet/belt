/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { RaceTime } from '../browser';

describe('RaceTime', () => {
  it('A long time', async () => {
    const rct = new RaceTime(Number.MAX_VALUE, 1);
    assert.strictEqual(rct.ns, Number.MAX_VALUE);
    assert.strictEqual(rct.us, 1.7976931348623156e305);
    assert.strictEqual(rct.ms, 1.7976931348623154e302);
    assert.strictEqual(rct.s, 1.7976931348623153e299);
    assert.strictEqual(rct.m, 2.9961552247705255e297);
    assert.deepStrictEqual(rct.lap, 1);
  });

  it('long', async () => {
    const rct = new RaceTime(1000000000000, 1);
    assert.strictEqual(rct.ns, 1000000000000);
    assert.strictEqual(rct.us, 1000000000);
    assert.strictEqual(rct.ms, 1000000);
    assert.strictEqual(rct.s, 1000);
    assert.strictEqual(rct.m, 16.666666666666668);
    assert.deepStrictEqual(rct.lap, 1);
  });

  it('Not so long', async () => {
    const rct = new RaceTime(1000000000, 1);
    assert.strictEqual(rct.ns, 1000000000);
    assert.strictEqual(rct.us, 1000000);
    assert.strictEqual(rct.ms, 1000);
    assert.strictEqual(rct.s, 1);
    assert.strictEqual(rct.m, 0.016666666666666666);
    assert.deepStrictEqual(rct.lap, 1);
  });
});
