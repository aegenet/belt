/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import type { IMemoryCreator } from '../common/i-memory-creator';
import { MemoryCreator } from './memory-creator';
import { MemoryReader } from './memory-reader';

describe('nodejs memory-creator', () => {
  it('scenario', () => {
    const memCreator: IMemoryCreator<Buffer> = new MemoryCreator();
    memCreator.rewind();
    memCreator.fill(7, 7);
    memCreator.writeByte(1);
    memCreator.writeBytes([2, 3]);
    memCreator.writeBytes(Buffer.from([2, 3]));
    memCreator.writeSomeBytes(1, [5, 3]);
    memCreator.writeSomeBytes(1, [9, 3]);
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

    assert.strictEqual(memCreator.length, 97);
    assert.strictEqual(memCreator.length, memCreator.position);
    assert.strictEqual(memCreator.remaining, 0);

    try {
      memCreator.seek(0);
    } catch (error: any) {
      assert.strictEqual(error.message, 'Method not implemented.');
    }
    const reader = new MemoryReader(memCreator.buffer);
    assert.deepStrictEqual(Array.from(reader.readBytes(7)), [7, 7, 7, 7, 7, 7, 7]);
    assert.strictEqual(reader.readByte(), 1);
    assert.deepStrictEqual(Array.from(reader.readBytes(2)), [2, 3]);
    assert.deepStrictEqual(Array.from(reader.readBytes(2)), [2, 3]);
    assert.deepStrictEqual(Array.from(new Uint8Array(reader.readBytes(2))), [5, 9]);
    assert.strictEqual(reader.readCString16BE(), '456');
    assert.strictEqual(reader.readCString16LE(), '789');
    assert.strictEqual(reader.readCString32BE(), '01234');
    assert.strictEqual(reader.readCString32LE(), '56789');
    assert.strictEqual(reader.readDoubleBE(), 8.5);
    assert.strictEqual(reader.readDoubleLE(), 9.5);
    assert.strictEqual(reader.readFloatBE(), 1);
    assert.strictEqual(reader.readFloatLE(), 2);
    assert.strictEqual(reader.readInt16BE(), 333);
    assert.strictEqual(reader.readInt16LE(), 222);
    assert.strictEqual(reader.readInt32BE(), 1232321);
    assert.strictEqual(reader.readInt32LE(), 1232321);
    assert.strictEqual(reader.readInt8(), 2);
    assert.strictEqual(reader.readString(2), 'Ok');
    assert.strictEqual(reader.readStringWithMarker(), 'Ok');
    assert.strictEqual(reader.readUInt16BE(), 222);
    assert.strictEqual(reader.readUInt16LE(), 222);
    assert.strictEqual(reader.readUInt32BE(), 33333);
    assert.strictEqual(reader.readUInt32LE(), 33333);
    assert.strictEqual(reader.readUInt8(), 254);
  });
});
