import * as fs from 'node:fs';
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

async function createMarkdown(fileName: string, ...races: (() => Promise<RaceResult[]>)[]): Promise<void> {
  await fs.promises.writeFile(fileName, `# Benchmark Node.js v${process.versions.node}\n\n`, {
    encoding: 'utf-8',
  });

  for (let i = 0; i < races.length; i++) {
    const race = await races[i]();
    console.log(`Race: ${race[0].raceName}`);
    console.table(race.map(f => f.humanize()));
    await fs.promises.appendFile(fileName, createMarkdownForRace(...race), {
      encoding: 'utf-8',
    });
  }
}

function createMarkdownForRace(...raceResult: RaceResult[]) {
  let md = _tableHeader(raceResult[0]) + '\n';
  for (let i = 0; i < raceResult.length; i++) {
    md += _tableRow(raceResult[i]) + '\n';
  }
  return md + '</table>\n\n';
}

function _tableHeader(raceResult: RaceResult) {
  return `## ${raceResult.raceName} (${raceResult.laps.length} laps, ${raceResult.samplesPerLap} samples per lap)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>
`;
}

function _tableRow(result: RaceResult) {
  return `<tr>
    <td>${result.position}</td><td>${result.car.name}</td><td><pre lang="typescript"><code>\n${result.car.explain || ''}\n</code></pre></td><td>${result.fastestLap}</td><td>${result.slowestLap}</td><td>${result.average}</td><td${
      result.position === 1 ? ' style="color:green"' : ''
    }><strong>${result.p50}</strong></td><td>${result.p75}</td><td>${result.p90}</td><td>${result.ratio?.toFixed(2)}</td><td>${result.duration}</td>
</tr>
`;
}

export async function benchmark(fileName: string, duration = 1000) {
  await createMarkdown(
    fileName,
    async () => await arrayJoin(duration),
    async () => await specificJoinArray(duration),
    async () => await warOfLoop(duration),
    async () => await warOfSort(duration),
    async () => await loopOfKeyValues(duration),
    async () => await declareInLoop(duration),
    async () => await joinStringArray(duration),
    async () => await getMapVSObjectVSSwitchVSIf(duration),
    async () => await setMapVSObject(duration),
    async () => await ifElseOrNot(duration),
    async () => await setVSInVSRegex(duration),
    async () => await workersWar(duration),
    async () => await dynamicFunctionVSArrow(duration),
    async () => await declareFunctionVSDynamic(duration),
    async () => await composeString(duration),
    async () => await asyncFunctionVSFunction(duration),
    async () => await dateNowVSGetTime(duration),
    async () => await newObjectVSCurlyBraces(duration),
    async () => await alphanumFight(duration),
    async () => await costOfTryCatch(duration)
  );
}
