import * as assert from 'assert';
import * as belt from './index';

describe('all-in-one', () => {
  it('belt_crc8', () => {
    assert.ok(belt.crc8);
  });
  it('belt_crc32', () => {
    assert.ok(belt.crc32);
  });
  it('belt_promise', () => {
    assert.ok(belt.collectSequentially);
    assert.ok(belt.delay);
    assert.ok(belt.isPromise);
    assert.ok(belt.runSequentially);
  });
  it('belt_odeep', () => {
    assert.ok(belt.ODeepGet);
    assert.ok(belt.ODeepSet);
  });
  it('belt_ofields', () => {
    assert.ok(belt.ofields);
  });
  it('belt_odiff', () => {
    assert.ok(belt.odiff);
  });
  it('belt_oclone', () => {
    assert.ok(belt.oclone);
  });
  it('belt_hook', () => {
    assert.ok(belt.HOOK_PREFIX);
    assert.ok(belt.hook);
  });
  it('belt_interpolation', () => {
    assert.ok(belt.Interpolation);
    assert.ok(belt.transform);
  });
  it('belt_array_duplicates', () => {
    assert.ok(belt.getDuplicates);
    assert.ok(belt.stripDuplicates);
  });
  it('belt_array_to_obj', () => {
    assert.ok(belt.arrayToObject);
  });
  it('belt_array_stats', () => {
    assert.ok(belt.getAverage);
    assert.ok(belt.getMedian);
  });
  it('belt_obj_to_array', () => {
    assert.ok(belt.objectToArray);
  });
});
