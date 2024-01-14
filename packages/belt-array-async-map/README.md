[![npm version](https://img.shields.io/npm/v/@aegenet/belt-array-async-map.svg)](https://www.npmjs.com/package/@aegenet/belt-array-async-map)
<br>

# @aegenet/belt-array-async-map

> Array async map (sequentially)

## 💾 Installation

```shell
yarn add @aegenet/belt-array-async-map@^1.2.0
# or
npm i @aegenet/belt-array-async-map@^1.2.0
```

## 📝 Usage

```typescript
import { arrayAsyncMap } from '@aegenet/belt-array-async-map';

const result = await arrayAsyncMap(
  [
    {
      id: 5,
      value: 'Yo',
    }, {
      id: 7,
      value: 'Ho',
    }
  ],
  (value, idx, array) => /** a promise */ Promise.resolve(idx)
);
// result = [0, 1]
```
