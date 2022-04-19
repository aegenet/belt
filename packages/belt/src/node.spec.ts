import * as assert from 'assert';
import * as belt from './node';

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
  it('belt_obj_is_empty', () => {
    assert.ok(belt.objectIsEmpty);
  });
  it('belt_obj_is_equals', () => {
    assert.ok(belt.objectsIsEquals);
    assert.ok(belt.objectsIsNotEquals);
  });
  it('belt_obj_to_map', () => {
    assert.ok(belt.objectToMap);
  });
  it('belt_str_escape_regex', () => {
    assert.ok(belt.escapeRegex);
  });
  it('belt_symbols_is_balanced', () => {
    assert.ok(belt.symbolsIsBalanced);
  });
  it('belt_array_async_filter', () => {
    assert.ok(belt.arrayAsyncFilter);
  });
  it('belt_array_async_map', () => {
    assert.ok(belt.arrayAsyncMap);
  });
  it('belt_obj_first_key', () => {
    assert.ok(belt.objectFirstKey);
  });
  it('belt_array_async_foreach', () => {
    assert.ok(belt.arrayAsyncForEach);
  });
  it('belt_platform_detector', () => {
    assert.ok(belt.isNodeJS);
    assert.ok(belt.isMobileDevice);
  });
  it('belt_error', () => {
    assert.ok(belt.isSyntaxError);
    assert.ok(belt.asError);
  });
  it('belt_base64', () => {
    assert.ok(belt.fromBase64);
    assert.ok(belt.toBase64);
  });
  it('belt_anti_bounce', () => {
    assert.ok(belt.antiBounce);
    assert.ok(belt.AntiBounce);
    assert.ok(belt.disposeAntiBounces);
  });
  it('belt_json_ignore', () => {
    assert.ok(belt.jsonIgnore);
  });
  it('belt_memory_rw', () => {
    assert.ok(belt.MemoryReader);
    assert.ok(belt.MemoryWriter);
  });
});