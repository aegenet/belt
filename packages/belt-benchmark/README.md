[![npm version](https://img.shields.io/npm/v/@aegenet/belt-benchmark.svg)](https://www.npmjs.com/package/@aegenet/belt-benchmark)
<br>

# @aegenet/belt-benchmark

> Benchmark your javascript functions
> Specify the duration, setup the <s>cars</s> functions and start your engine.

## 💾 Installation

```shell
yarn add @aegenet/belt-benchmark@^2.0.0
# or
npm i @aegenet/belt-benchmark@^2.0.0
```

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
import { NodeRacetrack } from '@aegenet/belt-benchmark';

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

### Reporters

#### Console output

```typescript
import { NodeRacetrack } from '@aegenet/belt-benchmark';
import { consoleOutput } from '@aegenet/belt-benchmark/reporter';

const racetrack = new NodeRacetrack({
  name: 'The destiny',
  duration: 6000,
});

await consoleOutput(async () => {
    return await racetrack.race({
      spec: ctx => {
        // Something
      },
    });
  });
```

#### Markdown / HTML

```typescript
import { NodeRacetrack } from '@aegenet/belt-benchmark';
import { createMarkdown } from '@aegenet/belt-benchmark/reporter';

const racetrack = new NodeRacetrack({
  name: 'The destiny',
  duration: 6000,
});

await createMarkdown({ fileName: 'out.html' /* 'out.md' */ }, async () => {
  return await racetrack.race({
    spec: () => {
      // Something
    },
  });
});
```

#### JSON

```typescript
import { NodeRacetrack } from '@aegenet/belt-benchmark';
import { createMarkdown } from '@aegenet/belt-benchmark/reporter';

const racetrack = new NodeRacetrack({
  name: 'The destiny',
  duration: 6000,
});

await createJSON('out.json', async () => {
  return await racetrack.race({
    spec: () => {
      // Something
    },
  });
});
```