import { crc32Table } from './crc32-table';

/** CRC32 */
export function crc32(input: string): number {
  if (input) {
    // internal type to unsigned integer (0xffffffff...)
    let crc = ~0;
    for (let i = 0; i < input.length; i++) {
      // tslint:disable-next-line:no-bitwise
      crc = (crc >>> 8) ^ crc32Table[(crc ^ input.charCodeAt(i)) & 0xff];
    }
    // tslint:disable-next-line:no-bitwise
    return (crc ^ -1) >>> 0;
  } else {
    return 0;
  }
}
