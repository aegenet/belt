/* eslint-disable @typescript-eslint/no-non-null-assertion */
/** Interpolation config */
export type InterpolationConfig = {
  /** Custom dialects, the regex must captures two things: the "skip" and the property name */
  customDialects?: Record<string, RegExp>;
  /** You can overide the default get value */
  getValue?: (ctx: unknown, propPath: string, ...other: string[]) => string;
};

/** Interpolation transform options */
export type InterpolationOptions = {
  /** Dialect, by default ECMAScript */
  dialect?: 'ECMAScript' | string;
};

/**
 * Interpolation
 */
export class Interpolation {
  private static readonly _DEFAULT_DIALECTS = {
    ECMAScript: /(\\{0,1})\${([\$\w_\.\-]{1,})}/,
  };

  private readonly _getValue: (ctx: unknown, propPath: string, ...other: string[]) => string;

  constructor(
    private readonly _config: InterpolationConfig = {
      customDialects: {},
    }
  ) {
    if (!this._config.customDialects) {
      this._config.customDialects = {};
    }
    this._getValue = this._config.getValue ?? Interpolation._defaultGetValue;
  }

  /** Tranform with interpolation */
  public transform<C = Record<string, unknown>>(
    /** String with interpolation */
    text: string,
    /** Data context */
    context: C,
    options?: InterpolationOptions
  ) {
    options = options ?? {};
    context = context ?? ({} as C);
    const dialectName = options.dialect || 'ECMAScript';

    const dialect = dialectName in Interpolation._DEFAULT_DIALECTS ? (Interpolation._DEFAULT_DIALECTS as Record<string, RegExp>)[dialectName] : dialectName in this._config.customDialects! ? this._config.customDialects![dialectName] : null;
    if (dialect) {
      const re = new RegExp(dialect, 'g');
      return text.replace(re, (substring: string, ...params: string[]) => {
        if (!params[0]) {
          return this._getValue(context, params[1], ...params.slice(1));
        } else {
          return substring;
        }
      });
    } else {
      throw new Error(`Invalid usage: ${dialectName} language is not valid. You can add your own interpolation: constructor(config).`);
    }
  }

  /** Default get Value */
  private static _defaultGetValue<C>(ctx: C, propPath: string) {
    const value = propPath in ctx ? (ctx as any)[propPath] : null;
    return value == null ? '' : String(value);
  }
}

/** Tranform with interpolation */
export function transform<C = Record<string, unknown>>(text: string, context: C, options?: InterpolationOptions) {
  return new Interpolation().transform<C>(text, context, options);
}
