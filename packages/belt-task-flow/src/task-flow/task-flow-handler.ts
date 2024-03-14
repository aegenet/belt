import type { TaskFlowSubOptions } from './task-flow-sub-options';
import type { TaskFlowConstructable } from '../common/types';

/**
 * Represents a handler for an TaskFlow event.
 */
export class TaskFlowHandler<T extends TaskFlowConstructable> {
  public constructor(
    public readonly messageType: T,
    public readonly callback: (message: InstanceType<T>) => Promise<void> | void,
    public readonly options: TaskFlowSubOptions = {}
  ) {
    //
  }

  public handle(message: InstanceType<T>): Promise<void> | void {
    if (message instanceof this.messageType) {
      return this.callback.call(null, message);
    }
  }
}
