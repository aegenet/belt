import type { RaceResult } from '../src/common';
import { warOfSort } from './tests/war-of-sort';
import { alphanumFight } from './tests/alphanum-fight';
import { arrayJoin } from './tests/array-join';
import { asyncFunctionVSFunction } from './tests/async-function-vs-function';
import { composeString } from './tests/compose-string';
import { costOfTryCatch } from './tests/cost-of-try-catch';
import { dateNowVSGetTime } from './tests/date-now-vs-get-time';
import { declareFunctionVSDynamic } from './tests/declare-function-vs-dynamic';
import { declareInLoop } from './tests/declare-in-loop';
import { dynamicFunctionVSArrow } from './tests/dynamic-function-vs-arrow';
import { getMapVSObjectVSSwitchVSIf } from './tests/get-map-vs-object-vs-switch-vs-if';
import { ifElseOrNot } from './tests/if-else-or-not';
import { joinStringArray } from './tests/join-string-array';
import { loopOfKeyValues } from './tests/loop-of-keyval';
import { newObjectVSCurlyBraces } from './tests/new-object-vs-curly-braces';
import { setMapVSObject } from './tests/set-map-vs-object';
import { setVSInVSRegex } from './tests/set-vs-in-vs-regex';
import { specificJoinArray } from './tests/specific-join-array';
import { warOfLoop } from './tests/war-of-loop';
import { workersWar } from './tests/workers-war';
import { warOfReduce } from './tests/war-of-reduce';
import { warOfCopyArray } from './tests/war-of-copy-array';
import { consoleOutput } from './providers/bench-console';
import { createJSON } from './providers/bench-json';
import { createMarkdown } from './providers/bench-doc';

