# @aegenet/belt-hook

> Hook function -> Not for production use! TESTS ONLY!

```typescript
import { hook } from '@aegenet/belt-hook';

/** context: { inc: () => void } */

const token = hook({
  context,
  name: 'inc',
  beforeCall: data => {
    /** Do something */
  },
  afterCall: data => {
    /** Do Something */
  },
});

context.inc(); /** beforeCall() -> inc() -> afterCall()  */

token.dispose();
```
