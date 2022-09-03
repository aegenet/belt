import * as fs from 'fs';
import type { RaceResult } from '../src/common';
import { declareFunctionVSDynamic } from './tests/declare-function-vs-dynamic';
import { declareInLoop } from './tests/declare-in-loop';
import { dynamicFunctionVSArrow } from './tests/dynamic-function-vs-arrow';
import { ifElseOrNot } from './tests/if-else-or-not';
import { joinStringArray } from './tests/join-string-array';
import { loopOfKeyValues } from './tests/loop-of-keyval';
import { mapVSObjectVSSwitchVSIf } from './tests/map-vs-object-vs-switch-vs-if';
import { setVSInVSRegex } from './tests/set-vs-in-vs-regex';
import { warOfLoop } from './tests/war-of-loop';

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
  return `## ${raceResult.raceName} (${raceResult.laps.length} laps)

<table>
  <tr>
    <th>pos</th><th>name</th><th>sample</th><th>fastest</th><th>slowest</th><th>average</th><th>p50</th><th>p75</th><th>p90</th><th>ratio</th><th>duration</th>
  </tr>
`;
}

function _tableRow(result: RaceResult) {
  return `<tr>
    <td>${result.position}</td><td>${result.car.name}</td><td><pre lang="typescript">\n${result.car.explain || ''}</pre></td><td>${result.fastestLap}</td><td>${result.slowestLap}</td><td>${result.average}</td><td>${result.p50}</td><td>${
    result.p75
  }</td><td>${result.p90}</td><td>${result.ratio?.toFixed(2)}</td><td>${result.duration}</td>
</tr>
`;
}

export async function benchmark(fileName: string, laps = 100) {
  await createMarkdown(
    fileName,
    async () => await warOfLoop(laps),
    async () => await loopOfKeyValues(laps),
    async () => await declareInLoop(laps),
    async () => await joinStringArray(laps),
    async () => await mapVSObjectVSSwitchVSIf(laps),
    async () => await ifElseOrNot(laps),
    async () => await setVSInVSRegex(laps),
    async () => await dynamicFunctionVSArrow(laps),
    async () => await declareFunctionVSDynamic(laps)
  );
}