const allBench: Record<string, (duration: number) => Promise<RaceResult[]>> = {
  arrayJoin: arrayJoin,
  specificJoinArray: specificJoinArray,
  warOfLoopObj10: duration => warOfLoop(duration, 10, 'object'),
  warOfLoopObj1000: duration => warOfLoop(duration, 1000, 'object'),
  warOfLoopObj1000000: duration => warOfLoop(duration, 1000000, 'object'),
  warOfLoopNum10: duration => warOfLoop(duration, 10, 'number'),
  warOfLoopNum1000: duration => warOfLoop(duration, 1000, 'number'),
  warOfLoopNum1000000: duration => warOfLoop(duration, 1000000, 'number'),
  warOfLoopStr10: duration => warOfLoop(duration, 10, 'string'),
  warOfLoopStr1000: duration => warOfLoop(duration, 1000, 'string'),
  warOfLoopStr1000000: duration => warOfLoop(duration, 1000000, 'string'),
  warOfReduceObj10: duration =>
    warOfReduce(duration, {
      arraySize: 10,
      itemType: 'object',
    }),
  warOfReduceObj1000: duration =>
    warOfReduce(duration, {
      arraySize: 1000,
      itemType: 'object',
    }),
  warOfReduceObj50000: duration =>
    warOfReduce(duration, {
      arraySize: 50000,
      itemType: 'object',
    }),
  warOfReduceObj1000000: duration =>
    warOfReduce(duration, {
      arraySize: 1000000,
      itemType: 'object',
    }),
  warOfReduceNum10: duration =>
    warOfReduce(duration, {
      arraySize: 10,
      itemType: 'number',
    }),
  warOfReduceNum1000: duration =>
    warOfReduce(duration, {
      arraySize: 1000,
      itemType: 'number',
    }),
  warOfReduceNum50000: duration =>
    warOfReduce(duration, {
      arraySize: 50000,
      itemType: 'number',
    }),
  warOfReduceNum1000000: duration =>
    warOfReduce(duration, {
      arraySize: 1000000,
      itemType: 'number',
    }),
  warOfReduceStr10: duration =>
    warOfReduce(duration, {
      arraySize: 10,
      itemType: 'string',
    }),
  warOfReduceStr1000: duration =>
    warOfReduce(duration, {
      arraySize: 1000,
      itemType: 'string',
    }),
  warOfReduceStr50000: duration =>
    warOfReduce(duration, {
      arraySize: 50000,
      itemType: 'string',
    }),
  warOfReduceStr1000000: duration =>
    warOfReduce(duration, {
      arraySize: 1000000,
      itemType: 'string',
    }),
  warOfSortObj10: duration => warOfSort(duration, 10, 'object'),
  warOfSortObj1000: duration => warOfSort(duration, 1000, 'object'),
  warOfSortObj1000000: duration => warOfSort(duration, 1000000, 'object'),
  warOfSortNum10: duration => warOfSort(duration, 10, 'number'),
  warOfSortNum1000: duration => warOfSort(duration, 1000, 'number'),
  warOfSortNum1000000: duration => warOfSort(duration, 1000000, 'number'),
  warOfSortStr10: duration => warOfSort(duration, 10, 'string'),
  warOfSortStr1000: duration => warOfSort(duration, 1000, 'string'),
  warOfSortStr1000000: duration => warOfSort(duration, 1000000, 'string'),
  loopOfKeyValues: loopOfKeyValues,
  declareInLoop: declareInLoop,
  joinStringArray: joinStringArray,
  getMapVSObjectVSSwitchVSIf: getMapVSObjectVSSwitchVSIf,
  setMapVSObject: setMapVSObject,
  ifElseOrNot: ifElseOrNot,
  setVSInVSRegex: setVSInVSRegex,
  workersWar: workersWar,
  dynamicFunctionVSArrow: dynamicFunctionVSArrow,
  declareFunctionVSDynamic: declareFunctionVSDynamic,
  composeString: composeString,
  asyncFunctionVSFunction: asyncFunctionVSFunction,
  dateNowVSGetTime: dateNowVSGetTime,
  newObjectVSCurlyBraces: newObjectVSCurlyBraces,
  alphanumFight: alphanumFight,
  costOfTryCatch: costOfTryCatch,
  warOfCopyArrayObj10: duration => warOfCopyArray(duration, 10, 'object'),
  warOfCopyArrayObj1000: duration => warOfCopyArray(duration, 1000, 'object'),
  warOfCopyArrayObj1000000: duration => warOfCopyArray(duration, 1000000, 'object'),
  warOfCopyArrayNum10: duration => warOfCopyArray(duration, 10, 'number'),
  warOfCopyArrayNum1000: duration => warOfCopyArray(duration, 1000, 'number'),
  warOfCopyArrayNum1000000: duration => warOfCopyArray(duration, 1000000, 'number'),
  warOfCopyArrayStr10: duration => warOfCopyArray(duration, 10, 'string'),
  warOfCopyArrayStr1000: duration => warOfCopyArray(duration, 1000, 'string'),
  warOfCopyArrayStr1000000: duration => warOfCopyArray(duration, 1000000, 'string'),
};

export async function benchmark(
  options: {
    fileName?: string;
    duration;
    benchName?;
    // nodeVersion;
  } = {
    duration: 1000,
    // nodeVersion: undefined,
  }
) {
  if (options.benchName) {
    if (!options.fileName) {
      await consoleOutput(async () => await allBench[options.benchName](options.duration));
    } else if (options.fileName.endsWith('.json')) {
      await createJSON(options.fileName, async () => await allBench[options.benchName](options.duration));
    } else {
      await createMarkdown(options.fileName, async () => await allBench[options.benchName](options.duration));
    }
  } else {
    if (!options.fileName) {
      await consoleOutput(...Object.values(allBench).map(f => async () => await f(options.duration)));
    } else if (options.fileName.endsWith('.json')) {
      await createJSON(options.fileName, ...Object.values(allBench).map(f => async () => await f(options.duration)));
    } else {
      await createMarkdown(options.fileName, ...Object.values(allBench).map(f => async () => await f(options.duration)));
    }
  }
}
