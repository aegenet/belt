# @aegenet/belt-readdir

Get all files from a root directory (recursively).

> Node only!

### Node.js

```typescript
import { readdir, IReaddirEntry } from '@aegenet/belt-readdir';

const files: IReaddirEntry[] = readdir('./');
// ['a/file.yml', 'x/y/z.yml']
```

```typescript
const files: IReaddirEntry[] = await readdir('./', file => file.name.endsWith('.yml'));
// ['a/file.yml', 'x/y/z.yml']
```