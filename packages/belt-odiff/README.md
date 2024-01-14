[![npm version](https://img.shields.io/npm/v/@aegenet/belt-odiff.svg)](https://www.npmjs.com/package/@aegenet/belt-odiff)
<br>

# @aegenet/belt-odiff

> Simple objects differences

_Note: the field `type` must be either `number`, `string`, `date`, `object`, or `array`_

```typescript
import { odiff } from '@aegenet/belt-odiff';


// const result = odiff({ id: 5 }, { id: 5 }, { fields: ['id'] });
const result = odiff({ id: 5 }, { id: 5 }, { fields: [{ name: 'id', type: 'number' }] });
// result = []
```


```typescript
// const result = odiff({ id: 5 }, { id: 3 }, { fields: ['id'] });
const result = odiff({ id: 5 }, { id: 3 }, { fields: [{ name: 'id', type: 'number' }] });
// result = [['id', 5, 3]]
```

```typescript
const result = odiff({
  id: 5,
  code: 'Trotro',
  another: 1,
}, {
  id: 3,
  code: 'Lyoko',
  another: 2,, 
}, { fields: [{ name: 'id', type: 'number' }, { name: 'code', type: 'string' }] });
// result = [
//   ['id', 5, 3],
//   ['code', 'Trotro', 'Lyoko'],
// ]
```
