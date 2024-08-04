import type { TaskFlowDisposable } from '../common/types';
import type { ITaskFlow } from '../task-flow/i-task-flow';
import type { ITaskFlowSubscription } from './i-task-flow-subscription';

/**
 * Inherit from this class to manage subscriptions to methods
 * Use with @raRegisterTF()
 */
export abstract class TaskFlowListener implements TaskFlowDisposable {
  /** @internal */
  public __tfSubs?: ITaskFlowSubscription[];

  constructor(protected _taskFlow: ITaskFlow) {
    // since the stage 3, the constructor is executed after the `addInitializer` methods (decorators stage 3)
    // this.__subscribe(this.__getAllTFSubs());
  }

  /** Dispose */
  public dispose() {
    this.__dispose(this.__getAllTFSubs());
  }

  private __getAllTFSubs(): ITaskFlowSubscription[] {
    const allRaFT: ITaskFlowSubscription[] = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let context = this;
    do {
      if (context.__tfSubs) {
        allRaFT.push(...context.__tfSubs);
      }
      context = (context as any).__proto__;
    } while (context?.constructor.name !== 'Object');

    return allRaFT;
  }

  /**
   * @internal
   */
  public __subscribe(tfSubs: ITaskFlowSubscription[]): ITaskFlowSubscription[] {
    tfSubs.forEach(f => this.__subscribeMethod(f));
    return tfSubs;
  }

  /**
   * @internal
   */
  public __subscribeMethod(f: ITaskFlowSubscription): ITaskFlowSubscription {
    if (f.token) {
      f.token.dispose();
      f.token = undefined;
    }
    if (f.once) {
      f.token = this._taskFlow.subscribeOnce(
        f.channel,
        async (args: unknown[]) => {
          await this.__callMethod(f, args);
        },
        {
          order: f.order,
        }
      );
    } else {
      f.token = this._taskFlow.subscribe(
        f.channel,
        async (args: unknown[]) => {
          await this.__callMethod(f, args);
        },
        {
          order: f.order,
        }
      );
    }
    return f;
  }

  private async __callMethod(f: ITaskFlowSubscription, args: unknown[]) {
    if (args == null) {
      await (this as any)[f.methodName]();
    } else if (args instanceof Array) {
      await (this as any)[f.methodName](...args);
    } else if (args) {
      await (this as any)[f.methodName](args);
    } else {
      throw new Error('Implementation error: you must pass an array of arguments.');
    }
  }

  private __dispose(tfSubs: ITaskFlowSubscription[]) {
    tfSubs.forEach(f => {
      if (f.token) {
        f.token.dispose();
        f.token = undefined;
      }
    });
  }
}
