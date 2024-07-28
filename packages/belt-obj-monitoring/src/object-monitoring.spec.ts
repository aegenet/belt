/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { ObjectMonitoring, type ObjectMonitoringResult } from '.';

describe('objectMonitoring', () => {
  it('Proxied', () => {
    const results: ObjectMonitoringResult[] = [];
    const objMonitor = new ObjectMonitoring({
      callback: options => results.push(options),
    });

    const something = {
      title: 'Boris',
      description: 'Oromov',
    };

    const proxy = objMonitor.asProxy(something);
    proxy.title = 'Maurice';

    assert.deepStrictEqual(results, [
      {
        newValue: 'Maurice',
        oldValue: 'Boris',
        path: 'title',
        property: 'title',
      },
    ]);
  });

  it('Mutate', () => {
    const results: ObjectMonitoringResult[] = [];
    const objMonitor = new ObjectMonitoring({
      callback: options => results.push(options),
    });

    const something = {
      title: 'Boris',
      description: 'Oromov',
    };

    const token = objMonitor.mutate(something);
    something.title = 'Maurice';

    // We remove all listeners
    token.dispose();
    something.title = 'Maurice2';

    assert.deepStrictEqual(results, [
      {
        newValue: 'Maurice',
        oldValue: 'Boris',
        path: 'title',
        property: 'title',
      },
    ]);
  });
});
