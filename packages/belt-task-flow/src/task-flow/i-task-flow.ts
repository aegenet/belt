import type { TaskFlowHandler } from './task-flow-handler';
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
export interface ITaskFlow {
  /** @internal */
  readonly eventLookup: Record<
    string,
    { handle: (message: unknown, channel: string) => void; options: TaskFlowSubOptions }[]
  >;
  /** @internal */
  readonly messageHandlers: TaskFlowHandler<TaskFlowConstructable>[];

  /**
   * Publishes a message.
   *
   * @param channel - The channel to publish to.
   * @param message - The message to publish on the channel.
   */
  publish<T, C extends string>(channel: C, message: T): void;
  /**
   * Publishes a message.
   *
   * @param instance - The instance to publish.
   */
  publish<T extends TaskFlowConstructable>(instance: InstanceType<T>): Promise<void>;
  publish<T extends TaskFlowConstructable | string>(
    channelOrInstance: T extends TaskFlowConstructable ? InstanceType<T> : T,
    message?: unknown
  ): Promise<void>;

  /**
   * Subscribes to a message channel (FIFO first in first out).
   *
   * @param channel - The event channel.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  subscribe<T, C extends string>(
    channel: C,
    callback: (message: T, channel: C) => Promise<void> | void,
    options?: TaskFlowSubOptions
  ): TaskFlowDisposable;
  /**
   * Subscribes to a message type (FIFO first in first out).
   *
   * @param type - The event message type.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  subscribe<T extends TaskFlowConstructable>(
    type: T,
    callback: (message: InstanceType<T>) => Promise<void> | void,
    options?: TaskFlowSubOptions
  ): TaskFlowDisposable;
  subscribe(
    channelOrType: string | TaskFlowConstructable,
    callback: (...args: unknown[]) => Promise<void> | void,
    options?: TaskFlowSubOptions
  ): TaskFlowDisposable;

  /**
   * Subscribes to a message channel, then disposes the subscription automatically after the first message is received.
   *
   * @param channel - The event channel.
   * @param callback - The callback to be invoked when the specified message is published.
   */
  subscribeOnce<T, C extends string>(
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
  subscribeOnce<T extends TaskFlowConstructable>(
    type: T,
    callback: (message: InstanceType<T>) => Promise<void> | void,
    options?: {
      order?: number;
    }
  ): TaskFlowDisposable;
  subscribeOnce(
    channelOrType: string | TaskFlowConstructable,
    callback: (...args: unknown[]) => Promise<void> | void,
    options?: {
      order?: number;
    }
  ): TaskFlowDisposable;
}
