import * as assert from 'node:assert';
import * as belt from './browser';

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
    assert.ok(belt.getClosestNumber);
    assert.ok(belt.getClosestValue);
    assert.ok(belt.getPercentile);
    assert.ok(belt.p10);
    assert.ok(belt.p25);
    assert.ok(belt.p50);
    assert.ok(belt.p75);
    assert.ok(belt.p90);
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
    assert.ok(belt.mutateErrorWithRef);
    assert.ok(belt.getErrorMessage);
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
    assert.ok(belt.MemoryCreator);
  });
  it('belt_light_date', () => {
    assert.ok(belt.LightDate);
    assert.ok(belt.getDayNames);
    assert.ok(belt.getMonthNames);
    assert.ok(belt.inputDateTimeToDate);
    assert.ok(belt.dateToInputDateTime);
    assert.ok(belt.inputDateToDate);
    assert.ok(belt.dateToInputDate);
    assert.ok(belt.getCurrentTimezone);
  });
  it('belt_readdir', () => {
    // Not implemented
    assert.ok(belt.readdir);
  });
  it('belt_extract_domain', () => {
    // Not implemented
    assert.ok(belt.extractDomain);
  });
  it('belt_benchmark', () => {
    assert.ok(belt.RaceResult);
    assert.ok(belt.RaceTime);
    assert.ok(belt.Racetrack);
  });
  it('belt_array_string_join', () => {
    assert.ok(belt.stringConcat);
    assert.ok(belt.stringJoin);
  });
  it('belt_fetch', () => {
    assert.ok(belt.fetchEnsure);
    assert.ok(belt.fetchFormatPayload);
  });
  it('belt_obj_monitoring', () => {
    assert.ok(belt.ObjectMonitoring);
    assert.ok(belt.deepSetMutate);
    assert.ok(belt.deepSetProxy);
  });
  it('belt_hide_sensitive', () => {
    assert.ok(belt.createHideSensitiveFunction);
  });
  it('belt_rows_inflator', () => {
    assert.ok(belt.rowsInflator);
    assert.ok(belt.ERowsInflatorAssociation);
  });
  it('belt_duration', () => {
    assert.ok(belt.toDuration);
    assert.ok(belt.fromDuration);
    assert.ok(belt.EDurationFormat);
    assert.ok(belt.EDurationFormatMask);
    assert.ok(belt.EDurationMask);
  });
  it('belt_string_split', () => {
    assert.ok(belt.StringSplit);
  });
});
