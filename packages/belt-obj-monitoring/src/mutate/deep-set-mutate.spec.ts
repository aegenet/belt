import * as assert from 'assert';
import { ObjectMonitoringResult, deepSetMutate } from '../index';

describe('deep-set-mutate', () => {
  it('Ok', () => {
    const something = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    deepSetMutate(something, options => results.push(options));
    something.title = 'Maurice';
    assert.strictEqual(something.title, 'Maurice');
    something.title = 'Tintin';
    assert.strictEqual(something.title, 'Tintin');

    assert.deepStrictEqual(results, [
      {
        newValue: 'Maurice',
        oldValue: 'Boris',
        path: 'title',
        property: 'title',
      },
      {
        newValue: 'Tintin',
        oldValue: 'Maurice',
        path: 'title',
        property: 'title',
      },
    ]);
  });

  it('Already hydrated, must be ok, second times is ignored', () => {
    const something = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    deepSetMutate(something, options => results.push(options));
    deepSetMutate(something, options => results.push(options));
    something.title = 'Maurice';
    assert.strictEqual(something.title, 'Maurice');

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
    const sym = Symbol();
    const something: {
      title: string;
      description: string;
      company?: { name: string };
      [sym]: string;
    } = {
      title: 'Boris',
      description: 'Boris',
      company: {
        name: 'Polska',
      },
      [sym]: 'just do it',
    };

    const results: ObjectMonitoringResult[] = [];
    const token = deepSetMutate(something, options => results.push(options));
    something.title = 'Maurice';
    assert.strictEqual(something.title, 'Maurice');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    something.company!.name = 'Other';
    assert.strictEqual(something.company?.name, 'Other');
    something.company = undefined;
    assert.strictEqual(something.company, undefined);

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

    token.dispose();
  });

  it('Update a property of an object and update a nested property of it', () => {
    const something: {
      title: string;
      description: string;
      new: {
        value: string;
      };
    } = {
      title: 'Boris',
      description: 'Oromov',
      new: {
        value: 'ok',
      },
    };
    assert.deepStrictEqual(something, {
      title: 'Boris',
      description: 'Oromov',
      new: {
        value: 'ok',
      },
    });

    const results: ObjectMonitoringResult[] = [];
    deepSetMutate(something, options => results.push(options));
    something.new.value = 'ok2';
    assert.strictEqual(something.new.value, 'ok2');
    something.new = {
      value: 'ko',
    };
    assert.strictEqual(something.new.value, 'ko');
    something.new = something.new;
    assert.strictEqual(something.new.value, 'ko');
    something.new.value = 'ko2';
    assert.strictEqual(something.new.value, 'ko2');

    assert.deepStrictEqual(results, [
      {
        newValue: 'ok2',
        oldValue: 'ok',
        path: 'new.value',
        property: 'value',
      },
      {
        newValue: {
          value: 'ko',
        },
        oldValue: {
          value: 'ok2',
        },
        path: 'new',
        property: 'new',
      },
      {
        newValue: {
          value: 'ko',
        },
        oldValue: {
          value: 'ko',
        },
        path: 'new',
        property: 'new',
      },
      {
        newValue: 'ko2',
        oldValue: 'ko',
        path: 'new.value',
        property: 'value',
      },
    ]);
  });

  it('NOT SUPPORTED: Add new property (at any levels)', () => {
    const something: {
      title: string;
      description: string;
      new?: string;
    } = {
      title: 'Boris',
      description: 'Oromov',
    };

    const results: ObjectMonitoringResult[] = [];
    deepSetMutate(something, options => results.push(options));
    something.new = 'A lot';

    assert.deepStrictEqual(results, []);
  });
});
