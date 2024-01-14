[![npm version](https://img.shields.io/npm/v/@aegenet/belt-promise.svg)](https://www.npmjs.com/package/@aegenet/belt-promise)
<br>

# @aegenet/belt-promise

> Promise toolkit

### isPromise

```typescript
import { isPromise } from '@aegenet/belt-promise';

isPromise(Promise.resolve(true)); // true
isPromise(5); // false
isPromise(null); // false
isPromise(undefined); // false
isPromise(() => true); // false
isPromise({ id: 5 }); // false
```

### delay

```typescript
import { delay } from '@aegenet/belt-promise';

await delay(500); // ms
```

### runSequentially

```typescript
import { runSequentially } from '@aegenet/belt-promise';

await runSequentially(
  () => {
    /** Step 1 */;
  },
  () => {
    /** Step 2 */;
  }
);
```

### collectSequentially

```typescript
import { collectSequentially } from '@aegenet/belt-promise';

const results = await collectSequentially(
  () => {
    /** Step 1 */;
    return 5;
  },
  () => {
    /** Step 2 */;
    return 3;
  }
);

// results: [5, 3]
```
