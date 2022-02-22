# @aegenet/belt-crc8

> Very simple crc8

```typescript
import { crc8 } from '@aegenet/belt-crc8';

crc8('hello'); // 0xf6

crc8(''); // 0x00

crc8(undefined); // 0x00

crc8(null); // 0x00
```
