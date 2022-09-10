import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function setMapVSObject(duration: number): Promise<RaceResult[]> {
  const map: Map<string, any> = new Map();
  const map2: Map<number, any> = new Map();
  const map3: Map<string, any> = new Map();
  const map4: Map<string, any> = new Map();
  const map5: Map<symbol, any> = new Map();
  const objMap: Record<string, any> = {};
  const objMap2: Record<number, any> = {};
  const objMap3: Record<string, any> = {};
  const objMap4: Record<string, any> = {};
  const objMap5: Record<symbol, any> = {};

  const racetrack: Racetrack = new NodeRacetrack({
    name: '[Set/Get] Map VS Object',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Map (small key)',
      explain: `map.set('1234', value);
return map.get('1234');
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        map.set(`${ctx.lap}`, ctx.value as any);
        return map.get(`${ctx.lap}`);
      },
    },
    {
      name: 'Map (numeric key)',
      explain: `map.set(1234, value);
return map.get(1234);
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        map2.set(ctx.lap, ctx.value as any);
        return map2.get(ctx.lap);
      },
    },
    {
      name: 'Map',
      explain: `map.set('keywithalenght', value);
return map.get('keywithalenght');
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        map3.set(`something-${ctx.lap}`, ctx.value as any);
        return map3.get(`something-${ctx.lap}`);
      },
    },
    {
      name: 'Map (very long key)',
      explain: `map.set('something-else-everyon-ok-super-ultra', value);
return map.get('something-else-everyon-ok-super-ultra');
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        map4.set(`something-else-everyon-ok-super-ultra-${ctx.lap}`, ctx.value as any);
        return map4.get(`something-else-everyon-ok-super-ultra-${ctx.lap}`);
      },
    },
    {
      name: 'Map (symbol key)',
      explain: `map.set(Symbol.for('abcdef'), value);
return map.get(Symbol.for('abcdef'));
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        map5.set(Symbol.for(`n°${ctx.lap}`), ctx.value as any);
        return map5.get(Symbol.for(`n°${ctx.lap}`));
      },
    },
    {
      name: 'Object',
      explain: `obj['keywithalenght'] = value;
return obj['keywithalenght'];
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        objMap[`something-${ctx.lap}`] = ctx.value;
        return objMap[`something-${ctx.lap}`];
      },
    },
    {
      name: 'Object (small key)',
      explain: `obj['1234'] = value;
return obj['1234'];
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        objMap3[`${ctx.lap}`] = ctx.value;
        return objMap3[`${ctx.lap}`];
      },
    },
    {
      name: 'Object (very long key)',
      explain: `obj['1234'] = value;
return obj['1234'];
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        objMap4[`something-else-everyon-ok-super-ultra-${ctx.lap}`] = ctx.value;
        return objMap4[`something-else-everyon-ok-super-ultra-${ctx.lap}`];
      },
    },
    {
      name: 'Object (numeric key)',
      explain: `obj[1234] = value;
return obj[1234];
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        objMap2[ctx.lap] = ctx.value;
        return objMap2[ctx.lap];
      },
    },
    {
      name: 'Object (symbol key)',
      explain: `obj[Symbol.for(abcdef)] = value;
return obj[Symbol.for(abcdef)];
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        objMap5[Symbol.for(`n0${ctx.lap}`)] = ctx.value;
        return objMap5[Symbol.for(`n0${ctx.lap}`)];
      },
    }
  );
  return stats;
}
