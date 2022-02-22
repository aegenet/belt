/** Hooked count */
let _HOOKED_COUNT: number = 1;
/** Func call count */
let _FUNC_CALL_COUNT: number = 1;

/** Hooked functions prefix */
export const HOOK_PREFIX: string = '__hooked__';

/** Hooked func name */
function _createHookedName(funcName: string) {
  return `${HOOK_PREFIX}${funcName}${_HOOKED_COUNT++}`;
}

export type HookOptions<T = Record<string, unknown>> = { context: T; name: string; beforeCall?: (data: HookedFunctionStat) => void; afterCall?: (data: HookedFunctionStat) => void };
export type HookedFunctionStat = { id: number; startedAt: Date; result?: any; error?: any; endedAt?: Date; duration?: number };
export type HookDisposable = { dispose: () => void };

/**
 * Hook a function
 */
export function hook<T = Record<string, unknown>>(options: HookOptions<T>): HookDisposable {
  if (options?.context && options.name && options.name in options.context) {
    const context = options.context;
    const storageFuncName = _createHookedName(options.name);
    context[storageFuncName] = context[options.name];

    context[options.name] = function () {
      const startedAt = new Date();
      const id = _FUNC_CALL_COUNT++;
      try {
        if (options.beforeCall) {
          options.beforeCall({ id, startedAt });
        }
        // eslint-disable-next-line prefer-rest-params
        const results = this[storageFuncName].apply(context, arguments);
        // Promise ?
        if (results && typeof results !== 'number' && typeof results.then === 'function') {
          return (results as Promise<unknown>)
            .then(arg => {
              _afterCall<T>(options, { id, result: arg, startedAt });
              return arg;
            })
            .catch(error => {
              _afterCall<T>(options, { id, error, startedAt });
              throw error;
            });
        } else {
          _afterCall<T>(options, { id, result: results, startedAt });
          return results;
        }
      } catch (error) {
        _afterCall<T>(options, { id, error, startedAt: startedAt });
        throw error;
      }
    };

    return {
      dispose: () => {
        if (context && storageFuncName && storageFuncName in context) {
          context[options.name] = context[storageFuncName];
          delete context[storageFuncName];
        }
      },
    };
  } else {
    throw new Error(`Invalid usage: ${options.name} don't exist in context argument.`);
  }
}

function _afterCall<T = Record<string, unknown>>(options: HookOptions<T>, data: HookedFunctionStat) {
  if (options.afterCall) {
    const endedAt = new Date();
    options.afterCall(
      Object.assign(data, {
        endedAt,
        duration: endedAt.getTime() - data.startedAt.getTime(),
      })
    );
  }
}
