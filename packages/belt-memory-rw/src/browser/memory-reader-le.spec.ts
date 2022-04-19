import assert from 'assert';
import { MemoryWriter } from '../browser';
import { MemoryReader } from '../browser';

describe('browser memory-reader', () => {
  describe('string', () => {
    it('readString', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour');
      assert.strictEqual(writer.length, 32);
      assert.strictEqual(writer.remaining, 32 - 7);
      assert.strictEqual(writer.position, 7);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readString(7), 'Bonjour');
      assert.strictEqual(reader.position, 7);
      assert.strictEqual(reader.remaining, 32 - 7);
      assert.strictEqual(reader.length, 32);
    });

    it('readString - with french character', () => {
      const buffer = new ArrayBuffer(92);
      const writer = new MemoryWriter(buffer);
      writer.writeStringWithMarker('Bonjour à vous');
      writer.writeStringWithMarker("Allons à l'école");
      writer.writeCString32LE('Bonjour à vous');
      writer.writeCString32LE("Allons à l'école");

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readStringWithMarker(), 'Bonjour à vous');
      assert.strictEqual(reader.readStringWithMarker(), "Allons à l'école");
      assert.strictEqual(reader.readCString32LE(), 'Bonjour à vous');
      assert.strictEqual(reader.readCString32LE(), "Allons à l'école");
    });

    it('readLine 0 remaining', () => {
      const buffer = new ArrayBuffer(1);
      const writer = new MemoryWriter(buffer);
      writer.writeString('\n');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), '');
      assert.strictEqual(reader.position, 1);
      assert.strictEqual(reader.remaining, 0);
      assert.strictEqual(reader.length, 1);
      assert.strictEqual(reader.readLine(), undefined);
    });

    it('readLine empty', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('\n');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), '');
      assert.strictEqual(reader.position, 1);
      assert.strictEqual(reader.remaining, 32 - 1);
      assert.strictEqual(reader.length, 32);
    });

    it('readLine \\n', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour\n');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), 'Bonjour');
      assert.strictEqual(reader.position, 8);
      assert.strictEqual(reader.remaining, 32 - 8);
      assert.strictEqual(reader.length, 32);
    });

    it('readLine \\0', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), 'Bonjour');
      assert.strictEqual(reader.position, 7);
      assert.strictEqual(reader.remaining, 32 - 7);
      assert.strictEqual(reader.length, 32);
    });

    it('readLine \\n\\r', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour\n\r');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), 'Bonjour');
      assert.strictEqual(reader.position, 9);
      assert.strictEqual(reader.remaining, 32 - 9);
      assert.strictEqual(reader.length, 32);
    });

    it('readLine \\r\\n', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour\r\n');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), 'Bonjour');
      assert.strictEqual(reader.position, 9);
      assert.strictEqual(reader.remaining, 32 - 9);
      assert.strictEqual(reader.length, 32);
    });

    it('readLine multi-mix', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeString('Bonjour\nHello\nHallo');

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.readLine(), 'Bonjour');
      assert.strictEqual(reader.readLine(), 'Hello');
      assert.strictEqual(reader.readLine(), 'Hallo');
    });

    it('CString16 invalid', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt16LE(2222);
      writer.writeString('Salut');

      const reader = new MemoryReader(buffer);
      // Invalid length
      assert.throws(() => reader.readCString16LE());
    });

    it('CString32 invalid', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeUInt32LE(2222);
      writer.writeString('Salut');

      const reader = new MemoryReader(buffer);
      // Invalid length
      assert.throws(() => reader.readCString32LE());
    });
  });

  describe('bytes', () => {
    it('copyBytes', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([8, 7, 6, 5, 4]);

      const reader = new MemoryReader(buffer);
      assert.deepStrictEqual(Array.from(new Uint8Array(reader.cloneBytes(5))), [8, 7, 6, 5, 4]);
    });

    it('readBytes', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([8, 7, 6, 5, 4]);

      const reader = new MemoryReader(buffer);
      assert.deepStrictEqual(Array.from(new Uint8Array(reader.readBytes(5))), [8, 7, 6, 5, 4]);
    });

    it('readBytes too far - strict', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([8, 7, 6, 5, 4]);

      const reader = new MemoryReader(buffer);
      assert.throws(() => reader.readBytes(255, true));
    });

    it('readBytes too far but ok...', () => {
      const buffer = new ArrayBuffer(5);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([8, 7, 6, 5, 4]);

      const reader = new MemoryReader(buffer);
      assert.deepStrictEqual(Array.from(new Uint8Array(reader.readBytes(255))), [8, 7, 6, 5, 4]);
    });
  });

  describe('functions', () => {
    it('seek outbound - throw', () => {
      const buffer = new ArrayBuffer(32);
      const reader = new MemoryReader(buffer);
      assert.throws(() => reader.seek(555));
    });

    it('peekByte', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([1, 2, 3, 4, 5, 6]);

      const reader = new MemoryReader(buffer);
      assert.strictEqual(reader.peekByte(), 1);
      assert.strictEqual(reader.position, 0);
      assert.strictEqual(reader.peekByte(), 1);
      assert.strictEqual(reader.position, 0);
      assert.strictEqual(reader.peekByte(1), 2);
      assert.strictEqual(reader.position, 0);
      assert.strictEqual(reader.readByte(), 1);
      assert.strictEqual(reader.position, 1);
    });

    it('peekBytes', () => {
      const buffer = new ArrayBuffer(32);
      const writer = new MemoryWriter(buffer);
      writer.writeBytes([1, 2, 3, 4, 5, 6]);

      const reader = new MemoryReader(buffer);
      assert.deepStrictEqual(Array.from(new Uint8Array(reader.peekBytes(2))), [1, 2]);
      assert.strictEqual(reader.position, 0);
      assert.deepStrictEqual(Array.from(new Uint8Array(reader.peekBytes(2, 1))), [2, 3]);
      assert.strictEqual(reader.position, 0);
    });
  });
});
