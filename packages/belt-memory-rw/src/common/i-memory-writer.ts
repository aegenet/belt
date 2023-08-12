import type { IMemoryCommon } from './i-memory-common';

/** Interface Memory writer */
export interface IMemoryWriter<InternalType = unknown> extends IMemoryCommon {
  /** Fill the array with a value and a length */
  fill(value: number, length: number): void;

  /** Write an unsigned byte (1 byte) */
  writeByte(value: number): void;

  /** Write bytes */
  writeBytes(values: number[] | InternalType): void;

  /** Write an ISO-8859-1 string [VARY STR] */
  writeString(value: string): void;

  /** Write an ISO-8859-1 string [VARY STR][MARKER] */
  writeStringWithMarker(value: string, endByte?: number): void;

  /** Write an ISO-8859-1 string [4B LE][VARY STR] */
  writeCString32LE(value: string): void;

  /** Write an ISO-8859-1 string [4B BE][VARY STR] */
  writeCString32BE(value: string): void;

  /** Write an ISO-8859-1 string [2B LE][VARY STR] */
  writeCString16LE(value: string): void;

  /** Write an ISO-8859-1 string [2B BE][VARY STR] */
  writeCString16BE(value: string): void;

  /** Write an unsigned number (4 bytes) */
  writeUInt32LE(value: number): void;

  /** Write an unsigned number (4 bytes) */
  writeUInt32BE(value: number): void;

  /** Write a signed number (4 bytes) */
  writeInt32LE(value: number): void;

  /** Write a signed number (4 bytes) */
  writeInt32BE(value: number): void;

  /** Write an unsigned number (2 bytes) */
  writeUInt16LE(value: number): void;

  /** Write an unsigned number (2 bytes) */
  writeUInt16BE(value: number): void;

  /** Write a signed number (2 bytes) */
  writeInt16LE(value: number): void;

  /** Write a signed number (2 bytes) */
  writeInt16BE(value: number): void;

  /** Write an unsigned byte (1 byte) */
  writeUInt8(value: number): void;

  /** Write a signed byte (1 byte) */
  writeInt8(value: number): void;

  /** Write a double (8 bytes) */
  writeDoubleLE(value: number): void;

  /** Write a double (8 bytes) */
  writeDoubleBE(value: number): void;

  /** Write a float (4 bytes) */
  writeFloatLE(value: number): void;

  /** Write a float (4 bytes) */
  writeFloatBE(value: number): void;
}
