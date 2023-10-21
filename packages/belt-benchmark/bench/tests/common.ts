import * as crypto from 'node:crypto';

export type BenchItemType = 'object' | 'number' | 'string';
export type BenchItemObject = { a: number; b: number; r: 0 };

export function generateTestArray(arraySize: number, itemType: BenchItemType = 'object') {
  const result = [];
  for (let i = 0; i < arraySize; ++i) {
    switch (itemType) {
      case 'object':
        result.push({
          a: i,
          b: i / 2,
          r: 0,
        });
        break;
      case 'number':
        result.push(crypto.randomInt(100000));
        break;
      case 'string':
        result.push(crypto.randomUUID());
        break;
    }
  }

  return result;
}
