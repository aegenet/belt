/** Interface Memory common */
export interface IMemoryCommon<InternalType = unknown> {
  /** Length of internal buffer */
  get length(): number;

  /** Remaining bytes */
  get remaining(): number;

  /** Current position (offset, cursor) */
  get position(): number;

  /** Get the internal buffer */
  get buffer(): InternalType;

  /** Move the cursor to the offset */
  seek(offset: number): void;

  /** Set offset to 0 */
  rewind(): void;
}
