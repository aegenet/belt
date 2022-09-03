# @aegenet/belt-benchmark

> Benchmark your functions like an F1 driver

## Browser

### Bench a function
```typescript
import { Racetrack } from '@aegenet/belt-benchmark';

const racetrack = new Racetrack({
  laps: 100,
});
let i = 0;
const stats = await racetrack.race({
  spec: ctx => {
    // ctx.begin();
    i++;
    // ctx.end();
  },
});

console.table(stats.map(f => f.humanize()));
```

### More accurate

```typescript
import { Racetrack } from '@aegenet/belt-benchmark';

const racetrack = new Racetrack({
  laps: 100,
});
let i = 0;
const stats = await racetrack.race({
  spec: ctx => {
    ctx.begin();
    i++;
    ctx.end();
  },
});

console.table(stats.map(f => f.humanize()));
```

## Bench WAR
```typescript
import { Racetrack } from '@aegenet/belt-benchmark';

const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];

const racetrack = new Racetrack({
  laps: 1000,
});
const stats = await racetrack.race(
  {
    name: 'for i',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      ctx.begin();
      for (let i = 0; i < samples.length; i++) {
        count += samples[i];
      }
      ctx.end();
      return count;
    },
  },
  {
    name: 'for of',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      ctx.begin();
      for (const val of samples) {
        count += val;
      }
      ctx.end();
      return count;
    },
  },
  {
    name: 'forEach',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      ctx.begin();
      samples.forEach(val => {
        count += val;
      });
      ctx.end();
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
  laps: 100,
});
let i = 0;
const stats = await racetrack.race({
  spec: ctx => {
    // ctx.begin();
    i++;
    // ctx.end();
  },
});

console.table(stats.map(f => f.humanize()));
```

### More accurate

```typescript
import { NodeRacetrack } from '@aegenet/belt-benchmark';

const racetrack = new NodeRacetrack({
  laps: 100,
});
let i = 0;
const stats = await racetrack.race({
  spec: ctx => {
    ctx.begin();
    i++;
    ctx.end();
  },
});

console.table(stats.map(f => f.humanize()));
```

## Bench WAR
```typescript
const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];

const racetrack = new NodeRacetrack({
  laps: 1000,
});
const stats = await racetrack.race(
  {
    name: 'for i',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      ctx.begin();
      for (let i = 0; i < samples.length; i++) {
        count += samples[i];
      }
      ctx.end();
      return count;
    },
  },
  {
    name: 'for of',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      ctx.begin();
      for (const val of samples) {
        count += val;
      }
      ctx.end();
      return count;
    },
  },
  {
    name: 'forEach',
    spec: (ctx: ILapContext<number>) => {
      let count = ctx.value || 0;
      ctx.begin();
      samples.forEach(val => {
        count += val;
      });
      ctx.end();
      return count;
    },
  }
);

console.table(stats.map(f => f.humanize()));
```