# @aegenet/belt-obj-is-empty

> Object is empty ?

```typescript
import { objectIsEmpty } from '@aegenet/belt-obj-is-empty';

objectIsEmpty(null); // true;
objectIsEmpty(undefined); // true
objectIsEmpty({}); // true
objectIsEmpty({ id: 1 }); // false
objectIsEmpty({ id: 1, code: 'go' }); // false
```
