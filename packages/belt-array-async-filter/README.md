[![npm version](https://img.shields.io/npm/v/@aegenet/belt-array-async-filter.svg)](https://www.npmjs.com/package/@aegenet/belt-array-async-filter)
<br>

# @aegenet/belt-array-async-filter

> Array async filter (sequentially)

## 💾 Installation

```shell
yarn add @aegenet/belt-array-async-filter@^1.6.0
# or
npm i @aegenet/belt-array-async-filter@^1.6.0
```

## 📝 Usage

```typescript
import { arrayAsyncFilter } from '@aegenet/belt-array-async-filter';

const result = await arrayAsyncFilter(
  [
    {
      id: 5,
      value: 'Yo',
    }, {
      id: 7,
      value: 'Ho',
    }
  ],
  (value, idx, array) => /** a promise */ Promise.resolve(idx === 0)
);
// result = [
//   {
//     id: 5,
//     value: 'Yo',
//   },
// ]
```
