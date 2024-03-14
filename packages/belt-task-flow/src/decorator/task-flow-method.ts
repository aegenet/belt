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
) {
  return function (target: TaskFlowListener, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    if (!target.__tfSubs) {
      target.__tfSubs = [];
    }

    const actions: ITaskFlowSubscription[] = target.__tfSubs;

    const prefix = options.prefix ?? 'tf';
    const channel = options.channel?.length ? `${options.prefix ? options.prefix + '.' : ''}${options.channel}` : `${prefix && prefix != '' ? prefix + '.' : ''}${`${target.constructor.name}:${propertyKey.toString()}`}`;

    if (actions) {
      actions.push({
        channel,
        once: !!options.once,
        methodName: propertyKey.toString(),
        token: undefined,
        order: options.order,
      });
    }
    return descriptor;
  };
}
