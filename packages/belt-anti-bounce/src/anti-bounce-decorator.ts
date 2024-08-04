import { AntiBounce } from './anti-bounce';
import type { IAntiBounce } from './i-anti-bounce';

/**
 * Anti-bounce a method (a method, not a function)
 *
 * @example
 * ```typescript
 * class Sample implements IAntiBounceSupport {
 *   public $antiBounces?: Map<string, AntiBounce>;
 *   private _i = 0;
 *
 *   @antiBounce({ duration: 300 })
 *   public inc(): void {
 *     this._i++;
 *   }
 *
 *   public main() {
 *     this.inc();
 *     this.inc();
 *     this.inc();
 *     // this._i => 1
 *   }
 * }
 * ```
 */
export function antiBounce(
  options: IAntiBounceOptions
): (target: unknown, context: ClassMethodDecoratorContext) => void {
  options ||= {};

  return function (originalMethod: unknown, context: ClassMethodDecoratorContext): void {
    const methodName = String(context.name);
    if (context.private) {
      throw new Error(`'antiBounce' cannot decorate private properties like ${methodName}.`);
    }

    if (context.kind === 'method') {
      context.addInitializer(function (this: unknown) {
        const method = _wrapAntiBounce(
          this as IAntiBounceSupport,
          (originalMethod as (...params: unknown[]) => void).bind(this),
          context.name,
          options
        );

        Object.defineProperty(this, methodName, {
          enumerable: false,
          configurable: true,
          value: method.call.bind(method),
        });
      });
    } else {
      throw new Error(`'antiBounce' cannot decorate ${context.kind} like ${methodName}.`);
    }
  };
}

function _wrapAntiBounce(
  instance: IAntiBounceSupport,
  originalMethod: (...params: unknown[]) => void,
  propertyKey: string | symbol,
  options: IAntiBounceOptions
): IAntiBounce {
  if (!instance.$antiBounces) {
    Object.defineProperty(instance, '$antiBounces', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: new Map(),
    });
    // instance.$antiBounces = new Map();
  }

  if (!instance.$antiBounces!.has(propertyKey)) {
    instance.$antiBounces!.set(
      propertyKey,
      new AntiBounce(
        originalMethod,
        options.duration,
        options.checker ? (instance as any)[options.checker].bind(instance) : undefined
      )
    );
  }
  return instance.$antiBounces!.get(propertyKey)!;
}

/**
 * Debounce decorator options
 */
export interface IAntiBounceOptions {
  /** Duration in ms */
  duration?: number;
  /** We can specify a function name to "check" immediatly without waiting for duration */
  checker?: string;
}

/**
 * Good to known @antiBounceMe add private properties in your classes.
 * Thus, use this interface to "know" the properties.
 *
 * Ah! Don't forget to call `disposeAntiBounces` in your lifecycle (dispose)!
 * The `declare` keyword is used to avoid any conflict: the decorator will add the property.
 *
 * @example
 * ```ts
 * class Sample implements IAntiBounceSupport {
 *   public declare $antiBounces?: Map<string, AntiBounce>;
 *   private _i = 0;
 *
 *   @antiBounce({ duration: 300 })
 *   public inc(): void {
 *     this._i++;
 *   }
 * }
 * ```
 */
export interface IAntiBounceSupport {
  /** DebouceIts instances (allows purging) */
  $antiBounces?: Map<string | symbol, IAntiBounce>;
}

/** Clean all antiBounce used */
export function disposeAntiBounces(target: IAntiBounceSupport) {
  if (target?.$antiBounces) {
    for (const ab of target.$antiBounces.values()) {
      if (ab) {
        ab.dispose();
      }
    }
  }
}
