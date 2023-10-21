import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import { type BenchItemType, generateTestArray } from './common';

function mergeSortByName(data: Array<{ name: string }>) {
  if (data.length > 1) {
    const middleLength = Math.floor(data.length / 2);
    const leftSide = data.slice(0, middleLength);
    const rightSide = data.slice(middleLength);
    mergeSortByName(leftSide);
    mergeSortByName(rightSide);
    let leftIndex = 0;
    let rightIndex = 0;
    let globalIndex = 0;
    while (leftIndex < leftSide.length && rightIndex < rightSide.length) {
      if (leftSide[leftIndex].name < rightSide[rightIndex].name) {
        data[globalIndex] = leftSide[leftIndex];
        leftIndex++;
      } else {
        data[globalIndex] = rightSide[rightIndex];
        rightIndex++;
      }
      globalIndex++;
    }

    // Copiez les éléments restants de leftSide, s'il y en a
    while (leftIndex < leftSide.length) {
      data[globalIndex] = leftSide[leftIndex];
      leftIndex++;
      globalIndex++;
    }

    // Copiez les éléments restants de rightSide, s'il y en a
    while (rightIndex < rightSide.length) {
      data[globalIndex] = rightSide[rightIndex];
      rightIndex++;
      globalIndex++;
    }
  }
  return data;
}

function mergeSort(data: Array<string | number>) {
  if (data.length > 1) {
    const middleLength = Math.floor(data.length / 2);
    const leftSide = data.slice(0, middleLength);
    const rightSide = data.slice(middleLength);
    mergeSort(leftSide);
    mergeSort(rightSide);
    let leftIndex = 0;
    let rightIndex = 0;
    let globalIndex = 0;
    while (leftIndex < leftSide.length && rightIndex < rightSide.length) {
      if (leftSide[leftIndex] < rightSide[rightIndex]) {
        data[globalIndex] = leftSide[leftIndex];
        leftIndex++;
      } else {
        data[globalIndex] = rightSide[rightIndex];
        rightIndex++;
      }
      globalIndex++;
    }

    // Copiez les éléments restants de leftSide, s'il y en a
    while (leftIndex < leftSide.length) {
      data[globalIndex] = leftSide[leftIndex];
      leftIndex++;
      globalIndex++;
    }

    // Copiez les éléments restants de rightSide, s'il y en a
    while (rightIndex < rightSide.length) {
      data[globalIndex] = rightSide[rightIndex];
      rightIndex++;
      globalIndex++;
    }
  }
  return data;
}

export async function warOfSort(duration: number, arraySize: number, itemType: BenchItemType): Promise<RaceResult[]> {
  const samples = generateTestArray(arraySize);
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Sort (${itemType}) - ${arraySize} items`,
    duration,
  });

  const stats = await raceTrack.race(
    {
      name: 'Merge sort',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              mergeSortByName(samples.slice(0));
            }
          : (ctx: ILapContext<number>) => {
              mergeSort(samples.slice(0));
            },
    },
    {
      name: 'sort',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              samples.slice(0).sort((a, b) => (b.name < a.name ? 1 : -1));
            }
          : (ctx: ILapContext<number>) => {
              samples.slice(0).sort((a, b) => (b < a ? 1 : -1));
            },
    }
  );
  return stats;
}
