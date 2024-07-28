/**
 * @vitest-environment node
 */
import { describe, it, beforeAll, afterAll } from 'vitest';
import * as assert from 'node:assert';
import { TaskFlow } from '../index';
import type { ITaskFlow } from '../index';

/** Delay operation */
function delay(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

describe('task-flow', () => {
  class Something {
    constructor(public action: string) {}
  }

  let taskFlow: ITaskFlow | undefined;
  beforeAll(() => {
    taskFlow = new TaskFlow();
  });

  afterAll(() => {
    taskFlow = undefined;
  });

  it('Invalid subscription', async () => {
    assert.throws(() => taskFlow!.subscribe(null as any, async () => {}));
  });

  it('Invalid publish', async () => {
    await assert.rejects(async () => await taskFlow!.publish(null as any, async () => {}));
  });

  it('Register & publish', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribe('Something', async () => {
      await delay(200);
      tabs.push('with delay');
    });
    taskFlow!.subscribe('Something', async () => {
      tabs.push('without delay');
    });

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['with delay', 'without delay']);

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['with delay', 'without delay', 'with delay', 'without delay']);
  });

  it('Register & publish with order', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribe('Something', async () => {
      await delay(200);
      tabs.push('with delay');
    }); // default order 99999

    taskFlow!.subscribe(
      'Something',
      async () => {
        tabs.push('without delay');
      },
      { order: 0 }
    );

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['without delay', 'with delay']);

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['without delay', 'with delay', 'without delay', 'with delay']);
  });

  it('Register & publish with order 2', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribe(
      'Something',
      async () => {
        await delay(200);
        tabs.push('with delay');
      },
      {
        order: 2,
      }
    );

    taskFlow!.subscribe(
      'Something',
      async () => {
        tabs.push('without delay');
      },
      { order: 0 }
    );

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['without delay', 'with delay']);

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['without delay', 'with delay', 'without delay', 'with delay']);
  });

  it('RegisterOnce & publish', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribeOnce('Something', async () => {
      await delay(200);
      tabs.push('with delay');
    });
    taskFlow!.subscribeOnce('Something', async () => {
      tabs.push('without delay');
    });

    await taskFlow!.publish('Something');

    assert.deepStrictEqual(tabs, ['with delay', 'without delay']);

    await taskFlow!.publish('Something');
    assert.deepStrictEqual(tabs, ['with delay', 'without delay']);
  });

  it('Class Message - Register & publish', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribe(Something, async msg => {
      await delay(200);
      tabs.push('with delay ' + msg.action);
    });
    taskFlow!.subscribe(Something, async msg => {
      tabs.push('without delay ' + msg.action);
    });

    await taskFlow!.publish(new Something('discrète'));

    assert.deepStrictEqual(tabs, ['with delay discrète', 'without delay discrète']);

    await taskFlow!.publish(new Something('discreet'));

    assert.deepStrictEqual(tabs, [
      'with delay discrète',
      'without delay discrète',
      'with delay discreet',
      'without delay discreet',
    ]);
  });

  it('Class Message - Register & publish with order', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribe(Something, async msg => {
      await delay(200);
      tabs.push('with delay ' + msg.action);
    });
    taskFlow!.subscribe(
      Something,
      async msg => {
        tabs.push('without delay ' + msg.action);
      },
      { order: 0 }
    );

    await taskFlow!.publish(new Something('discrète'));

    assert.deepStrictEqual(tabs, ['without delay discrète', 'with delay discrète']);

    await taskFlow!.publish(new Something('discreet'));

    assert.deepStrictEqual(tabs, [
      'without delay discrète',
      'with delay discrète',
      'without delay discreet',
      'with delay discreet',
    ]);
  });

  it('Class Message - RegisterOnce & publish', async () => {
    const tabs: string[] = [];
    taskFlow!.subscribeOnce(Something, async msg => {
      await delay(200);
      tabs.push('with delay ' + msg.action);
    });
    taskFlow!.subscribeOnce(Something, async msg => {
      tabs.push('without delay ' + msg.action);
    });

    await taskFlow!.publish(new Something('discrète'));

    assert.deepStrictEqual(tabs, ['with delay discrète', 'without delay discrète']);

    await taskFlow!.publish(new Something('discreet'));
    assert.deepStrictEqual(tabs, ['with delay discrète', 'without delay discrète']);
  });
});
