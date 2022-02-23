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
// result = {
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
// const result = {
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
// const result = {
//   5: 'Yo',
// }
```
