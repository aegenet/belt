/** Interface Memory reader */
export interface IMemoryReader<InternalType = unknown> {
  /** Read bytes (and **KEEP** a reference !) */
  readBytes(maxLength: number, strict?: boolean): InternalType;

  /** Clone bytes (and DON'T KEEP a reference !) */
  cloneBytes(length: number): InternalType;

  /** Read an ISO-8859-1 string [4B LE][VARY STR] */
  readCString32LE(): string;

  /** Read an ISO-8859-1 string [4B BE][VARY STR] */
  readCString32BE(): string;

  /** Read an ISO-8859-1 string [2B LE][VARY STR] */
  readCString16LE(): string;

  /** Read an ISO-8859-1 string [2B BE][VARY STR] */
  readCString16BE(): string;

  /** Read an ISO-8859-1 line, auto search the end of line (\\n, \\r or 0x0) */
  readLine(): string;

  /** Read an ISO-8859-1 string with end marker, default 0x00 */
  readStringWithMarker(maxLength?: number, marker?: number): string;

  /** Read an ISO-8859-1 string with specific size */
  readString(length: number): string;

  /** Read a double (8 bytes) */
  readDoubleBE(): number;

  /** Read a double (8 bytes) */
  readDoubleLE(): number;

  /** Read a float (4 bytes) */
  readFloatBE(): number;

  /** Read a float (4 bytes) */
  readFloatLE(): number;

  /** Read a signed byte (1 byte) */
  readInt8(): number;

  /** Read a unsigned byte (1 byte) */
  readByte(): number;

  /** Read a signed number (2 bytes) */
  readInt16BE(): number;

  /** Read a signed number (2 bytes) */
  readInt16LE(): number;

  /** Read a signed number (4 bytes) */
  readInt32BE(): number;

  /** Read a signed number (4 bytes) */
  readInt32LE(): number;

  /** Read a unsigned byte (1 byte) */
  readUInt8(): number;

  /** Peek a unsigned byte (1 byte), without increment offset */
  peekByte(forcedOffset?: number): number;

  /** Peek range of unsigned bytes, without increment offset */
  peekBytes(length: number, forcedOffset?: number): InternalType;

  /** Read a unsigned number (2 bytes) */
  readUInt16BE(): number;

  /** Read a unsigned number (2 bytes) */
  readUInt16LE(): number;

  /** Read a unsigned number (4 bytes) */
  readUInt32BE(): number;

  /** Read a unsigned number (4 bytes) */
  readUInt32LE(): number;
}
