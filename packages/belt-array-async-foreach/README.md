[![npm version](https://img.shields.io/npm/v/@aegenet/belt-array-async-foreach.svg)](https://www.npmjs.com/package/@aegenet/belt-array-async-foreach)
<br>

# @aegenet/belt-array-async-foreach

> Array Async forEach (sequentially)

## 💾 Installation

```shell
yarn add @aegenet/belt-array-async-foreach@^1.4.0
# or
npm i @aegenet/belt-array-async-foreach@^1.4.0
```

## 📝 Usage

```typescript
import { arrayAsyncForEach } from '@aegenet/belt-array-async-foreach';

const entries = [
  {
    id: 5,
    value: 'Yo',
  }, {
    id: 7,
    value: 'Ho',
  },
];

await arrayAsyncForEach(entries, (value, index, array) => {
  /** do something */
  await something(value);
});

```
