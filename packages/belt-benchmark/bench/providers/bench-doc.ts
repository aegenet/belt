import type { RaceResult } from '../../src/common/race-results';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { reSamplesData } from './bench-common';

export async function createMarkdown(fileName: string, ...races: (() => Promise<RaceResult[]>)[]): Promise<void> {
  const format = path.extname(fileName);
  await fs.promises.writeFile(
    fileName,
    `${
      format === 'md'
        ? '# '
        : `<html><head><meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head><body class="bg-gray-100 p-10"><h1 class="text-2xl font-semibold mb-4">`
    }Benchmark Node.js v${process.versions.node}${format === 'md' ? '' : '</h1>'}\n\n`,
    {
      encoding: 'utf-8',
    }
  );

  for (let i = 0; i < races.length; i++) {
    const race = await races[i]();
    console.log(`Race: ${race[0].raceName}`);
    console.table(race.map(f => f.humanize()));

    await fs.promises.appendFile(fileName, `${format !== 'md' ? '<div class="bg-white p-5 rounded-lg shadow-md mb-8">' : ''}${createMarkdownForRace(format as 'html' | 'md', ...race)}`, {
      encoding: 'utf-8',
    });

    if (format !== 'md') {
      const { html, script } = await createChart(race);
      await fs.promises.appendFile(fileName, `${html}${script}</div>`, {
        encoding: 'utf-8',
      });
    }
  }

  if (format !== 'md') {
    await fs.promises.appendFile(fileName, `</body></html>`, {
      encoding: 'utf-8',
    });
  }
}

function createMarkdownForRace(format: 'html' | 'md', ...raceResult: RaceResult[]) {
  let md = _tableHeader(format, raceResult[0]) + '\n';
  for (let i = 0; i < raceResult.length; i++) {
    md += _tableRow(raceResult[i]) + '\n';
  }
  return md + '</tbody></table>\n\n';
}

function _tableHeader(format: 'html' | 'md', raceResult: RaceResult) {
  return `${format === 'md' ? '## ' : '<h2 class="text-xl font-semibold mb-4">'}${raceResult.raceName} (${raceResult.laps.length} laps, ${raceResult.samplesPerLap} samples per lap)${format === 'md' ? '' : '</h2>'}

<table class="min-w-full border-b mb-4 text-sm">
  <thead>
    <tr>
      <th class="py-2 px-1 border-r">pos</th><th class="py-2 px-1 border-r">name</th><th class="py-2 px-1 border-r hidden lg:block">sample</th><th class="py-2 px-1 border-r">fastest</th><th class="py-2 px-1 border-r">slowest</th><th class="py-2 px-1 border-r">average</th><th class="py-2 px-1 border-r">p50</th><th class="py-2 px-1 border-r">p75</th><th class="py-2 px-1 border-r">p90</th><th class="py-2 px-1 border-r">ratio</th><th class="py-2 px-1 border-r">duration</th>
    </tr>
  </thead>
  <tbody>
`;
}

function _tableRow(result: RaceResult) {
  return `<tr>
    <td class="py-2 px-1 border-r">${result.position}</td><td class="py-2 px-1 border-r">${result.car.name}</td><td class="py-2 px-1 border-r text-xs hidden lg:block"><pre lang="typescript"><code>\n${
      result.car.explain || ''
    }\n</code></pre></td><td class="py-2 px-1 border-r">${result.fastestLap}</td><td class="py-2 px-1 border-r">${result.slowestLap}</td><td class="py-2 px-1 border-r">${result.average}</td><td class="py-2 px-1 border-r" ${
      result.position === 1 ? ' style="color:green"' : ''
    }><strong>${result.p50}</strong></td><td class="py-2 px-1 border-r">${result.p75}</td><td class="py-2 px-1 border-r">${result.p90}</td><td class="py-2 px-1 border-r">${result.ratio?.toFixed(2)}</td><td class="py-2 px-1 border-r">${
      result.duration
    }</td>
</tr>
`;
}

