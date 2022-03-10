const BEGIN_CLOSE: Map<string, string> = new Map([
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
]);

const END_CLOSE: Set<string> = new Set([')', ']', '}']);

/** Symbols is balanced ? */
export function symbolsIsBalanced(str: string): boolean {
  if (!str) {
    // Null and empty strings are considered balanced
    return true;
  }

  let inComments = false;
  const lifo: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!inComments) {
      if (BEGIN_CLOSE.has(char)) {
        lifo.push(BEGIN_CLOSE.get(char) as string);
      } else if (END_CLOSE.has(char)) {
        if (lifo.length === 0 || char !== lifo[lifo.length - 1]) {
          // Not open or we try to close an other symbol
          return false;
        } else {
          // Fine, we pop
          lifo.pop();
        }
      } else if (char === '/' && str[i + 1] === '*') {
        inComments = true;
        i++;
      }
    } else {
      if (char === '*' && str[i + 1] === '/') {
        inComments = false;
        i++;
      }
    }
  }

  return lifo.length === 0 && inComments === false;
}
