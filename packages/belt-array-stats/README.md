[![npm version](https://img.shields.io/npm/v/@aegenet/belt-array-stats.svg)](https://www.npmjs.com/package/@aegenet/belt-array-stats)
<br>

# @aegenet/belt-array-stats

> Stats from array.

## 💾 Installation

```shell
yarn add @aegenet/belt-array-stats@^1.6.0
# or
npm i @aegenet/belt-array-stats@^1.6.0
```

## 📝 Usage

### getAverage

```typescript
import { getAverage } from '@aegenet/belt-array-stats';

const results = getAverage([1, 1, 2, 2]);
// results = 1.5
```

### getMedian

```typescript
import { getMedian } from '@aegenet/belt-array-stats';

const results = getMedian([1, 1, 2]);
// results = 1
```

```typescript
const results = getMedian([1, 1, 2, 3, 4, 4], { sorted: true });
// results = 2.5
```

### getClosestNumber

```typescript
import { getClosestNumber } from '@aegenet/belt-array-stats';

getClosestNumber(1, [1, 2]); // 1
getClosestNumber(2, [1, 2]); // 2
getClosestNumber(2, [1, 2, 3]); // 2
getClosestNumber(2, [1, 2, 2, 3]); // 2
getClosestNumber(2, [3, 1, 2, 2]); // 2

getClosestNumber(0, [1, 2]); // 1
getClosestNumber(3, [1, 2]); // 2
getClosestNumber(13, [1, 2]); // 2
```

### getClosestValue

```typescript
import { getClosestValue } from '@aegenet/belt-array-stats';

const reducer = (value: { value: number }, a: { value: number }, b: { value: number }) => {
  const aDiff = Math.abs(a.value - value.value);
  const bDiff = Math.abs(b.value - value.value);

  if (aDiff === bDiff) {
    return a.value > b.value ? a : b;
  } else {
    return bDiff < aDiff ? b : a;
  }
};

getClosestValue<{ value: number }>(
  { value: 1 },
  [{ value: 1 }, { value: 2 }],
  reducer
);
// { value: 1 }

```
