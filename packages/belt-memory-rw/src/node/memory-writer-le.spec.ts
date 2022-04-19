import assert from 'assert';
import { MemoryWriter } from '../node';
import { MemoryReader } from './memory-reader';

describe('memory-writer LE', () => {
  describe('string', () => {
    it('writeString', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour');
      assert.strictEqual(writer.length, 32);
      assert.strictEqual(writer.remaining, 32 - 7);
      assert.strictEqual(writer.position, 7);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readString(7), 'Bonjour');
    });

    it('writeStringWithMarker - Guess', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeStringWithMarker('Bonjour');
      assert.strictEqual(writer.length, 32);
      assert.strictEqual(writer.remaining, 32 - 8);
      assert.strictEqual(writer.position, 8);
      writer.writeString('Hello');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readStringWithMarker(), 'Bonjour');
      assert.strictEqual(reader.position, 8);
      assert.strictEqual(reader.readString(5), 'Hello');
    });

    it('writeStringWithMarker - Limit', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeStringWithMarker('Bonjour', 0x32);
      assert.strictEqual(writer.length, 32);
      assert.strictEqual(writer.remaining, 32 - 8);
      assert.strictEqual(writer.position, 8);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readStringWithMarker(4), 'Bonj');
      assert.strictEqual(reader.position, 4);
      assert.strictEqual(reader.readString(3), 'our');
    });

    it('writeCString32', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeCString32LE('Bonjour');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readCString32LE(), 'Bonjour');
    });

    it('writeCString16', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeCString16LE('Bonjour');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readCString16LE(), 'Bonjour');
    });
  });

  describe('bytes', () => {
    it('writeByte', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeByte(8);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readByte(), 8);
    });

    it('writeBytes', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([8, 7, 6, 5, 4]);

      const reader = new MemoryReader(buffer);
      assert.deepStrictEqual(Array.from(reader.readBytes(5)), [8, 7, 6, 5, 4]);
    });
  });

  describe('number', () => {
    it('writeInt16LE', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeInt16LE(3689);
      writer.writeInt16LE(-3689);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readInt16LE(), 3689);
      assert.strictEqual(reader.readInt16LE(), -3689);
    });

    it('writeInt32LE', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeInt32LE(368932);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readInt32LE(), 368932);
    });

    it('writeInt8', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeInt8(96);
      writer.writeInt8(-96);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readInt8(), 96);
      assert.strictEqual(reader.readInt8(), -96);
    });

    it('writeUInt8', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt8(96);
      writer.writeUInt8(236);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readUInt8(), 96);
      assert.strictEqual(reader.readUInt8(), 236);
    });

    it('writeUInt16LE', () => {
      const buffer = Buffer.alloc(64);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt16LE(3222);
      writer.writeUInt16LE(63000);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readUInt16LE(), 3222);
      assert.strictEqual(reader.readUInt16LE(), 63000);
    });

    it('writeUInt32LE', () => {
      const buffer = Buffer.alloc(64);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt32LE(322222);
      writer.writeUInt32LE(6300000);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readUInt32LE(), 322222);
      assert.strictEqual(reader.readUInt32LE(), 6300000);
    });

    it('writeDoubleLE', () => {
      const buffer = Buffer.alloc(64);
      const writer = new MemoryWriter(buffer);
      writer.writeDoubleLE(4333.22);
      writer.writeDoubleLE(939211.332);

      const reader = new MemoryReader(writer.buffer);
      assert.strictEqual(reader.readDoubleLE(), 4333.22);
      assert.strictEqual(reader.readDoubleLE(), 939211.332);
    });

    it('writeFloatLE', () => {
      const buffer = Buffer.alloc(64);
      const writer = new MemoryWriter(buffer);
      writer.writeFloatLE(4333.2);
      writer.writeFloatLE(939211.3);

      const reader = new MemoryReader(writer.buffer);
      assert.strictEqual(reader.readFloatLE(), 4333.2001953125);
      assert.strictEqual(reader.readFloatLE(), 939211.3125);
    });
  });

  describe('functions', () => {
    it('seek outbound - throw', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      assert.throws(() => writer.seek(555));
    });

    it('fill', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.seek(1);
      writer.fill('Bonjour', 7);

      const reader = new MemoryReader(buffer);
      reader.seek(1);
      assert.strictEqual(reader.readString(7), 'Bonjour');
    });

    it('seek & write', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.seek(1);
      writer.writeString('Bonjour');

      const reader = new MemoryReader(buffer);
      reader.seek(1);
      assert.strictEqual(reader.readString(7), 'Bonjour');
    });

    it('seek, rewind, write', () => {
      const buffer = Buffer.alloc(32);
      const writer = new MemoryWriter(buffer);
      writer.seek(1);
      writer.rewind();
      writer.writeString('Bonjour');

      const reader = new MemoryReader(buffer);
      reader.seek(1);
      reader.rewind();
      assert.strictEqual(reader.readString(7), 'Bonjour');
    });
  });
});