async function createChart(results: RaceResult[]): Promise<{
  script: string;
  html: string;
}> {
  const fastest = results.reduce((a, b) => {
    if (a < b.fastestLap.us) {
      return a;
    } else {
      return b.fastestLap.us;
    }
  }, Infinity);
  const slowest = results.reduce((a, b) => {
    if (a > b.slowestLap.us) {
      return a;
    } else {
      return b.slowestLap.us;
    }
  }, 0);

  const id = `chart_${results[0].raceName.replace(/ /g, '')}`;
  const samples = 256;
  const chartColors = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99E6E6', '#6666FF', '#3DCD58', '#FFDB58', '#E67300', '#8B0707', '#329262', '#800000', '#B33300', '#CC80CC', '#66664D', '#4D8000'];
  const datasets = results.map((res, idx) => {
    return {
      // stepped: true,
      tension: 0.4,
      fill: false,
      borderColor: chartColors[idx % chartColors.length],
      borderWidth: 1,
      label: res.car.name,
      data: reSamplesData(
        res.laps.map(f => f.us),
        samples
      ),
      pointStyle: false,
    };
  });

  return {
    html: `<div>
  <canvas id="${id}"></canvas>
</div>`,
    script: `

<script>
  new Chart(document.getElementById('${id}'), {
    type: 'line',
    data: {
      labels: ${JSON.stringify(datasets[0].data.map((lap, idx) => idx + 1))},
      datasets: ${JSON.stringify([
        ...datasets,
        ...results.map((res, idx) => {
          return {
            // stepped: true,
            // tension: 0.4,
            fill: false,
            borderDash: [5, 5],
            borderColor: chartColors[idx % chartColors.length],
            label: `${res.car.name} p50`,
            data: new Array(datasets[0].data.length).fill(res.p50.us),
            pointStyle: false,
          };
        }),
      ])}
    },
    options: {
      // plugins: {
      //   decimation: {
      //       enabled: true,
      //       samples: ${samples},
      //       algorithm: 'min-max',
      //   }
      // },
      interaction: {
        intersect: false,
        axis: 'x',
      },
      scales: {
        y: {
          // max: ${slowest},
          // min: ${fastest},
          type: 'logarithmic',
          title: {
            display: true,
            text: 'µs'
          }
        },
        x: {
          title: {
            display: true,
            text: 'samples (${new Intl.NumberFormat().format(results[0].laps.length * results[0].samplesPerLap)})'
          },
          type: 'linear',
          // bounds: 'data',
          // maxTicksLimit: 64,
          // type: 'logarithmic',
        }
      },
      title: {
        display: true,
        text: ${JSON.stringify(results[0].raceName)},
      },
    },
  });
</script>
    `,
  };
}

// async function createStaticChart(results: RaceResult[]): Promise<string> {
//   const chart = new QuickChart();
//   chart.setWidth(1024);
//   chart.setHeight(480);

//   const fastest = results.reduce((a, b) => {
//     if (a < b.fastestLap.us) {
//       return a;
//     } else {
//       return b.fastestLap.us;
//     }
//   }, Infinity);
//   const slowest = results.reduce((a, b) => {
//     if (a > b.slowestLap.us) {
//       return a;
//     } else {
//       return b.slowestLap.us;
//     }
//   }, 0);

//   // Config can be set as string or as a Javascript object
//   chart.setConfig(`{
//     type: 'line',
//     data: {
//       labels: ${JSON.stringify(results[0].laps.map((lap, idx) => idx + 1))},
//       datasets: ${JSON.stringify(
//         results.map(res => {
//           return {
//             stepped: true,
//             // tension: 0.4,
//             fill: false,
//             label: res.car.name,
//             data: res.laps.map(f => f.us),
//           };
//         })
//       )}
//     },
//     options: {
//       interaction: {
//         intersect: false,
//         axis: 'x'
//       },
//       scales: {
//         y: {
//           max: ${slowest},
//           min: ${fastest}
//         }
//       },
//       title: {
//         display: true,
//         text: ${JSON.stringify(results[0].raceName)},
//       },
//     },
//   }`);

//   // Or write it to a file
//   return await chart.toDataUrl();
// }
