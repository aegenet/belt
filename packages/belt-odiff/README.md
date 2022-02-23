# @aegenet/belt-odiff

> Simple objects differences

```typescript
import { odiff } from '@aegenet/belt-odiff';

const result = odiff({ id: 5 }, { id: 5 }, { fields: ['id'] });
// result = []
```

```typescript
const result = odiff({ id: 5 }, { id: 3 }, { fields: ['id'] });
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
}, { fields: ['id''code'] });
// result = [
//   ['id', 5, 3],
//   ['code', 'Trotro', 'Lyoko'],
// ]
```
