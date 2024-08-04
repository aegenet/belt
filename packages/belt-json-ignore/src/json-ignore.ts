/**
 * `@jsonIgnore` decorator
 *
 * @remarks Stage 3 decorator
 */
export function jsonIgnore(_: unknown, context: ClassFieldDecoratorContext): any {
  const fieldName = String(context.name);
  if (context.private) {
    throw new Error(`'jsonIgnore' cannot decorate private properties like ${fieldName as string}.`);
  }

  if (context.kind === 'field') {
    context.addInitializer(function (this: unknown) {
      Object.defineProperty(this, fieldName, {
        enumerable: false,
        configurable: true,
        value: (this as Record<string, unknown>)[fieldName],
      });
    });
  } else {
    throw new Error(`'jsonIgnore' cannot decorate ${context.kind} like ${fieldName as string}.`);
  }
}
