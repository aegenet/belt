import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function asyncFunctionVSFunction(duration: number): Promise<RaceResult[]> {
  const asyncFunction = async (ctx: ILapContext) => {
    return ctx.value || true;
  };

  const notAsyncFunction = (ctx: ILapContext) => {
    return ctx.value || true;
  };

  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Async Function VS Function',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Async function',
      isAsync: true,
      explain: `const asyncFunction = async (ctx: ILapContext) => {
  return ctx.value || true;
};

await asyncFunction(ctx);`,
      spec: asyncFunction,
    },
    {
      name: 'Not async function',
      explain: `const notAsyncFunction = (ctx: ILapContext) => {
        return ctx.value || true;
      };
      
      asyncFunction(ctx);`,
      spec: notAsyncFunction,
    }
  );
  return stats;
}
