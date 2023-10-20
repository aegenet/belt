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
  warOfLoop10: duration => warOfLoop(duration, 10),
  warOfLoop1000: duration => warOfLoop(duration, 1000),
  warOfLoop10000: duration => warOfLoop(duration, 10000),
  warOfLoop100000: duration => warOfLoop(duration, 100000),
  warOfLoop1000000: duration => warOfLoop(duration, 1000000),
  warOfReduce10: duration =>
    warOfReduce(duration, {
      arraySize: 10,
    }),
  warOfReduce1000: duration =>
    warOfReduce(duration, {
      arraySize: 1000,
    }),
  warOfReduce10000: duration =>
    warOfReduce(duration, {
      arraySize: 10000,
    }),
  warOfReduce20000: duration =>
    warOfReduce(duration, {
      arraySize: 20000,
    }),
  warOfReduce50000: duration =>
    warOfReduce(duration, {
      arraySize: 50000,
    }),
  warOfReduce100000: duration =>
    warOfReduce(duration, {
      arraySize: 100000,
    }),
  warOfReduce1000000: duration =>
    warOfReduce(duration, {
      arraySize: 1000000,
    }),
  warOfSort10: duration => warOfSort(duration, 10),
  warOfSort1000: duration => warOfSort(duration, 1000),
  warOfSort10000: duration => warOfSort(duration, 10000),
  warOfSort100000: duration => warOfSort(duration, 100000),
  warOfSort1000000: duration => warOfSort(duration, 1000000),
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
  warOfCopyArray10: duration => warOfCopyArray(duration, 10),
  warOfCopyArray1000: duration => warOfCopyArray(duration, 1000),
  warOfCopyArray10000: duration => warOfCopyArray(duration, 10000),
  warOfCopyArray100000: duration => warOfCopyArray(duration, 100000),
  warOfCopyArray1000000: duration => warOfCopyArray(duration, 1000000),
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
