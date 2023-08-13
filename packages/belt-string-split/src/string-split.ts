import type { IStringSplitOptions } from './i-string-split-options';

/**
 * String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags'
 *
 * eg: Something Else (Ignore me) => ['Something', 'Else', '(Ignore Me)']
 */
export function stringSplit(str: string, { separator, ignoreTags = {}, ignoreEmpty = false }: IStringSplitOptions): string[] {
  if (str == null) {
    return [];
  }
  const splited: string[] = [];
  const endTags = new Set(...Object.values(ignoreTags));

  const lifo: string[] = [];

  let currentWord: string = '';
  let addChar: boolean = false;
  let char: string;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    char = str[i];
    addChar = true;

    if (ignoreTags[char]) {
      lifo.push(ignoreTags[char] as string);
    } else if (endTags.has(char)) {
      if (lifo.length === 0 || char !== lifo[lifo.length - 1]) {
        // Not open or we try to close an other symbol
        throw new Error('StringSplit cannot ignores tags with unbalanced symbols');
      } else {
        // Fine, we pop
        lifo.pop();
      }
    } else if (lifo.length === 0 && char === separator) {
      if (!ignoreEmpty || currentWord.length) {
        splited.push(currentWord);
      }
      addChar = false;
      currentWord = '';
    }

    if (addChar) {
      currentWord += char;
    }
  }

  if (!ignoreEmpty || currentWord.length) {
    splited.push(currentWord);
  }

  return splited;
}
