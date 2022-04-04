# @aegenet/belt-error

> Error tools

```typescript
import { asError, isSyntaxError } from '@aegenet/belt-error';

isSyntaxError(new SyntaxError('Toto'))); // true

isSyntaxError(new Error('Toto'))); // false

asError({ message: 'Toto', statusText: 'Yolo' }); // instanceof Error
```
