/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { type ObjectMonitoringResult, deepSetProxy } from '../index';

describe('deep-set-proxy', () => {
  it('Ok', () => {
    const somethingOrig = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    const something = deepSetProxy(somethingOrig, { callback: result => results.push(result) });
    something.title = 'Maurice';

    assert.deepStrictEqual(results, [
      {
        newValue: 'Maurice',
        oldValue: 'Boris',
        path: 'title',
        property: 'title',
      },
    ]);
  });

  it('Already hydrated, must be ok, second times is ignored', () => {
    const somethingOrig = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    let something = deepSetProxy(somethingOrig, { callback: result => results.push(result) });
    something = deepSetProxy(somethingOrig, { callback: result => results.push(result) });
    something.title = 'Maurice';

    assert.deepStrictEqual(results, [
      {
        newValue: 'Maurice',
        oldValue: 'Boris',
        path: 'title',
        property: 'title',
      },
    ]);
  });

  it('Deeper', () => {
    const somethingOrig: {
      title: string;
      description: string;
      company?: { name: string };
    } = {
      title: 'Boris',
      description: 'Boris',
      company: {
        name: 'Polska',
      },
    };

    const results: ObjectMonitoringResult[] = [];
    const something = deepSetProxy(somethingOrig, { callback: result => results.push(result) });
    something.title = 'Maurice';
    something.company!.name = 'Other';
    something.company = undefined;

    assert.deepStrictEqual(JSON.parse(JSON.stringify(results)), [
      {
        newValue: 'Maurice',
        oldValue: 'Boris',
        path: 'title',
        property: 'title',
      },
      {
        newValue: 'Other',
        oldValue: 'Polska',
        path: 'company.name',
        property: 'name',
      },
      {
        oldValue: {
          name: 'Other',
        },
        path: 'company',
        property: 'company',
      },
    ]);
  });

  it('Add new property', () => {
    const somethingOrig: {
      title: string;
      description: string;
      new?: string;
    } = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    const proxy = deepSetProxy(somethingOrig, { callback: result => results.push(result) });
    proxy.new = 'A lot';

    assert.deepStrictEqual(results, [
      {
        newValue: 'A lot',
        oldValue: undefined,
        path: 'new',
        property: 'new',
      },
    ]);
  });

  it('Add nested new property', () => {
    const somethingOrig: {
      title: string;
      description: string;
      new?: {
        value: string;
        deepest?: {
          more: string;
        };
      };
    } = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    const proxy = deepSetProxy(somethingOrig, { callback: result => results.push(result) });
    proxy.new = {
      value: 'A lot',
    };
    assert.deepStrictEqual(results, [
      {
        newValue: { value: 'A lot' },
        oldValue: undefined,
        path: 'new',
        property: 'new',
      },
    ]);

    proxy.new.value = 'many';

    assert.deepStrictEqual(results, [
      {
        newValue: { value: 'A lot' },
        oldValue: undefined,
        path: 'new',
        property: 'new',
      },
      {
        newValue: 'many',
        oldValue: 'A lot',
        path: 'new.value',
        property: 'value',
      },
    ]);

    proxy.new.deepest = {
      more: 'ever',
    };
    proxy.new.deepest = {
      more: 'everever',
    };
    // eslint-disable-next-line no-self-assign
    proxy.new.deepest = proxy.new.deepest;
    proxy.new.deepest.more = 'THEN ever';

    assert.deepStrictEqual(results, [
      { newValue: { value: 'A lot' }, oldValue: undefined, path: 'new', property: 'new' },
      { newValue: 'many', oldValue: 'A lot', path: 'new.value', property: 'value' },
      { newValue: { more: 'ever' }, oldValue: undefined, path: 'new.deepest', property: 'deepest' },
      { newValue: { more: 'everever' }, oldValue: { more: 'ever' }, path: 'new.deepest', property: 'deepest' },
      { newValue: { more: 'everever' }, oldValue: { more: 'everever' }, path: 'new.deepest', property: 'deepest' },
      { newValue: 'THEN ever', oldValue: 'everever', path: 'new.deepest.more', property: 'more' },
    ]);
  });
});
