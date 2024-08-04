[![npm version](https://img.shields.io/npm/v/@aegenet/belt-crc32.svg)](https://www.npmjs.com/package/@aegenet/belt-crc32)
<br>

# @aegenet/belt-crc32

> crc32

## 💾 Installation

```shell
yarn add @aegenet/belt-crc32@^2.0.0
# or
npm i @aegenet/belt-crc32@^2.0.0
```

## 📝 Usage

```typescript
import { crc32 } from '@aegenet/belt-crc32';

crc32('hello'); // 0xf7d18982

crc32(''); // 0x00

crc32(undefined); // 0x00

crc32(null); // 0x00
```
