import type { ITaskFlowSubscription } from './i-task-flow-subscription';
import type { TaskFlowListener } from './task-flow-subscription';

/**
 * Automatically adds an event linked to this method.
 * Warning: must be run through a RaTaskFlow
 *
 * @example
 * @registerTaskFlow()
 * public doIt() {
 *  alert('hello');
 * }
 *
 * // tf.publish(tf.[className]:doIt)
 */
export function taskFlowMethod(
  options: {
    /**
     * Custom channel
     *
     * @default [prefix][.][className]:[methodName]
     */
    channel?: string;
    /** Once */
    once?: boolean;
    /**
     * Message prefix
     *
     * @default tf
     */
    prefix?: string;
    /** Optional, allows you to define a running order */
    order?: number;
  } = { once: false }
): (originalMethod: unknown, context: ClassMethodDecoratorContext) => void {
  return function (originalMethod, context: ClassMethodDecoratorContext) {
    const propertyKey = context.name;
    context.addInitializer(function (this: unknown): void {
      if (!(this as TaskFlowListener).__tfSubs) {
        (this as TaskFlowListener).__tfSubs = [];
      }

      const actions: ITaskFlowSubscription[] | undefined = (this as TaskFlowListener).__tfSubs;

      const prefix = options.prefix ?? 'tf';
      const channel = options.channel?.length
        ? `${options.prefix ? options.prefix + '.' : ''}${options.channel}`
        : `${prefix && prefix != '' ? prefix + '.' : ''}${`${(this as TaskFlowListener).constructor.name}:${propertyKey.toString()}`}`;

      if (actions) {
        // We add the subscription to the list, but before we subscribe:
        // since the stage 3, `addInitializer` methods are executed after the constructor, so we must subscribe now
        actions.push(
          (this as TaskFlowListener).__subscribeMethod({
            channel,
            once: !!options.once,
            methodName: propertyKey.toString(),
            token: undefined,
            order: options.order,
          })
        );
      }
    });
    return originalMethod;
  };
}
