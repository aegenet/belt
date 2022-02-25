export type GetValueOptions = {
  /** Fast, pre-parse, but use memory */
  memoize?: boolean;
  /** Ignore error in path ? Return undefined if an element of path is undefined */
  shallowError?: boolean;
};

/** ODeepGet */
export class ODeepGet {
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
  public getValue<C = Record<string, any>, O = unknown>(context: C, pathFlow: Array<string | number>, options?: GetValueOptions): O {
    options = options || {};

    if (!context || !pathFlow) {
      // By choice, we don't throw an error, just ignore
      return;
    }

    let symbol: string;
    if (options.memoize) {
      symbol = this._getMemoizeKey(pathFlow, options);
      if (this._jitCache.has(symbol)) {
        return this._jitCache.get(symbol)(context) as O;
      }
    } else {
      return this._getImmediatValue(context, pathFlow, options);
    }

    const jitFunc = this._compileJIT(pathFlow, options);
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

  /** Set the value in path (without control) */
  private _createJITFunc(path: Array<string | number>, options: GetValueOptions) {
    let jit = `return context`;
    for (let i = 0; i < path.length; i++) {
      const step = path[i];
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

  /** If no memoize, we can get the value by a simple reduce */
  private _getImmediatValue<C, O>(context: C, pathFlow: Array<string | number>, options: GetValueOptions): O {
    if (pathFlow[0] === '#') {
      pathFlow = pathFlow.slice(1);
    }

    if (options.shallowError) {
      return pathFlow.reduce((prev, curr) => (prev ? prev[curr] : undefined), context);
    } else {
      return pathFlow.reduce((prev, curr) => prev[curr], context);
    }
  }
}
