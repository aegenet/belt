import type { IMemoryCommon } from '../common/i-memory-common';

/** Memory common */
export abstract class MemoryCommon implements IMemoryCommon<ArrayBuffer> {
  protected _offset: number = 0;
  protected readonly _dv: DataView;

  constructor(protected _buf: ArrayBuffer) {
    this._dv = new DataView(this._buf);
  }

  /** @inheritdoc */
  public get position() {
    return this._offset;
  }

  /** @inheritdoc */
  public get buffer(): ArrayBuffer {
    return this._buf;
  }

  /** @inheritdoc */
  public get length() {
    return this._buf.byteLength;
  }

  /** @inheritdoc */
  public get remaining() {
    return this.length - this._offset;
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
