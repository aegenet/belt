import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
}

function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
}

function notAsyncFunction(ctx: ILapContext) {
  return ctx.value || true;
}

export async function asyncFunctionVSFunction(duration: number): Promise<RaceResult[]> {
  const asyncFunctionArrow = async (ctx: ILapContext) => {
    return ctx.value || true;
  };

  const promiseFunctionArrow = (ctx: ILapContext) => {
    return Promise.resolve(ctx.value || true);
  };

  const notAsyncFunctionArrow = (ctx: ILapContext) => {
    return ctx.value || true;
  };

  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Async Function VS Function',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Async function (arrow)',
      async: true,
      spec: asyncFunctionArrow,
    },
    {
      name: 'Not async function (arrow)',
      spec: notAsyncFunctionArrow,
    },
    {
      name: 'Not async function',
      spec: notAsyncFunction,
    },
    {
      name: 'Async function',
      async: true,
      spec: asyncFunction,
    },
    {
      name: 'Promise function (arrow, without async keyword)',
      async: true,
      spec: promiseFunctionArrow,
    },
    {
      name: 'Promise function (without async keyword)',
      async: true,
      spec: promiseFunction,
    }
  );
  return stats;
}
