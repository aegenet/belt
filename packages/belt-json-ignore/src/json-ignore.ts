/**
 * `@jsonIgnore` decorator
 */
export function jsonIgnore(target: unknown, propertyKey: string) {
  const symbProperty: unique symbol = Symbol(`sym_${propertyKey}`);

  Object.defineProperty(target, propertyKey, {
    enumerable: true,
    get: function () {
      return this[symbProperty];
    },
    set: function (value: unknown) {
      this[symbProperty] = value;
    },
  });
}
