/**
 * @vitest-environment node
 */
import { describe, it, assert, beforeEach, afterEach } from 'vitest';
import { TaskFlow } from '../index';
import type { ITaskFlow } from '../index';
import { TaskFlowListener } from './task-flow-subscription';
import { taskFlowMethod } from './task-flow-method';

/** Delay operation */
function delay(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

describe('task-flow-subscription', () => {
  let taskFlow: ITaskFlow | undefined;
  class ListenToMe extends TaskFlowListener {
    public msg: string[] = [];
    public setupConfig: Record<string, string> = {};
    public items: Record<string, string>[] = [];

    constructor() {
      super(taskFlow!);
    }

    @taskFlowMethod()
    public doIt() {
      this.msg.push('hello');
    }

    @taskFlowMethod()
    public async doItAsync() {
      await delay(200);
      this.msg.push('hello');
    }

    @taskFlowMethod({
      once: true,
    })
    public async doItOnce() {
      this.msg.push('zero');
    }

    @taskFlowMethod({
      channel: 'common-init',
      order: 2,
    })
    public async init2() {
      this.msg.push('init2');
    }

    @taskFlowMethod({
      channel: 'common-init',
      order: 1,
    })
    public async init1() {
      this.msg.push('init1');
    }

    @taskFlowMethod({
      channel: 'common-init',
      prefix: 'vendor',
      order: 2,
    })
    public async initEx2() {
      this.msg.push('initEx2');
    }

    @taskFlowMethod({
      channel: 'common-init',
      prefix: 'vendor',
      order: 1,
    })
    public async initEx1() {
      this.msg.push('initEx1');
    }

    @taskFlowMethod()
    public async setup(config: Record<string, string>) {
      this.setupConfig = config;
    }

    @taskFlowMethod()
    public async create(item: Record<string, string>, kind: string) {
      this.items.push({
        ...item,
        kind,
      });
    }

    override dispose() {
      this.msg = [];
      this.setupConfig = {};
      this.items = [];
      super.dispose();
    }
  }
  let listenToMe: ListenToMe | undefined;

  beforeEach(() => {
    taskFlow = new TaskFlow();
    listenToMe = new ListenToMe();
  });

  afterEach(() => {
    taskFlow = undefined;
    listenToMe?.dispose();
    listenToMe = undefined;
  });

  it.only('Register & publish', async () => {
    assert.deepStrictEqual(listenToMe!.msg, []);
    await taskFlow!.publish('tf.ListenToMe:doIt');
    assert.deepStrictEqual(listenToMe!.msg, ['hello']);
    await taskFlow!.publish('tf.ListenToMe:doIt');
    assert.deepStrictEqual(listenToMe!.msg, ['hello', 'hello']);
  });

  it('Async method', async () => {
    assert.deepStrictEqual(listenToMe!.msg, []);
    await taskFlow!.publish('tf.ListenToMe:doItAsync');
    assert.deepStrictEqual(listenToMe!.msg, ['hello']);
    await taskFlow!.publish('tf.ListenToMe:doItAsync');
    assert.deepStrictEqual(listenToMe!.msg, ['hello', 'hello']);
  });

  it('Once', async () => {
    assert.deepStrictEqual(listenToMe!.msg, []);
    await taskFlow!.publish('tf.ListenToMe:doItOnce');
    assert.deepStrictEqual(listenToMe!.msg, ['zero']);
    await taskFlow!.publish('tf.ListenToMe:doItOnce');
    assert.deepStrictEqual(listenToMe!.msg, ['zero']);
  });

  it('Common channel & order', async () => {
    assert.deepStrictEqual(listenToMe!.msg, []);
    await taskFlow!.publish('common-init');
    assert.deepStrictEqual(listenToMe!.msg, ['init1', 'init2']);
    await taskFlow!.publish('common-init');
    assert.deepStrictEqual(listenToMe!.msg, ['init1', 'init2', 'init1', 'init2']);
  });

  it('Common channel & order & prefix', async () => {
    assert.deepStrictEqual(listenToMe!.msg, []);
    await taskFlow!.publish('vendor.common-init');
    assert.deepStrictEqual(listenToMe!.msg, ['initEx1', 'initEx2']);
    await taskFlow!.publish('vendor.common-init');
    assert.deepStrictEqual(listenToMe!.msg, ['initEx1', 'initEx2', 'initEx1', 'initEx2']);
  });

  it('With object param', async () => {
    assert.deepStrictEqual(listenToMe!.setupConfig, {});
    await taskFlow!.publish('tf.ListenToMe:setup', { hello: 'world' });
    assert.deepStrictEqual(listenToMe!.setupConfig, { hello: 'world' });
    await taskFlow!.publish('tf.ListenToMe:setup', { something: 'else' });
    assert.deepStrictEqual(listenToMe!.setupConfig, { something: 'else' });
  });

  it('With multiple params', async () => {
    assert.deepStrictEqual(listenToMe!.setupConfig, {});
    await taskFlow!.publish('tf.ListenToMe:create', [{ hello: 'world' }, 'world']);
    assert.deepStrictEqual(listenToMe!.items, [{ hello: 'world', kind: 'world' }]);
    await taskFlow!.publish('tf.ListenToMe:create', [{ hello: 'world2' }, 'world']);
    assert.deepStrictEqual(listenToMe!.items, [
      { hello: 'world', kind: 'world' },
      { hello: 'world2', kind: 'world' },
    ]);
  });
});
