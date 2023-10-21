import * as path from 'node:path';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import { Worker } from 'node:worker_threads';

export async function workersWar(duration: number): Promise<RaceResult[]> {
  const raceTrack: Racetrack = new NodeRacetrack({
    name: 'Workers War',
    duration,
  });
  let cpt = 0;

  const workerLife = new Worker(path.join(process.cwd(), 'tests', 'worker-test-2.js'), {
    stdout: false,
    stderr: false,
  });
  const workerLifeEval = new Worker(
    `const { parentPort } = require('node:worker_threads');

  parentPort.on('message', data => {
    parentPort.postMessage(data);
  });
  `,
    {
      eval: true,
      stdout: false,
      stderr: false,
    }
  );

  const stats = await raceTrack.race(
    {
      async: true,
      name: 'new Worker',
      explain: `
    new Worker() each time
    `,
      spec: async (ctx: ILapContext<number>) => {
        let worker: Worker;
        await new Promise((resolve, reject) => {
          worker = new Worker(path.join(process.cwd(), 'tests', 'worker-test.js'), {
            stdout: false,
            stderr: false,
            workerData: {
              processId: cpt++,
            },
          });
          worker.once('message', async data => {
            resolve(data);
          });
        });
        await worker.removeAllListeners().terminate();
      },
    },
    {
      async: true,
      name: 'new Worker Eval',
      explain: `
    new Worker('code') each time
    `,
      spec: async (ctx: ILapContext<number>) => {
        let worker: Worker;
        await new Promise((resolve, reject) => {
          worker = new Worker("const { workerData, parentPort } = require('node:worker_threads'); parentPort.postMessage(workerData);", {
            stdout: false,
            stderr: false,
            eval: true,
            workerData: {
              processId: cpt++,
            },
          });
          worker.once('message', async data => {
            resolve(data);
          });
        });
        await worker.removeAllListeners().terminate();
      },
    },
    {
      async: true,
      name: 'One Worker',
      explain: `
const worker = new Worker(); each time worker.send
`,
      spec: async (ctx: ILapContext<number>) => {
        return new Promise((resolve, reject) => {
          workerLife.once('message', data => {
            resolve(data);
          });
          workerLife.postMessage(cpt++);
        });
      },
    },
    {
      async: true,
      name: 'One Worker Eval',
      explain: `
const worker = new Worker('code'); each time worker.send
`,
      spec: async (ctx: ILapContext<number>) => {
        return new Promise((resolve, reject) => {
          workerLifeEval.once('message', data => {
            resolve(data);
          });
          workerLifeEval.postMessage(cpt++);
        });
      },
    }
  );

  await workerLife.terminate();
  await workerLifeEval.terminate();
  return stats;
}
