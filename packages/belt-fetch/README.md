# @aegenet/belt-fetch

> Belt fetch

```typescript
import { fetchEnsure } from '@aegenet/belt-fetch';

try {
  const response = await fetch('http://127.0.0.1:3030/throw/text');
  const results = await fetchEnsure(response);
  /** Do it */
} catch (error) {
  // Handle the error (Warning: it's not an Error instance, it's the error response).
}
```
