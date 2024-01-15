import * as assert from 'node:assert';
import { isPromise } from '../browser';

describe('is-promise', function () {
  it('yes', async function () {
    assert.equal(isPromise(Promise.resolve(true)), true);
  });

  it('no', async function () {
    assert.equal(isPromise(5), false);
  });

  it('null', async function () {
    assert.equal(isPromise(null), false);
  });

  it('undefined', async function () {
    assert.equal(isPromise(undefined), false);
  });

  it('function', async function () {
    assert.equal(
      isPromise(() => true),
      false
    );
  });

  it('object', async function () {
    assert.equal(isPromise({ id: 5 }), false);
  });
});
