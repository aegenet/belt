import type { IMemoryWriter } from './i-memory-writer';

/** Create a buffer with a dynamic size */
export interface IMemoryCreator<InternalType = unknown> extends IMemoryWriter<InternalType> {
  /** Get length of concatened buffer */
  get length(): number;

  /** Get concatened buffer */
  get buffer(): InternalType;
}
