/**
 * `@jsonIgnore` decorator
 */
export function jsonIgnore(target: unknown, propertyKey: string) {
  const symbProperty: unique symbol = Symbol(`sym_${propertyKey}`);

  if ((target as Record<symbol, unknown>)[symbProperty]) {
    return;
  }

  Object.defineProperty(target, propertyKey, {
    enumerable: false,
    configurable: true,
    get: function () {
      return this[symbProperty];
    },
    set: function (value: unknown) {
      this[symbProperty] = value;
    },
  });
}
