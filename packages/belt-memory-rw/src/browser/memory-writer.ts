import type { IMemoryWriter } from '../common/i-memory-writer';
import { MemoryCommon } from './memory-common';

/** Memory writer */
export class MemoryWriter extends MemoryCommon implements IMemoryWriter<ArrayBuffer> {
  /** @inheritdoc */
  public fill(value: number, length: number) {
    for (let i = 0; i < length; i++) {
      this._dv.setUint8(this._offset++, value);
    }
  }

  /** @inheritdoc */
  public writeByte(value: number) {
    this.writeUInt8(value);
  }

  /** @inheritdoc */
  public writeBytes(values: number[]) {
    values.forEach(octet => {
      this._dv.setUint8(this._offset++, octet);
    });
  }

  /** @inheritdoc */
  public writeString(value: string) {
    for (let i = 0; i < value.length; i++) {
      this._dv.setUint8(this._offset + i, value.charCodeAt(i));
    }
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
    this._dv.setUint32(this._offset, value, true);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeUInt32BE(value: number) {
    this._dv.setUint32(this._offset, value, false);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeInt32LE(value: number) {
    this._dv.setInt32(this._offset, value, true);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeInt32BE(value: number) {
    this._dv.setInt32(this._offset, value, false);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeUInt16LE(value: number) {
    this._dv.setUint16(this._offset, value, true);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeUInt16BE(value: number) {
    this._dv.setUint16(this._offset, value, false);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeInt16LE(value: number) {
    this._dv.setInt16(this._offset, value, true);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeInt16BE(value: number) {
    this._dv.setInt16(this._offset, value, false);
    this._offset += 2;
  }

  /** @inheritdoc */
  public writeUInt8(value: number) {
    this._dv.setUint8(this._offset, value);
    this._offset += 1;
  }

  /** @inheritdoc */
  public writeInt8(value: number) {
    this._dv.setInt8(this._offset, value);
    this._offset += 1;
  }

  /** @inheritdoc */
  public writeDoubleLE(value: number) {
    this._dv.setFloat64(this._offset, value, true);
    this._offset += 8;
  }

  /** @inheritdoc */
  public writeDoubleBE(value: number) {
    this._dv.setFloat64(this._offset, value, false);
    this._offset += 8;
  }

  /** @inheritdoc */
  public writeFloatLE(value: number) {
    this._dv.setFloat32(this._offset, value, true);
    this._offset += 4;
  }

  /** @inheritdoc */
  public writeFloatBE(value: number) {
    this._dv.setFloat32(this._offset, value, false);
    this._offset += 4;
  }
}
