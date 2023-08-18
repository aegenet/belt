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
    if (typeof this._options.separator === 'string' && (!this._options.ignoreTags || Object.keys(this._options.ignoreTags).length === 0) && this._options.ignoreEmpty !== true) {
      this.split = str => {
        if (str != null) {
          return str.split(this._options.separator as string);
        } else {
          return [];
        }
      };
    } else {
      this.split = this._createStringSplit(this._options);
    }
  }

  private _createStringSplit({ separator, includeSep = false, ignoreTags = {}, ignoreEmpty = false }: IStringSplitOptions): (str: string) => string[] {
    /** Optimize one chars tags */
    const optimizeTags: Array<{ open: string; close: string }> = [];
    const slowTags: Array<{ open: string; close: string }> = [];
    const separators = typeof separator === 'string' ? [separator] : separator;

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

    let mapperCl = 'const mapperCl = {';
    for (let i = 0; i < slowTags.length; i++) {
      mapperCl += `  ${JSON.stringify(slowTags[i].close)}: (str, i) => ${slowTags[i].close
        .split('')
        .map((c, cidx) => `${JSON.stringify(c)} === str[i + ${cidx}]`)
        .join(' && ')},\n`;
    }
    for (let i = 0; i < optimizeTags.length; i++) {
      mapperCl += `  ${JSON.stringify(optimizeTags[i].close)}: (str, i) => ${JSON.stringify(optimizeTags[i].close)} === str[i],\n`;
    }
    mapperCl += '\n};';

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

    ${mapperCl}

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
  ${slowTags
    .map(
      (f, i) =>
        `        ${i > 0 ? 'else ' : ''}if (${f.open
          .split('')
          .map((c, cidx) => `${JSON.stringify(c)} === str[i + ${cidx}]`)
          .join(' && ')}) { lifo.push(${JSON.stringify(f.close)}); }`
    )
    .join('\n')}
  ${slowTags
    .map(
      f => `        else if (${f.close
        .split('')
        .map((c, cidx) => `${JSON.stringify(c)} === str[i + ${cidx}]`)
        .join(' && ')}) {
            if (lifo.length === 0 || !mapperCl[lifo[lifo.length - 1]](str, i)) {
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
        ${slowTags.length ? 'else ' : ''}if (lifo.length === 0 && (${separators.map(f => `char === ${JSON.stringify(f)}`).join(' || ')})) {
          if (!${ignoreEmpty} || currentWord.length) {
            splited.push(currentWord);
          }
          ${includeSep ? 'splited.push(char);' : ''}
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
