import type { IMemoryCommon } from '../common/i-memory-common';
import type { IMemoryReader } from '../common/i-memory-reader';
import { MemoryCommon } from './memory-common';

/** Memory reader */
export class MemoryReader extends MemoryCommon implements IMemoryReader<Buffer>, IMemoryCommon {
  /** @inheritdoc */
  public readBytes(maxLength: number, strict: boolean = false): Buffer {
    if (strict && this._offset + maxLength > this.length) {
      throw new Error(`You read too far (${this._offset}/${this.length}).`);
    } else {
      const result = this._buf.slice(this._offset, this._offset + maxLength);
      this._offset += maxLength;
      return result;
    }
  }

  /** @inheritdoc */
  public cloneBytes(length: number): Buffer {
    /*let result = new Buffer(length);
		this.buf.copy(result, 0, this.offset, length);*/
    const result = Buffer.alloc(length);
    this._buf.copy(result, 0, this._offset, this._offset + length);
    this._offset += length;
    return result;
  }

  /** @inheritdoc */
  public readCString32LE() {
    return this._readCString32(this.readUInt32LE());
  }

  /** @inheritdoc */
  public readCString32BE() {
    return this._readCString32(this.readUInt32BE());
  }

  /** Read a string */
  private _readCString32(len: number) {
    if (len <= this.remaining) {
      const result = this.readString(len);
      return result;
    }

    throw new Error(`Invalid length provided (${len}, only ${this.remaining} remaining).`);
  }

  /** @inheritdoc */
  public readCString16LE() {
    return this._readCString16(this.readUInt16LE());
  }

  /** @inheritdoc */
  public readCString16BE() {
    return this._readCString16(this.readUInt16BE());
  }

  private _readCString16(len: number) {
    if (len <= this.remaining) {
      const result = this.readString(len);
      return result;
    }

    throw new Error(`Invalid length provided (${len}, only ${this.remaining} remaining).`);
  }

  /** @inheritdoc */
  public readLine() {
    if (this.remaining === 0) {
      return undefined;
    }

    let startOffset = this._offset;
    let endPosition = this._offset;
    let postOffset = 0;
    let nextUInt8;
    while (nextUInt8 !== 0x0d && nextUInt8 !== 0x0a && nextUInt8 !== 0x0 && endPosition < this.length) {
      nextUInt8 = this._buf.readUInt8(endPosition);

      if (nextUInt8 === 0x0d || nextUInt8 === 0x0a || nextUInt8 === 0x0) {
        if (startOffset === endPosition) {
          startOffset++;
        } else {
          if (nextUInt8 !== 0x0) {
            postOffset++;
            const nextByte = this.peekByte(endPosition + 1);
            if ((nextByte === 0x0d || nextByte === 0x0a) && nextByte !== nextUInt8) {
              postOffset++;
            }
          }
        }
        break;
      } else {
        endPosition++;
      }
    }

    if (startOffset > endPosition) {
      endPosition = startOffset;
    }
    const result = this._buf.toString('ascii', startOffset, endPosition);
    this._offset = endPosition + postOffset;

    return (result as any).toString('utf-8');
  }

  /** @inheritdoc */
  public readStringWithMarker(maxLength: number = this.length, marker: number = 0x00) {
    let endPosition = -1;
    let reachLimit = false;
    for (let i = 0; i < maxLength; i++) {
      if (this._buf.readUInt8(this._offset + i) === marker) {
        endPosition = i;
        break;
      }
    }

    if (endPosition === -1) {
      reachLimit = true;
      endPosition = maxLength;
    } else {
    }

    const result = this.readString(endPosition);
    if (!reachLimit) {
      // We skip the marker !
      this._offset++;
    }

    return result;
  }

  /** @inheritdoc */
  public readString(length: number) {
    const result = this._buf.toString('ascii', this._offset, this._offset + length);
    this._offset += length;

    return (result as any).toString('utf-8');
  }

  /** @inheritdoc */
  public readDoubleBE() {
    const result = this._buf.readDoubleBE(this._offset);
    this._offset += 8;
    return result;
  }

  /** @inheritdoc */
  public readDoubleLE() {
    const result = this._buf.readDoubleLE(this._offset);
    this._offset += 8;
    return result;
  }

  /** @inheritdoc */
  public readFloatBE() {
    const result = this._buf.readFloatBE(this._offset);
    this._offset += 4;
    return result;
  }

  /** @inheritdoc */
  public readFloatLE() {
    const result = this._buf.readFloatLE(this._offset);
    this._offset += 4;
    return result;
  }

  /** @inheritdoc */
  public readInt8() {
    const result = this._buf.readInt8(this._offset);
    this._offset += 1;
    return result;
  }

  /** @inheritdoc */
  public readByte() {
    return this.readInt8();
  }

  /** @inheritdoc */
  public readInt16BE() {
    const result = this._buf.readInt16BE(this._offset);
    this._offset += 2;
    return result;
  }

  /** @inheritdoc */
  public readInt16LE() {
    const result = this._buf.readInt16LE(this._offset);
    this._offset += 2;
    return result;
  }

  /** @inheritdoc */
  public readInt32BE() {
    const result = this._buf.readInt32BE(this._offset);
    this._offset += 4;
    return result;
  }

  /** @inheritdoc */
  public readInt32LE() {
    const result = this._buf.readInt32LE(this._offset);
    this._offset += 4;
    return result;
  }

  /** @inheritdoc */
  public readUInt8() {
    const result = this._buf.readUInt8(this._offset);
    this._offset += 1;
    return result;
  }

  /** @inheritdoc */
  public peekByte(forcedOffset?: number) {
    const result = this._buf.readUInt8(forcedOffset ?? this._offset);
    return result;
  }

  /** @inheritdoc */
  public peekBytes(length: number, forcedOffset?: number) {
    const peekOffset = forcedOffset ?? this._offset;
    return this._buf.slice(peekOffset, peekOffset + length);
  }

  /** @inheritdoc */
  public readUInt16BE() {
    const result = this._buf.readUInt16BE(this._offset);
    this._offset += 2;
    return result;
  }

  /** @inheritdoc */
  public readUInt16LE() {
    const result = this._buf.readUInt16LE(this._offset);
    this._offset += 2;
    return result;
  }

  /** @inheritdoc */
  public readUInt32BE() {
    const result = this._buf.readUInt32BE(this._offset);
    this._offset += 4;
    return result;
  }

  /** @inheritdoc */
  public readUInt32LE() {
    const result = this._buf.readUInt32LE(this._offset);
    this._offset += 4;
    return result;
  }
}
