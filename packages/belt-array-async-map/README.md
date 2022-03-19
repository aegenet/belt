# @aegenet/belt-array-async-map

> Array async map (sequentially)

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
