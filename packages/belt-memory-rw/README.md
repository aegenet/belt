# @aegenet/belt-memory-rw

Memory RW helps to read a buffer sequentially.
Little endian and Big endian are supported.

> **Note**:
> - The Node.js version uses `Buffer`.
> - The Browser version uses `ArrayBuffer` / `DataView`.

### Node.js
#### Write stuff

```typescript
import { MemoryReader, MemoryWriter } from '@aegenet/belt-memory-rw';

const buffer = Buffer.alloc(32);

const writer = new MemoryWriter(buffer);
writer.writeStringWithMarker('Bonjour'); // [Bonjour][0x00]
writer.writeString('Hello'); // [Hello]
writer.writeInt16LE(3689);

/** */

const reader = new MemoryReader(buffer);
reader.readStringWithMarker(); // 'Bonjour'
reader.readString(5); // 'Hello'
reader.readInt16LE(); // 3689
```

#### Read lines
```typescript
import { MemoryReader, MemoryWriter } from '@aegenet/belt-memory-rw';

const buffer = Buffer.alloc(32);
const writer = new MemoryWriter(buffer);
writer.writeString('Bonjour\nHello\nHallo');

const reader = new MemoryReader(buffer);
reader.readLine(); // 'Bonjour'
reader.readLine(); // 'Hello'
reader.readLine(); // 'Hallo'
```

### Browser
#### Write stuff

```typescript
import { MemoryReader, MemoryWriter } from '@aegenet/belt-memory-rw';

const buffer = new ArrayBuffer(32);

const writer = new MemoryWriter(buffer);
writer.writeStringWithMarker('Bonjour'); // [Bonjour][0x00]
writer.writeString('Hello'); // [Hello]
writer.writeInt16LE(3689);

/** */

const reader = new MemoryReader(buffer);
reader.readStringWithMarker(); // 'Bonjour'
reader.readString(5); // 'Hello'
reader.readInt16LE(); // 3689
```

#### Read lines
```typescript
import { MemoryReader, MemoryWriter } from '@aegenet/belt-memory-rw';

const buffer = new ArrayBuffer(32);
const writer = new MemoryWriter(buffer);
writer.writeString('Bonjour\nHello\nHallo');

const reader = new MemoryReader(buffer);
reader.readLine(); // 'Bonjour'
reader.readLine(); // 'Hello'
reader.readLine(); // 'Hallo'
```