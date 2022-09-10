# @aegenet/belt-benchmark

> Benchmark your functions like an F1 driver
> Specify the duration, setup the <s>cars</s> functions and start your engine.

## Browser

> Warning! The accuracy of the browsers is not good at all, so we have to provide large samples per lap.
>
> By default, for browsers, we try to have 4ms per lap.
>
> For Firefox, we encourage you to set this value to 400ms via `{ accuracy: { unit: 'ms', value: 400 }`.
>

### Bench a function
```typescript
import { Racetrack } from '@aegenet/belt-benchmark';

const racetrack = new Racetrack({
  duration: 5000, // 5 seconds
});
let i = 0;
const stats = await racetrack.race({
  spec: ctx => {
    i++;
  },
});

console.table(stats.map(f => f.humanize()));
```

### Bench WAR
```typescript
import { Racetrack } from '@aegenet/belt-benchmark';

const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];

const racetrack = new Racetrack({
  duration: 15000, // 15 seconds
});
const stats = await racetrack.race(
  {
    name: 'for i',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      for (let i = 0; i < samples.length; i++) {
        count += samples[i];
      }
      return count;
    },
  },
  {
    name: 'for of',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      for (const val of samples) {
        count += val;
      }
      return count;
    },
  },
  {
    name: 'forEach',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      samples.forEach(val => {
        count += val;
      });
      return count;
    },
  }
);

console.table(stats.map(f => f.humanize()));
```

## Node.js

### Bench a function
```typescript
import { NodeRacetrack } from '@aegenet/belt-benchmark';

const racetrack = new NodeRacetrack({
  duration: 5000
});
let i = 0;
const stats = await racetrack.race({
  spec: ctx => {
    i++;
  },
});

console.table(stats.map(f => f.humanize()));
```

### Bench WAR
```typescript
const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];

const racetrack = new NodeRacetrack({
  duration: 5000,
});
const stats = await racetrack.race(
  {
    name: 'for i',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      for (let i = 0; i < samples.length; i++) {
        count += samples[i];
      }
      return count;
    },
  },
  {
    name: 'for of',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      for (const val of samples) {
        count += val;
      }
      return count;
    },
  },
  {
    name: 'forEach',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      samples.forEach(val => {
        count += val;
      });
      return count;
    },
  }
);

console.table(stats.map(f => f.humanize()));
```