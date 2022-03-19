# @aegenet/belt-obj-first-key

> Object first key

```typescript
import { objectFirstKey } from '@aegenet/belt-obj-first-key';

objectFirstKey(null); // null;
objectFirstKey(undefined); // null
objectFirstKey({}); // null
objectFirstKey({ id: 1 }); // 'id'
objectFirstKey({ id: 1, code: 'go' }); // 'id'

objectFirstKey({ _privateStuff: true, id: 1, code: 'go' }, key => !key.startsWith('_')); // 'id'
```
