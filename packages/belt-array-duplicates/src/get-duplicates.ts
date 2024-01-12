/**
 * Retrieves duplicates from a collection of numbers
 */
export function getDuplicates(collection: number[]) {
  const duplicates: number[] = [];

  if (collection) {
    const map: { [id: number]: number } = {};

    for (let i = 0; i < collection.length; i++) {
      const id = collection[i];
      if (id in map) {
        map[id]++;
      } else {
        map[id] = 0;
      }

      if (map[id] === 1) {
        duplicates.push(id);
      }
    }
  }

  return duplicates;
}
