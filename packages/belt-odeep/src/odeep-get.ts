/* eslint-disable @typescript-eslint/no-non-null-assertion */
export type GetValueOptions = {
  /** Fast, pre-parse, but use memory */
  memoize?: boolean;
  /** Ignore error in path ? Return undefined if an element of path is undefined */
  shallowError?: boolean;
  /** Safer */
  safer?: boolean;
};

/** ODeepGet */
export class ODeepGet {
  private readonly _safePropertyRE = /^[a-z0-9\-_]+$/i;

  private _jitCache: Map<string, (context: unknown) => unknown>;

  constructor() {
    this._jitCache = new Map();
  }

  /** Clear the JIT cache */
  public clear() {
    this._jitCache.clear();
  }

  /**
   * Set value into an object
   */
  public getValue<C = Record<string, any>, O = unknown>(context: C, pathFlow: Array<string | number>, options?: GetValueOptions): O | undefined {
    options = options || {};

    if (!context || !pathFlow) {
      // By choice, we don't throw an error, just ignore
      return;
    }

    let symbol: string;
    if (options.memoize) {
      symbol = this._getMemoizeKey(pathFlow, options);
      if (this._jitCache.has(symbol)) {
        return this._jitCache.get(symbol)!(context) as O;
      }
    } else if (options.safer) {
      return this._getImmediatValueSafer(context, pathFlow, options);
    } else {
      return this._getImmediatValue(context, pathFlow, options);
    }

    const jitFunc = options.safer ? this._compileJITSafer(pathFlow, options) : this._compileJIT(pathFlow, options);
    if (symbol) {
      // memoize
      this._jitCache.set(symbol, jitFunc);
    }

    return jitFunc(context) as O;
  }

  private _getMemoizeKey(pathFlow: Array<string | number>, options: GetValueOptions) {
    return JSON.stringify(pathFlow) + ',' + options.shallowError;
  }

  private _compileJIT(pathFlow: Array<string | number>, options: GetValueOptions): (context: unknown) => unknown {
    return new Function('context', this._createJITFunc(pathFlow, options)) as (context: unknown) => unknown;
  }

  private _compileJITSafer(pathFlow: Array<string | number>, options: GetValueOptions): (context: unknown) => unknown {
    return new Function('context', this._createJITFuncSafer(pathFlow, options)) as (context: unknown) => unknown;
  }

  /** Set the value in path (without control) */
  private _createJITFunc(path: Array<string | number>, options: GetValueOptions) {
    let jit = `return context`;
    let step: string | number;
    for (let i = 0; i < path.length; i++) {
      step = path[i];
      if (i === 0 && step === '#') {
        continue;
      }

      jit += !isNaN(step as any) ? `[${step}]` : `.${step}`;
    }
    if (options.shallowError) {
      jit = `try { ${jit}} catch { return undefined; }`;
    }
    return jit;
  }

  /** Set the value in path (without control) */
  private _createJITFuncSafer(path: Array<string | number>, options: GetValueOptions) {
    let jit = `context`;
    let control = '';
    let step: string | number = '';
    let inError: boolean = false;

    for (let i = 0; i < path.length; i++) {
      step = path[i];
      control += `${jit}.hasOwnProperty('${step}') && `;
      if (i === 0 && step === '#') {
        continue;
      }
      if (!this._safePropertyRE.test(step as string)) {
        if (!options.shallowError) {
          throw new Error(`The property path (${path.join('.')}) seems invalid`);
        } else {
          inError = true;
          break;
        }
      }

      jit += !isNaN(step as any) ? `[${step}]` : `.${step}`;
    }

    // Error but shallow
    if (inError) {
      return 'return undefined;';
    } else {
      jit = `if (${control}true) { return ${jit} } else { throw new Error('The property path (${path.join('.')}) seems invalid'); }`;

      if (options.shallowError) {
        jit = `try { ${jit}} catch { return undefined; }`;
      }
      return jit;
    }
  }

  /** If no memoize, we can get the value by a simple reduce */
  private _getImmediatValue<C, O>(context: C, pathFlow: Array<string | number>, options: GetValueOptions): O {
    if (pathFlow[0] === '#') {
      pathFlow = pathFlow.slice(1);
    }

    if (options.shallowError) {
      return pathFlow.reduce<any>((prev, curr) => (prev ? prev[curr] : undefined), context);
    } else {
      return pathFlow.reduce<any>((prev, curr) => prev[curr], context);
    }
  }

  /** If no memoize, we can get the value by a simple reduce (safer) */
  private _getImmediatValueSafer<C, O>(context: C, pathFlow: Array<string | number>, options: GetValueOptions): O {
    if (pathFlow[0] === '#') {
      pathFlow = pathFlow.slice(1);
    }

    if (options.shallowError) {
      return pathFlow.reduce<any>((prev, curr) => (prev && this._safePropertyRE.test(curr as string) && (prev as object).hasOwnProperty(curr) ? prev[curr] : undefined), context);
    } else {
      return pathFlow.reduce<any>((prev, curr) => {
        if (prev && this._safePropertyRE.test(curr as string) && (prev as object).hasOwnProperty(curr)) {
          return prev[curr];
        } else {
          throw new Error(`The property path (${pathFlow.join('.')}) seems invalid`);
        }
      }, context);
    }
  }
}
