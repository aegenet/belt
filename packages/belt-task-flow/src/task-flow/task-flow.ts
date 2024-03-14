/* eslint-disable @typescript-eslint/restrict-template-expressions */

import type { ITaskFlow } from './i-task-flow';
import { TaskFlowHandler } from './task-flow-handler';
import type { TaskFlowSubOptions } from './task-flow-sub-options';
import type { TaskFlowConstructable, TaskFlowDisposable } from '../common/types';

/**
 * Disclaimer: This is a modified version of the original source code.
 *
 * From https://raw.githubusercontent.com/aurelia/aurelia/master/packages/kernel/src/eventaggregator.ts
 * The MIT License (MIT)
 * Copyright (c) 2010 - 2020 Blue Spire Inc.
 * https://github.com/aurelia/aurelia
 *
 * ASYNC Version - FIFO (vs FILO for EventAggregator)
 */

/**
 * Enables loosely coupled publish/subscribe messaging.
 * Awaiting version with FIFO (first in first out)
 */
export class TaskFlow implements ITaskFlow {
  /** @internal */
  public readonly eventLookup: Record<string, { handle: (message: unknown, channel: string) => void; options: TaskFlowSubOptions }[]> = {};
  /** @internal */
  public readonly messageHandlers: TaskFlowHandler<TaskFlowConstructable>[] = [];

  /**
   * Publishes a message.
   *
   * @param channel - The channel to publish to.
   * @param message - The message to publish on the channel.
   */
  public publish<T, C extends string>(channel: C, message: T): void;
  /**
   * Publishes a message.
   *
   * @param instance - The instance to publish.
   */
  public async publish<T extends TaskFlowConstructable>(instance: InstanceType<T>): Promise<void>;
  public async publish<T extends TaskFlowConstructable | string>(channelOrInstance: T extends TaskFlowConstructable ? InstanceType<T> : T, message?: unknown): Promise<void> {
    if (!channelOrInstance) {
      throw new Error(`Invalid channel name or instance: ${channelOrInstance}.`);
    }

    if (typeof channelOrInstance === 'string') {
      const subscribers = this.eventLookup[channelOrInstance]?.slice();
      if (subscribers) {
        this._sortSubscribers(subscribers);

        for (let i = 0; i < subscribers.length; i++) {
          await Promise.resolve(subscribers[i].handle(message, channelOrInstance));
        }
      }
    } else {
      const subscribers = this.messageHandlers.slice();
      this._sortSubscribers(subscribers);

      for (let i = 0; i < subscribers.length; i++) {
        await Promise.resolve(subscribers[i].handle(channelOrInstance));
      }
    }
  }

  // (refresh) Sort subscribers by order
  private _sortSubscribers<S extends { options: TaskFlowSubOptions }>(subscribers: S[]): S[] {
    return (
      subscribers?.sort((a, b) => {
        const vA = a.options?.order ?? 99999;
        const vB = b.options?.order ?? 99999;
        if (vA > vB) {
          return 1;
        } else if (vA < vB) {
          return -1;
        } else {
          return 0;
        }
      }) || []
    );
  }

  /**
   * Subscribes to a message channel (FIFO first in first out).
   *
   * @param channel - The event channel.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  public subscribe<T, C extends string>(channel: C, callback: (message: T, channel: C) => Promise<void> | void, options?: TaskFlowSubOptions): TaskFlowDisposable;
  /**
   * Subscribes to a message type (FIFO first in first out).
   *
   * @param type - The event message type.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  public subscribe<T extends TaskFlowConstructable>(type: T, callback: (message: InstanceType<T>) => Promise<void> | void, options?: TaskFlowSubOptions): TaskFlowDisposable;
  public subscribe(channelOrType: string | TaskFlowConstructable, callback: (...args: unknown[]) => Promise<void> | void, options?: TaskFlowSubOptions): TaskFlowDisposable {
    if (!channelOrType) {
      throw new Error(`Invalid channel name or type: ${channelOrType}.`);
    }

    let handler: TaskFlowHandler<any> | { handle: (...args: unknown[]) => Promise<void> | void; options: TaskFlowSubOptions };
    let subscribers: unknown[];

    if (typeof channelOrType === 'string') {
      if (this.eventLookup[channelOrType] === void 0) {
        this.eventLookup[channelOrType] = [];
      }
      handler = {
        handle: callback,
        options: options || {},
      };

      subscribers = this.eventLookup[channelOrType];
    } else {
      handler = new TaskFlowHandler(channelOrType, callback, options);

      subscribers = this.messageHandlers;
    }

    subscribers.push(handler);

    return {
      dispose(): void {
        const idx = subscribers.indexOf(handler);
        if (idx !== -1) {
          subscribers.splice(idx, 1);
        }
      },
    };
  }

  /**
   * Subscribes to a message channel, then disposes the subscription automatically after the first message is received.
   *
   * @param channel - The event channel.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  public subscribeOnce<T, C extends string>(
    channel: C,
    callback: (message: T, channel: C) => Promise<void> | void,
    options?: {
      order?: number;
    }
  ): TaskFlowDisposable;
  /**
   * Subscribes to a message type, then disposes the subscription automatically after the first message is received.
   *
   * @param type - The event message type.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  public subscribeOnce<T extends TaskFlowConstructable>(
    type: T,
    callback: (message: InstanceType<T>) => Promise<void> | void,
    options?: {
      order?: number;
    }
  ): TaskFlowDisposable;
  public subscribeOnce(
    channelOrType: string | TaskFlowConstructable,
    callback: (...args: unknown[]) => Promise<void> | void,
    options?: {
      order?: number;
    }
  ): TaskFlowDisposable {
    const sub = this.subscribe(
      channelOrType as string,
      function (message, event) {
        sub.dispose();
        return callback(message, event);
      },
      options
    );

    return sub;
  }
}
