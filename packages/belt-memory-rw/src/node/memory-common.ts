import type { IMemoryCommon } from '../common/i-memory-common';

/** Memory common */
export abstract class MemoryCommon implements IMemoryCommon<Buffer> {
  protected _offset: number = 0;

  constructor(protected _buf: Buffer) {}

  /** @inheritdoc */
  public get position() {
    return this._offset;
  }

  /** @inheritdoc */
  public get buffer(): Buffer {
    return this._buf;
  }

  /** @inheritdoc */
  public get length() {
    return this._buf.length;
  }

  /** @inheritdoc */
  public get remaining() {
    return this._buf.length - this._offset;
  }

  /** @inheritdoc */
  public seek(offset: number) {
    if (offset < this.length) {
      this._offset = offset;
    } else {
      throw new Error(`You seek too far (${offset}/${this.length}).`);
    }
  }

  /** @inheritdoc */
  public rewind() {
    this._offset = 0;
  }
}
