[![npm version](https://img.shields.io/npm/v/@aegenet/belt-memory-rw.svg)](https://www.npmjs.com/package/@aegenet/belt-memory-rw)
<br>

# @aegenet/belt-memory-rw

Memory RW helps to read/write a buffer sequentially.
Little endian and Big endian are supported.

### TLDR;

- `MemoryReader` read a buffer sequentially.
- `MemoryWriter` write a buffer sequentially.
- `MemoryWriter` create a dynamic buffer (without specifying the size).

### **Note**

> - The Node.js version uses `Buffer`.
> - The Browser version uses `ArrayBuffer` / `DataView`.

### Node.js
#### Write & read stuff

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

#### Dynamic memory
```typescript
import { MemoryReader, MemoryCreator, IMemoryCreator } from '@aegenet/belt-memory-rw';

const memCreator: IMemoryCreator<Buffer> = new MemoryCreator();
memCreator.fill(7, 7);
memCreator.writeByte(1);
memCreator.writeBytes([2, 3]);
memCreator.writeBytes(Buffer.from([2, 3]));
memCreator.writeCString16BE('456');
memCreator.writeCString16LE('789');
memCreator.writeCString32BE('01234');
memCreator.writeCString32LE('56789');
memCreator.writeDoubleBE(8.5);
memCreator.writeDoubleLE(9.5);
memCreator.writeFloatBE(1);
memCreator.writeFloatLE(2);
memCreator.writeInt16BE(333);
memCreator.writeInt16LE(222);
memCreator.writeInt32BE(1232321);
memCreator.writeInt32LE(1232321);
memCreator.writeInt8(2);
memCreator.writeString('Ok');
memCreator.writeStringWithMarker('Ok');
memCreator.writeUInt16BE(222);
memCreator.writeUInt16LE(222);
memCreator.writeUInt32BE(33333);
memCreator.writeUInt32LE(33333);
memCreator.writeUInt8(254);

memCreator.length; // 95

const reader = new MemoryReader(memCreator.buffer);
reader.readBytes(7); // [7, 7, 7, 7, 7, 7, 7]);
reader.readByte(); // 1
reader.readBytes(2); // [2, 3]
reader.readBytes(2); // [2, 3]
reader.readCString16BE(); // '456'
reader.readCString16LE(); // '789'
reader.readCString32BE(); // '01234'
reader.readCString32LE(); // '56789'
reader.readDoubleBE(); // 8.5
reader.readDoubleLE(); // 9.5
reader.readFloatBE(); // 1
reader.readFloatLE(); // 2
reader.readInt16BE(); // 333
reader.readInt16LE(); // 222
reader.readInt32BE(); // 1232321
reader.readInt32LE(); // 1232321
reader.readInt8(); // 2
reader.readString(2); // 'Ok'
reader.readStringWithMarker(); // 'Ok'
reader.readUInt16BE(); // 222
reader.readUInt16LE(); // 222
reader.readUInt32BE(); // 33333
reader.readUInt32LE(); // 33333
reader.readUInt8(); // 254
```

### Browser
#### Write & read stuff

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

#### Dynamic memory
```typescript
import { MemoryReader, MemoryCreator, IMemoryCreator } from '@aegenet/belt-memory-rw';

const memCreator: IMemoryCreator<ArrayBuffer> = new MemoryCreator();
memCreator.fill(7, 7);
memCreator.writeByte(1);
memCreator.writeBytes([2, 3]);
memCreator.writeBytes(Buffer.from([2, 3]));
memCreator.writeCString16BE('456');
memCreator.writeCString16LE('789');
memCreator.writeCString32BE('01234');
memCreator.writeCString32LE('56789');
memCreator.writeDoubleBE(8.5);
memCreator.writeDoubleLE(9.5);
memCreator.writeFloatBE(1);
memCreator.writeFloatLE(2);
memCreator.writeInt16BE(333);
memCreator.writeInt16LE(222);
memCreator.writeInt32BE(1232321);
memCreator.writeInt32LE(1232321);
memCreator.writeInt8(2);
memCreator.writeString('Ok');
memCreator.writeStringWithMarker('Ok');
memCreator.writeUInt16BE(222);
memCreator.writeUInt16LE(222);
memCreator.writeUInt32BE(33333);
memCreator.writeUInt32LE(33333);
memCreator.writeUInt8(254);

memCreator.length; // 95

const reader = new MemoryReader(memCreator.buffer);
reader.readBytes(7); // [7, 7, 7, 7, 7, 7, 7]);
reader.readByte(); // 1
reader.readBytes(2); // [2, 3]
reader.readBytes(2); // [2, 3]
reader.readCString16BE(); // '456'
reader.readCString16LE(); // '789'
reader.readCString32BE(); // '01234'
reader.readCString32LE(); // '56789'
reader.readDoubleBE(); // 8.5
reader.readDoubleLE(); // 9.5
reader.readFloatBE(); // 1
reader.readFloatLE(); // 2
reader.readInt16BE(); // 333
reader.readInt16LE(); // 222
reader.readInt32BE(); // 1232321
reader.readInt32LE(); // 1232321
reader.readInt8(); // 2
reader.readString(2); // 'Ok'
reader.readStringWithMarker(); // 'Ok'
reader.readUInt16BE(); // 222
reader.readUInt16LE(); // 222
reader.readUInt32BE(); // 33333
reader.readUInt32LE(); // 33333
reader.readUInt8(); // 254
```