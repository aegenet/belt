import type { IMemoryCreator } from '../common/i-memory-creator';
import { MemoryWriter } from './memory-writer';

/** Create a buffer with a dynamic size */
export class MemoryCreator implements IMemoryCreator<Buffer> {
  private _buffers: Buffer[] = [];

  constructor() {
    //
  }

  /** @inheritdoc */
  public get length(): number {
    return this._buffers.map(f => f.length).reduce((a, b) => a + b);
  }

  /** @inheritdoc */
  public get buffer() {
    return Buffer.concat(this._buffers);
  }

  /** Alloc the mandatory memory and write */
  private _encapsWithBuffer(callback: (writer: MemoryWriter) => void, length: number) {
    const writer = new MemoryWriter(Buffer.alloc(length));
    callback(writer);
    this._buffers.push(writer.buffer);
  }

  /** @inheritdoc */
  public writeByte(value: number): void {
    this._encapsWithBuffer(writer => writer.writeByte(value), 1);
  }

  /** @inheritdoc */
  public writeStringWithMarker(value: string, endByte?: number): void {
    this._encapsWithBuffer(writer => writer.writeStringWithMarker(value, endByte), value.length + 1);
  }

  /** @inheritdoc */
  public writeCString32BE(value: string): void {
    this._encapsWithBuffer(writer => writer.writeCString32BE(value), value.length + 4);
  }

  /** @inheritdoc */
  public writeCString16LE(value: string): void {
    this._encapsWithBuffer(writer => writer.writeCString16LE(value), value.length + 2);
  }

  /** @inheritdoc */
  public writeCString16BE(value: string): void {
    this._encapsWithBuffer(writer => writer.writeCString16BE(value), value.length + 2);
  }

  /** @inheritdoc */
  public writeUInt32BE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeUInt32BE(value), 4);
  }

  /** @inheritdoc */
  public writeInt32BE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeInt32BE(value), 4);
  }

  /** @inheritdoc */
  public writeUInt16BE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeUInt16BE(value), 2);
  }

  /** @inheritdoc */
  public writeInt16BE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeInt16BE(value), 2);
  }

  /** @inheritdoc */
  public writeDoubleBE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeDoubleBE(value), 8);
  }

  /** @inheritdoc */
  public writeFloatLE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeFloatLE(value), 4);
  }

  /** @inheritdoc */
  public writeFloatBE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeFloatBE(value), 4);
  }

  /** @inheritdoc */
  public fill(value: number, length: number): void {
    this._encapsWithBuffer(writer => writer.fill(value, length), length);
  }

  /** @inheritdoc */
  public writeBytes(values: Buffer): void {
    this._encapsWithBuffer(writer => writer.writeBytes(values), values.length);
  }

  /** @inheritdoc */
  public writeSomeBytes(size: number, values: Buffer): void {
    this._encapsWithBuffer(writer => writer.writeSomeBytes(size, values), size);
  }

  /** @inheritdoc */
  public writeString(value: string): void {
    this._encapsWithBuffer(writer => writer.writeString(value), value.length);
  }

  /** @inheritdoc */
  public writeCString32LE(value: string): void {
    this._encapsWithBuffer(writer => writer.writeCString32LE(value), value.length + 4);
  }

  /** @inheritdoc */
  public writeUInt32LE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeUInt32LE(value), 4);
  }

  /** @inheritdoc */
  public writeInt32LE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeInt32LE(value), 4);
  }

  /** @inheritdoc */
  public writeUInt16LE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeUInt16LE(value), 2);
  }

  /** @inheritdoc */
  public writeInt16LE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeInt16LE(value), 2);
  }

  /** @inheritdoc */
  public writeUInt8(value: number): void {
    this._encapsWithBuffer(writer => writer.writeUInt8(value), 1);
  }

  /** @inheritdoc */
  public writeInt8(value: number): void {
    this._encapsWithBuffer(writer => writer.writeInt8(value), 1);
  }

  /** @inheritdoc */
  public writeDoubleLE(value: number): void {
    this._encapsWithBuffer(writer => writer.writeDoubleLE(value), 8);
  }

  /** Always returns 0 */
  public get remaining(): number {
    return 0;
  }
  /** Always the current length */
  public get position(): number {
    return this.length;
  }
  /** You can't seek right now */
  public seek(offset: number): void {
    throw new Error('Method not implemented.');
  }
  /** @inheritdoc */
  public rewind(): void {
    this._buffers = [];
  }
}
