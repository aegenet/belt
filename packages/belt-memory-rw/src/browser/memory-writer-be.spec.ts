/**
 * @vitest-environment jsdom
 */
import { describe, it, assert } from 'vitest';
import { MemoryWriter } from '../browser';
import { MemoryReader } from '../browser';

describe('browser memory-writer BE', () => {
  describe('string', () => {
    it('writeString', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour');
      assert.strictEqual(writer.length, 32);
      assert.strictEqual(writer.remaining, 32 - 7);
      assert.strictEqual(writer.position, 7);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readString(7), 'Bonjour');
    });

    it('writeCString32BE', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeCString32BE('Bonjour');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readCString32BE(), 'Bonjour');
    });

    it('writeCString16BE', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeCString16BE('Bonjour');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readCString16BE(), 'Bonjour');
    });
  });

  describe('number', () => {
    it('writeInt16BE', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeInt16BE(3689);
      writer.writeInt16BE(-3689);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readInt16BE(), 3689);
      assert.strictEqual(reader.readInt16BE(), -3689);
    });

    it('writeInt32BE', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeInt32BE(368932);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readInt32BE(), 368932);
    });

    it('writeUInt16BE', () => {
      const buffer = new ArrayBuffer(64);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt16BE(3222);
      writer.writeUInt16BE(63000);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readUInt16BE(), 3222);
      assert.strictEqual(reader.readUInt16BE(), 63000);
    });

    it('writeUInt32BE', () => {
      const buffer = new ArrayBuffer(64);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt32BE(322222);
      writer.writeUInt32BE(6300000);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readUInt32BE(), 322222);
      assert.strictEqual(reader.readUInt32BE(), 6300000);
    });

    it('writeDoubleBE', () => {
      const buffer = new ArrayBuffer(64);
      const writer = new MemoryWriter(buffer);
      writer.writeDoubleBE(4333.22);
      writer.writeDoubleBE(939211.332);

      const reader = new MemoryReader(writer.buffer);
      assert.strictEqual(reader.readDoubleBE(), 4333.22);
      assert.strictEqual(reader.readDoubleBE(), 939211.332);
    });

    it('writeFloatBE', () => {
      const buffer = new ArrayBuffer(64);
      const writer = new MemoryWriter(buffer);
      writer.writeFloatBE(4333.22);
      writer.writeFloatBE(939211.332);

      const reader = new MemoryReader(writer.buffer);
      assert.strictEqual(reader.readFloatBE(), 4333.22021484375);
      assert.strictEqual(reader.readFloatBE(), 939211.3125);
    });
  });
});
