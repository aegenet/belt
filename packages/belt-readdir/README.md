[![npm version](https://img.shields.io/npm/v/@aegenet/belt-readdir.svg)](https://www.npmjs.com/package/@aegenet/belt-readdir)
<br>

# @aegenet/belt-readdir

Get all files from a root directory (recursively).

> Node only!

## 💾 Installation

```shell
yarn add @aegenet/belt-readdir@^1.2.0
# or
npm i @aegenet/belt-readdir@^1.2.0
```

## 📝 Usage (Node.js)

```typescript
import { readdir, IReaddirEntry } from '@aegenet/belt-readdir';

const files: IReaddirEntry[] = readdir('./');
// ['a/file.yml', 'x/y/z.yml']
```

```typescript
const files: IReaddirEntry[] = await readdir('./', file => file.name.endsWith('.yml'));
// ['a/file.yml', 'x/y/z.yml']
```