/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as assert from 'node:assert';
import { oclone } from './index';

describe('oclone', function () {
  it('Object', () => {
    assert.deepStrictEqual(
      oclone({
        id: 5,
      }),
      {
        id: 5,
      }
    );
  });

  it('Object - but keepType true', () => {
    assert.deepStrictEqual(
      oclone(
        {
          id: 5,
        },
        { keepType: true }
      ),
      {
        id: 5,
      }
    );
  });

  it('Class - but keepType false', () => {
    const myClass = class {
      id = 5;
      method() {
        return 'ha';
      }
    };
    const source = new myClass();

    const clone = oclone(source, { keepType: false });

    assert.ok(!('method' in clone!));
    assert.strictEqual(clone!.id, 5);
  });

  it('Class - but keepType true', () => {
    const myClass = class {
      id = 5;
      method() {
        return 'ha';
      }
    };
    const source = new myClass();
    source.id = 7;

    const clone = oclone(source, { keepType: true });

    assert.ok('method' in clone!);
    assert.strictEqual(clone.id, 7);
    clone.id = 6;
    assert.strictEqual(clone.id, 6);
    assert.strictEqual(source.id, 7);
  });

  it('Null object', () => {
    const clone = oclone(null as any);

    assert.strictEqual(clone, null);
  });
});
