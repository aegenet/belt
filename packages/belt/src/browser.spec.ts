/**
 * @vitest-environment jsdom
 */
import { describe, test } from 'vitest';
import * as assert from 'node:assert';
import * as belt from './browser';

describe('all-in-one', () => {
  test('belt_crc8', () => {
    assert.ok(belt.crc8);
  });
  test('belt_crc32', () => {
    assert.ok(belt.crc32);
  });
  test('belt_promise', () => {
    assert.ok(belt.collectSequentially);
    assert.ok(belt.delay);
    assert.ok(belt.isPromise);
    assert.ok(belt.runSequentially);
  });
  test('belt_odeep', () => {
    assert.ok(belt.ODeepGet);
    assert.ok(belt.ODeepSet);
  });
  test('belt_ofields', () => {
    assert.ok(belt.ofields);
  });
  test('belt_odiff', () => {
    assert.ok(belt.odiff);
  });
  test('belt_oclone', () => {
    assert.ok(belt.oclone);
  });
  test('belt_hook', () => {
    assert.ok(belt.BELT_HOOK_PREFIX);
    assert.ok(belt.hook);
  });
  test('belt_interpolation', () => {
    assert.ok(belt.Interpolation);
    assert.ok(belt.transform);
  });
  test('belt_array_duplicates', () => {
    assert.ok(belt.getDuplicates);
    assert.ok(belt.stripDuplicates);
  });
  test('belt_array_to_obj', () => {
    assert.ok(belt.arrayToObject);
  });
  test('belt_array_stats', () => {
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
  test('belt_obj_to_array', () => {
    assert.ok(belt.objectToArray);
  });
  test('belt_obj_is_empty', () => {
    assert.ok(belt.objectIsEmpty);
  });
  test('belt_obj_is_equals', () => {
    assert.ok(belt.objectsIsEquals);
    assert.ok(belt.objectsIsNotEquals);
  });
  test('belt_obj_to_map', () => {
    assert.ok(belt.objectToMap);
  });
  test('belt_str_escape_regex', () => {
    assert.ok(belt.escapeRegex);
  });
  test('belt_symbols_is_balanced', () => {
    assert.ok(belt.symbolsIsBalanced);
  });
  test('belt_array_async_filter', () => {
    assert.ok(belt.arrayAsyncFilter);
  });
  test('belt_array_async_map', () => {
    assert.ok(belt.arrayAsyncMap);
  });
  test('belt_obj_first_key', () => {
    assert.ok(belt.objectFirstKey);
  });
  test('belt_array_async_foreach', () => {
    assert.ok(belt.arrayAsyncForEach);
  });
  test('belt_platform_detector', () => {
    assert.ok(belt.isNodeJS);
    assert.ok(belt.isMobileDevice);
  });
  test('belt_error', () => {
    assert.ok(belt.isSyntaxError);
    assert.ok(belt.asError);
    assert.ok(belt.mutateErrorWithRef);
    assert.ok(belt.getErrorMessage);
  });
  test('belt_base64', () => {
    assert.ok(belt.fromBase64);
    assert.ok(belt.toBase64);
  });
  test('belt_anti_bounce', () => {
    assert.ok(belt.antiBounce);
    assert.ok(belt.AntiBounce);
    assert.ok(belt.disposeAntiBounces);
  });
  test('belt_json_ignore', () => {
    assert.ok(belt.jsonIgnore);
  });
  test('belt_memory_rw', () => {
    assert.ok(belt.MemoryReader);
    assert.ok(belt.MemoryWriter);
    assert.ok(belt.MemoryCreator);
  });
  test('belt_light_date', () => {
    assert.ok(belt.LightDate);
    assert.ok(belt.getDayNames);
    assert.ok(belt.getMonthNames);
    assert.ok(belt.inputDateTimeToDate);
    assert.ok(belt.dateToInputDateTime);
    assert.ok(belt.inputDateToDate);
    assert.ok(belt.dateToInputDate);
    assert.ok(belt.getCurrentTimezone);
  });
  test('belt_readdir', () => {
    // Not implemented
    assert.ok(belt.readdir);
  });
  test('belt_extract_domain', () => {
    // Not implemented
    assert.ok(belt.extractDomain);
  });
  test('belt_benchmark', () => {
    assert.ok(belt.RaceResult);
    assert.ok(belt.RaceTime);
    assert.ok(belt.Racetrack);
  });
  test('belt_array_string_join', () => {
    assert.ok(belt.stringConcat);
    assert.ok(belt.stringJoin);
  });
  test('belt_fetch', () => {
    assert.ok(belt.fetchEnsure);
    assert.ok(belt.fetchFormatPayload);
    assert.ok(belt.bFetch);
  });
  test('belt_obj_monitoring', () => {
    assert.ok(belt.ObjectMonitoring);
    assert.ok(belt.deepSetMutate);
    assert.ok(belt.deepSetProxy);
  });
  test('belt_hide_sensitive', () => {
    assert.ok(belt.createHideSensitiveFunction);
  });
  test('belt_rows_inflator', () => {
    assert.ok(belt.rowsInflator);
    assert.ok(belt.ERowsInflatorAssociation);
  });
  test('belt_duration', () => {
    assert.ok(belt.toDuration);
    assert.ok(belt.fromDuration);
    assert.ok(belt.EDurationFormat);
    assert.ok(belt.EDurationFormatMask);
    assert.ok(belt.EDurationMask);
  });
  test('belt_string_split', () => {
    assert.ok(belt.StringSplit);
  });
  test('belt_task_flow', () => {
    assert.ok(belt.taskFlowMethod);
    assert.ok(belt.TaskFlow);
    assert.ok(belt.TaskFlowHandler);
    assert.ok(belt.TaskFlowListener);
  });
  test('belt_argv_to_obj', () => {
    assert.ok(belt.argvToObject);
  });
  test('belt_env_to_obj', () => {
    assert.ok(belt.envToObject);
  });
  test('belt_memory_cache', () => {
    assert.ok(belt.MemoryCache);
  });
});
