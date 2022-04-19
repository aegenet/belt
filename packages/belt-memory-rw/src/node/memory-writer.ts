import type { IMemoryWriter } from '../common/i-memory-writer';
import { MemoryCommon } from './memory-common';

/** Memory writer */
export class MemoryWriter extends MemoryCommon implements IMemoryWriter<Buffer> {
  /** @inheritdoc */
  public fill(value: string | number | Uint8Array, length: number) {
    this._buf.fill(value, this._offset, this._offset + length);
    this._offset += length;
  }

  /** @inheritdoc */
  public writeByte(value: number) {
    this.writeUInt8(value);
  }

  /** @inheritdoc */
  public writeBytes(values: number[]) {
    values.forEach(octet => {
      this._buf.writeUInt8(octet, this._offset++);
    });
  }

  /** @inheritdoc */
  public writeString(value: string) {
    this._buf.write(value, this._offset, value.length, 'ascii');
    this._offset += value.length;
  }

  /** @inheritdoc */
  public writeStringWithMarker(value: string, endByte: number = 0x00) {
    this.writeString(value);
    this.writeByte(endByte);
  }

  /** @inheritdoc */
  public writeCString32LE(value: string) {
    this.writeUInt32LE(value.length);
    this.writeString(value);
  }

  /** @inheritdoc */
  public writeCString32BE(value: string) {
    this.writeUInt32BE(value.length);
    this.writeString(value);
  }

  /** @inheritdoc */
  public writeCString16LE(value: string) {
    this.writeUInt16LE(value.length);
    this.writeString(value);
  }

  /** @inheritdoc */
  public writeCString16BE(value: string) {
    this.writeUInt16BE(value.length);
    this.writeString(value);
  }

  /** @inheritdoc */
  public writeUInt32LE(value: number) {
    this._buf.writeUInt32LE(value, this._offset);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeUInt32BE(value: number) {
    this._buf.writeUInt32BE(value, this._offset);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeInt32LE(value: number) {
    this._buf.writeInt32LE(value, this._offset);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeInt32BE(value: number) {
    this._buf.writeInt32BE(value, this._offset);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeUInt16LE(value: number) {
    this._buf.writeUInt16LE(value, this._offset);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeUInt16BE(value: number) {
    this._buf.writeUInt16BE(value, this._offset);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeInt16LE(value: number) {
    this._buf.writeInt16LE(value, this._offset);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeInt16BE(value: number) {
    this._buf.writeInt16BE(value, this._offset);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeUInt8(value: number) {
    this._buf.writeUInt8(value, this._offset);
    this._offset += 1;
  }

  /** @inheritdoc */
  public writeInt8(value: number) {
    this._buf.writeInt8(value, this._offset);
    this._offset += 1;
  }

  /** @inheritdoc */
  public writeDoubleLE(value: number) {
    this._buf.writeDoubleLE(value, this._offset);
    this._offset += 8;
  }

  /** @inheritdoc */
  public writeDoubleBE(value: number) {
    this._buf.writeDoubleBE(value, this._offset);
    this._offset += 8;
  }

  /** @inheritdoc */
  public writeFloatLE(value: number) {
    this._buf.writeFloatLE(value, this._offset);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeFloatBE(value: number) {
    this._buf.writeFloatBE(value, this._offset);
    this._offset += 4;
  }

  /** @inheritdoc */
  public get buffer(): Buffer {
    return this._buf;
  }
}
