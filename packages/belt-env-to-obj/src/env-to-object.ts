const RE_ENV_VALUE = /^([^"']*)$|^'([^']*)'$|^"([^"]*)"$/;
const RE_IS_NUMBER = /^\d+$/;

import { ODeepSet } from './../../belt-odeep/src/odeep-set';

/**
 * Combine multiple environment variables into one JS object.
 *
 * @param env - An environment like object ({ SOMETHING: 'value', ELSE: 'Another' }).
 *
 * @example
 * ```ts
 * const env = { NAME: 'John', AGE: '25' };
 * const result = envToObject(env);
 * //=> { NAME: 'John', AGE: 25 }
 * ```
 */
export function envToObject<O extends object = Record<string, string | boolean | number>>(
  env: Record<string, string | undefined>,
  options?: {
    /**
     * A regular expression to match the environment variable keys.
     *
     * @default /^[\w_]+/
     */
    pattern?: RegExp;
    /**
     * A delimiter to split the keys into nested objects.
     *
     * @default '__' (double underscore)
     */
    nestedDelimiter?: string | RegExp;
    /**
     * Convert the key (before splitting)
     */
    convertKey?: (key: string) => string;
    /**
     * Convert the value
     */
    convertValue?: (value: string | number | boolean | undefined, key: string) => unknown;
    /**
     * Keep undefined key/value
     *
     * @default true
     */
    keepUndefined?: boolean;
  }
): O {
  options ??= {};

  const { nestedDelimiter = '__', pattern = /^[\w_]+/, convertKey, convertValue } = options;

  const oDeepSet = new ODeepSet();

  const params: O = {} as O;
  let computedKey: string | undefined;
  let value: string | boolean | number | undefined;

  for (const key in env) {
    if (pattern.test(key)) {
      value = env[key];
      const valueMatch = value?.match(RE_ENV_VALUE);
      if (valueMatch?.length) {
        if (valueMatch[1]) {
          if (valueMatch[1].match(RE_IS_NUMBER)) {
            value = parseInt(valueMatch[1], 10);
          } else if (valueMatch[1] === 'true' || valueMatch[1] === 'false') {
            value = valueMatch[1] === 'true';
          } else {
            value = valueMatch[1];
          }
        } else if (value) {
          value = valueMatch[2] || valueMatch[3];
        } else {
          // Skip empty values
          continue;
        }
      } else {
        value = undefined;
      }

      if (value != null || options.keepUndefined === true) {
        computedKey = convertKey != null ? convertKey(key) : key;
        oDeepSet.setValue(
          params,
          computedKey.split(nestedDelimiter),
          convertValue != null ? convertValue(value, computedKey) : value,
          {
            autoCreate: true,
          }
        );
      }
    }
  }

  return params;
}
