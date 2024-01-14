[![npm version](https://img.shields.io/npm/v/@aegenet/belt-ofields.svg)](https://www.npmjs.com/package/@aegenet/belt-ofields)
<br>

# @aegenet/belt-ofields

> Object fields, retrieve fields of an object with values

```typescript
import { ofields } from '@aegenet/belt-ofields';

const result = ofields({ id: 5 }, { fields: ['id'] });
// result = [['id', 5]]
```

```typescript
const result = odiff({
  id: 5,
  code: 'Trotro',
  another: 1,
}, { fields: ['id''code'] });
// result = [
//   ['id', 5],
//   ['code', 'Trotro'],
// ]
```
