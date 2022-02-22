export type StepType = 'object' | 'indice';

export type SetValueOptions = {
  /** Fast, but use memory */
  memoize?: boolean;
  /** Create object path if undefined or null (slowest) */
  autoCreate?: boolean;
};

/** ODeepSet */
export class ODeepSet {
  private _jitCache: Map<string, (context: unknown, value: unknown) => void>;

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
  public setValue<C = Record<string, any>>(context: C, pathFlow: Array<{ propName: string; type: StepType } | string | number>, value: unknown, options?: SetValueOptions): void {
    options = options || {};

    if (!context || !pathFlow) {
      // By choice, we don't throw an error, just ignore
      return;
    }

    let symbol: string;
    if (options.memoize) {
      symbol = this._getMemoizeKey(pathFlow, options);
      if (this._jitCache.has(symbol)) {
        return this._jitCache.get(symbol)(context, value);
      }
    }

    const jitFunc = this._compileJIT(pathFlow, options);
    if (symbol) {
      // memoize
      this._jitCache.set(symbol, jitFunc);
    }

    return jitFunc(context, value);
  }

  private _getMemoizeKey(pathFlow: Array<{ propName: string; type: StepType } | string | number>, options?: SetValueOptions) {
    return JSON.stringify(pathFlow) + ',' + options.autoCreate;
  }

  private _compileJIT(pathFlow: Array<{ propName: string; type: StepType } | string | number>, options?: SetValueOptions): (context: unknown, value: unknown) => void {
    let jit = '';
    if (!options.autoCreate) {
      jit = this._createJITFunc(pathFlow);
    } else {
      jit = this._createJITFuncWithControl(pathFlow);
    }

    return new Function('context', 'value', jit) as (context: unknown, value: unknown) => void;
  }

  /** Set the value in path (without control) */
  private _createJITFunc(path: Array<{ propName: string; type: StepType } | string | number>) {
    let jit = `context`;
    for (let i = 0; i < path.length; i++) {
      const step = this._getStep(path[i]);
      if (i === 0 && step.propName === '#') {
        continue;
      }

      jit += !isNaN(step.propName as any) || step.stepType === 'indice' ? `[${step.propName}]` : `.${step.propName}`;
    }

    jit += ' = value;';
    return jit;
  }

  /** Set the value in path (with control) */
  private _createJITFuncWithControl(path: Array<{ propName: string; type: StepType } | string | number>) {
    let jit = '';
    for (let i = 0; i < path.length; i++) {
      const isLast = i === path.length - 1;

      const step = this._getStep(path[i]);
      if (i === 0 && step.propName === '#') {
        continue;
      }
      const prevCtx = i === 0 ? 'context' : `a${i - 1}`;
      const propPath = !isNaN(step.propName as any) || step.stepType === 'indice' ? `${prevCtx}[${step.propName}]` : `${prevCtx}.${step.propName}`;

      if (!isLast) {
        jit += `if (${propPath} == null) { ${propPath} = ${step.stepType === 'indice' ? '[]' : '{}'}; }\n`;
        jit += `const a${i} = ${propPath};\n`;
      } else {
        jit += `${propPath} = value;`;
      }
    }

    return jit;
  }

  private _getStep(step: string | { propName: string; type: StepType } | number) {
    let stepType: StepType = 'object';
    let stepName: string | number;

    if (typeof step === 'object') {
      stepName = step.propName;
      stepType = step.type;
    } else {
      stepName = step;
    }

    return {
      propName: stepName,
      stepType,
    };
  }
}
