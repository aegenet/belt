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
      explain: `const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);`,
      spec: asyncFunctionArrow,
    },
    {
      name: 'Not async function (arrow)',
      explain: `const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);`,
      spec: notAsyncFunctionArrow,
    },
    {
      name: 'Not async function',
      explain: `function notAsyncFunction(ctx: ILapContext) {
        return ctx.value || true;
      };
      
      notAsyncFunction(ctx);`,
      spec: notAsyncFunction,
    },
    {
      name: 'Async function',
      async: true,
      explain: `async function asyncFunction(ctx: ILapContext) {
  return ctx.value || true;
};

await asyncFunction(ctx);`,
      spec: asyncFunction,
    },
    {
      name: 'Promise function (arrow, without async keyword)',
      async: true,
      explain: `function promiseFunction(ctx: ILapContext) {
  return Promise.resolve(ctx.value || true);
};

await promiseFunction(ctx);`,
      spec: promiseFunctionArrow,
    },
    {
      name: 'Promise function (without async keyword)',
      async: true,
      explain: `const promiseFunction = async (ctx: ILapContext) => {
        return Promise.resolve(ctx.value || true);
      };
      
      await promiseFunction(ctx);`,
      spec: promiseFunction,
    }
  );
  return stats;
}
