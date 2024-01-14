[![npm version](https://img.shields.io/npm/v/@aegenet/belt-obj-to-array.svg)](https://www.npmjs.com/package/@aegenet/belt-obj-to-array)
<br>

# @aegenet/belt-obj-to-array

> Object to Array

```typescript
import { objectToArray } from '@aegenet/belt-obj-to-array';

const results = objectToArray({
  1: 'Bo',
  2: 'Jack',
});
// results = ['Bo', 'Jack']
```

```typescript
const results = objectToArray({
  a: 'Bo',
  b: 'Jack',
}),
// results = ['Bo', 'Jack']
```

```typescript
const results = objectToArray({
  a: 'Bo',
  b: 'Jack',
  c: () => 'Yo',
});
// results = ['Bo', 'Jack']
```

```typescript
const results = objectToArray(
  {
    a: 'Bo',
    b: 'Jack',
    c: () => 'Yo',
  },
  { fields: ['a'] }
);
// results = ['Bo']
```

```typescript
const results = objectToArray(
  {
    1: 'Bo',
    2: 'Jack',
    3: () => 'Yo',
    4: 'Boris',
    5: 'Maurice',
    6: 'Something',
  },
  { control: /[0-3]/ }
);
// results = ['Bo', 'Jack']
```
