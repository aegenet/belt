[![npm version](https://img.shields.io/npm/v/@aegenet/belt-crc8.svg)](https://www.npmjs.com/package/@aegenet/belt-crc8)
<br>

# @aegenet/belt-crc8

> Very simple crc8

```typescript
import { crc8 } from '@aegenet/belt-crc8';

crc8('hello'); // 0xf6

crc8(''); // 0x00

crc8(undefined); // 0x00

crc8(null); // 0x00
```
