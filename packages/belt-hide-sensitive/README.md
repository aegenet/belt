# @aegenet/belt-hide-sensitive

> Hide Sensititve data from string

## Example, small cli to hide passwords/secrets from environment variables in the console output.

```typescript
import { createHideSensitiveFunction } from '@aegenet/belt-hide-sensitive';

const hideFunction = createHideSensitiveFunction(process.env);

process.stdin.on('data', data => process.stdout.write(hideFunction(data.toString())));
```
