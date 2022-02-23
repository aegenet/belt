/**
 * Interpolation
 */
export class Interpolation {
  private static readonly _DEFAULT_DIALECTS = {
    ECMAScript: /(\\{0,1})\${([a-zA-Z0-9_\-]{1,})}/,
  };

  constructor(
    private readonly _config: {
      /** Custom dialects, the regex must captures two things: the "skip" and the property name */
      customDialects?: Record<string, RegExp>;
    } = {
      customDialects: {},
    }
  ) {
    if (!this._config.customDialects) {
      this._config.customDialects = {};
    }
  }

  /** Tranform with interpolation */
  public transform(
    text: string,
    context: Record<string, unknown>,
    options?: {
      dialect: 'ECMAScript' | string;
    }
  ) {
    options = options ?? { dialect: 'ECMAScript' };
    context = context ?? {};

    const dialect = options.dialect in Interpolation._DEFAULT_DIALECTS ? Interpolation._DEFAULT_DIALECTS[options.dialect] : options.dialect in this._config.customDialects ? this._config.customDialects[options.dialect] : null;
    if (dialect) {
      const re = new RegExp(dialect, 'g');
      return text.replace(re, (substring: string, ...params: string[]) => {
        const key = params[1];
        const value = key in context ? context[key] : null;
        return value == null ? '' : String(value);
      });
    } else {
      throw new Error(`Invalid usage: ${options.dialect} language is not valid. You can add your own interpolation: constructor(config).`);
    }
  }
}

/** Tranform with interpolation */
export function transform(
  text: string,
  context: Record<string, unknown>,
  options?: {
    dialect: 'ECMAScript' | string;
  }
) {
  return new Interpolation().transform(text, context, options);
}
