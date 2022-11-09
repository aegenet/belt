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
export function antiBounce(options: IAntiBounceOptions) {
  options = options ?? {};

  function _wrapAntiBounce(instance: IAntiBounceSupport, descriptor: PropertyDescriptor, propertyKey: string): IAntiBounce {
    if (!instance.$antiBounces) {
      instance.$antiBounces = new Map();
    }

    if (!instance.$antiBounces.has(propertyKey)) {
      instance.$antiBounces.set(propertyKey, new AntiBounce(descriptor.value.bind(instance), options.duration, options.checker ? (instance as any)[options.checker].bind(instance) : undefined));
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return instance.$antiBounces.get(propertyKey)!;
  }

  return function (target: IAntiBounceSupport, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function (): unknown {
        const method = _wrapAntiBounce(this as IAntiBounceSupport, descriptor, propertyKey);
        Object.defineProperty(this, propertyKey, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: method.call.bind(method),
        });
        return (this as any)[propertyKey];
      },
    } as any; // weirdo
  };
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
 */
export interface IAntiBounceSupport {
  /** Instances des DebouceIts (permet de purger) */
  $antiBounces?: Map<string, IAntiBounce>;
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
