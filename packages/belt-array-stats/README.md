# @aegenet/belt-array-stats

> Stats from array.

### getAverage

```typescript
import { getAverage } from '@aegenet/belt-array-stats';

const results = getAverage([1, 1, 2, 2]);
// results = 1.5
```

### getMedian

```typescript
import { getMedian } from '@aegenet/belt-array-stats';

const results = getMedian([1, 1, 2]);
// results = 1
```

```typescript
const results = getMedian([1, 1, 2, 3, 4, 4], { sorted: true });
// results = 2.5
```
