import type { IStringSplit } from './i-string-split';
import type { IStringSplitOptions } from './i-string-split-options';

/**
 * String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags'
 *
 * eg: Something Else (Ignore me) => ['Something', 'Else', '(Ignore Me)']
 */
export class StringSplit implements IStringSplit {
  public readonly split: (str: string) => string[];

  constructor(private readonly _options: IStringSplitOptions) {
    // this.split = this._createStringSplit(this._options);
    this.split =
      (!this._options.ignoreTags || Object.keys(this._options.ignoreTags).length === 0) && this._options.ignoreEmpty !== true ? str => (str != null ? str.split(this._options.separator) : []) : this._createStringSplit(this._options);
  }

  private _createStringSplit({ separator, ignoreTags = {}, ignoreEmpty = false }: IStringSplitOptions): (str: string) => string[] {
    /** Optimize one chars tags */
    const optimizeTags: Array<{ open: string; close: string }> = [];
    const slowTags: Array<{ open: string; close: string }> = [];

    Object.entries(ignoreTags).forEach(entry => {
      if (entry[0].length === 1 && entry[1].length === 1) {
        optimizeTags.push({
          open: entry[0],
          close: entry[1],
        });
      } else {
        slowTags.push({
          open: entry[0],
          close: entry[1],
        });
      }
    });

    return new Function(
      'str',
      `
    if (str == null) { return []; }
    const lifo = [];
    const splited = [];
    let currentWord = '';
    let addChar = false;
    let char;
    const len = str.length;
    let endStr;
    for (let i = 0; i < len; i++) {
      char = str[i];
      endStr = str.slice(i);
      addChar = true;
  
      switch (char) {
  ${optimizeTags.map(f => `     case ${JSON.stringify(f.open)}:\n       lifo.push(${JSON.stringify(f.close)}); break;`).join('\n')}
  ${optimizeTags
    .map(
      f => `      case ${JSON.stringify(f.close)}:
          if (lifo.length === 0 || ${JSON.stringify(f.close)} != lifo[lifo.length - 1]) {
            // Not open or we try to close an other symbol
            throw new Error('StringSplit cannot ignores tags with unbalanced symbols');
          } else {
            // Fine, we pop
            lifo.pop();
          }
          break;
  `
    )
    .join('\n')}
        default:
  ${slowTags.map((f, i) => `        ${i > 0 ? 'else ' : ''}if (endStr.startsWith(${JSON.stringify(f.open)})) { lifo.push(${JSON.stringify(f.close)}); }`).join('\n')}
  ${slowTags
    .map(
      f => `        else if (endStr.startsWith(${JSON.stringify(f.close)})) {
            if (lifo.length === 0 || !endStr.startsWith(lifo[lifo.length - 1])) {
              // Not open or we try to close an other symbol
              throw new Error('StringSplit cannot ignores tags with unbalanced symbols');
            } else {
              // Fine, we pop
              lifo.pop();
            }
          }
  `
    )
    .join('\n')}
        ${slowTags.length ? 'else ' : ''}if (lifo.length === 0 && char === ${JSON.stringify(separator)}) {
          if (!${ignoreEmpty} || currentWord.length) {
            splited.push(currentWord);
          }
          addChar = false;
          currentWord = '';
        }
      }
  
      if (addChar) {
        currentWord += char;
      }
    }
  
    if (!${ignoreEmpty} || currentWord.length) {
      splited.push(currentWord);
    }
  
    return splited;
  `
    ) as (str: string) => string[];
  }
}
