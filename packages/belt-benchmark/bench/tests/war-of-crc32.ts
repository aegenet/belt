import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import { generateTestArray } from './common';
import { crc32 } from './../../../belt-crc32/src/index';
import { crc32Table } from '../../../belt-crc32/src/crc32-table';

const _TABLE = Buffer.alloc(1024);
for (let i = 0; i < 256; i++) {
  _TABLE.writeUInt32LE(crc32Table[i], i << 2);
}

/** CRC32 */
export function bufferCrc32For(input: string): number {
  if (input) {
    let crc = 0 ^ -1;

    const buffer = Buffer.from(input);
    for (let i = 0; i < buffer.length; i++) {
      crc = (crc >>> 8) ^ _TABLE.readUInt32LE(((crc ^ buffer[i]) & 0xff) << 2);
    }

    return (crc ^ -1) >>> 0;
  } else {
    return 0;
  }
}

/** CRC32 */
export function bufferCrc32Reduce(input: string): number {
  if (input) {
    return (
      (Buffer.from(input).reduce((crc, c) => {
        // tslint:disable-next-line:no-bitwise
        return (crc >>> 8) ^ _TABLE.readUint32LE(((crc ^ c) & 0xff) << 2);
      }, -1) ^
        -1) >>>
      0
    );
  } else {
    return 0;
  }
}

export async function warOfCRC32(duration: number, arraySize: number): Promise<RaceResult[]> {
  const samples = generateTestArray(arraySize, 'string');
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of CRC32 - ${arraySize} items`,
    duration,
  });

  const stats = await raceTrack.race(
    {
      name: 'crc32 charCodeAt',
      spec: (ctx: ILapContext<number>) => {
        samples.forEach(f => (ctx.value += crc32(f)));
      },
    },
    {
      name: 'crc32 buffer reduce',
      spec: (ctx: ILapContext<number>) => {
        samples.forEach(f => (ctx.value += bufferCrc32Reduce(f)));
      },
    },
    {
      name: 'crc32 buffer for',
      spec: (ctx: ILapContext<number>) => {
        samples.forEach(f => (ctx.value += bufferCrc32For(f)));
      },
    }
  );
  return stats;
}
