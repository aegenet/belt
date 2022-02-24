/** Inspired by https://github.com/sindresorhus/escape-string-regexp/blob/main/index.js */

/** Escape characters with special meaning either inside or outside character sets. */
const REGEX_1 = /[|\\{}()[\]^$+*?.]/g;
const REGEX_1_REPLACE = '\\$&';

/** Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar. */
const REGEX_2 = /-/g;
const REGEX_2_REPLACE = '\\x2d';

/** Escape future Regex */
export function escapeRegex(strRegex: string) {
  if (typeof strRegex === 'string') {
    REGEX_1.lastIndex = 0;
    REGEX_1.lastIndex = 0;
    return strRegex.replace(REGEX_1, REGEX_1_REPLACE).replace(REGEX_2, REGEX_2_REPLACE);
  } else {
    throw new Error('Invalid usage: argument provided is not a string.');
  }
}
