[![npm version](https://img.shields.io/npm/v/@aegenet/belt-array-to-obj.svg)](https://www.npmjs.com/package/@aegenet/belt-array-to-obj)
<br>

# @aegenet/belt-array-to-obj

> Array to object

```typescript
import { arrayToObject } from '@aegenet/belt-array-to-obj';

const result = arrayToObject(
  [
    {
      id: 5,
      value: 'Yo',
    },
  ],
  'id'
);
// {
//   5: {
//     id: 5,
//     value: 'Yo',
//   },
// }
```

```typescript
const result = arrayToObject(
  [
    {
      id: 5,
      value: 'Yo',
    },
  ],
  'id',
  'value'
);
// {
//   5: 'Yo',
// }
```

```typescript
const result = arrayToObject(
  [
    {
      id: 5,
      value: 'Yo',
    },
  ],
  value => value.id,
  'value'
);
// {
//   5: 'Yo',
// }

const result = arrayToObject([5, 6]);
/* {
  5: 5,
  6: 6,
} */

const result = arrayToObject(['a', 'b']);
/* {
  a: 'a',
  b: 'b',
} */
```
