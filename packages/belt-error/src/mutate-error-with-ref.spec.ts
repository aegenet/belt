/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { mutateErrorWithRef } from './index';

describe('mutate-error-with-ref', () => {
  it('Mutate', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error);
    assert.strictEqual(error.message, 'Toto');
    assert.strictEqual(mutateError.message, 'Toto');
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.deepStrictEqual(Object.keys(mutateError), ['refError']);
  });

  it('Set message/stack enumerable', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error, {
      setAsEnumerable: true,
    });
    assert.strictEqual(error.message, 'Toto');
    assert.strictEqual(mutateError.message, 'Toto');
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.deepStrictEqual(Object.keys(mutateError), ['stack', 'message', 'refError']);
  });

  it('Mutate an object', () => {
    const error = { message: 'Toto' };
    const mutateError = mutateErrorWithRef(error);
    assert.strictEqual(error.message, 'Toto');
    assert.strictEqual(mutateError.message, 'Toto');
    assert.ok(mutateError.refError);
    assert.deepStrictEqual(Object.keys(mutateError), ['refError']);
  });

  it('Mutate with identifier', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error, {
      identifier: '5c',
    });
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.refError!.startsWith('E-'));
    assert.ok(mutateError.refError!.endsWith('5c'));
    assert.deepStrictEqual(Object.keys(mutateError), ['refError']);
  });

  it('Mutate, prefix ref in message', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error, {
      prefixWithRef: true,
    });
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError!));
    assert.deepStrictEqual(Object.keys(mutateError), ['refError']);
  });

  it('Mutate with empty message', () => {
    const error = new Error('');
    const mutateError = mutateErrorWithRef(error, {
      prefixWithRef: true,
    });
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError!));
    assert.deepStrictEqual(Object.keys(mutateError), ['refError']);
  });

  it('Mutate two times', () => {
    const error = new Error('Wallbang!');
    const mutateError = mutateErrorWithRef(error, {
      prefixWithRef: true,
    });
    const refError = mutateError.refError;
    const mutateError2 = mutateErrorWithRef(mutateError);
    assert.strictEqual(refError, mutateError2.refError);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError!));
    assert.deepStrictEqual(Object.keys(mutateError), ['refError']);
  });

  it('Mutate and add properties', () => {
    const error = new Error('Wallbang!');
    const mutateError = mutateErrorWithRef(error, {
      prefixWithRef: true,
      data: {
        tenant: 'yolo',
        user: 'maurice',
      },
    });
    const refError = mutateError.refError;
    const mutateError2 = mutateErrorWithRef(mutateError);
    assert.strictEqual(refError, mutateError2.refError);
    assert.ok(mutateError.refError);
    assert.strictEqual(mutateError.tenant, 'yolo');
    assert.strictEqual(mutateError.user, 'maurice');
    assert.ok(mutateError.message.startsWith(mutateError.refError!));
    assert.deepStrictEqual(Object.keys(mutateError), ['refError', 'tenant', 'user']);
  });

  it('More than 4095 errors', () => {
    for (let i = 0; i < 4098; i++) {
      const error = new Error('Wallbang!');
      const mutateError = mutateErrorWithRef(error, {
        prefixWithRef: true,
        data: {
          tenant: 'yolo',
          user: 'maurice',
        },
      });
      const refError = mutateError.refError;
      const mutateError2 = mutateErrorWithRef(mutateError);
      assert.strictEqual(refError, mutateError2.refError);
      assert.ok(mutateError.refError);
      assert.strictEqual(mutateError.tenant, 'yolo');
      assert.strictEqual(mutateError.user, 'maurice');
      assert.ok(mutateError.message.startsWith(mutateError.refError!));
      assert.deepStrictEqual(Object.keys(mutateError), ['refError', 'tenant', 'user']);
    }
  });
});
