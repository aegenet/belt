import assert from 'assert';
import { mutateErrorWithRef } from './index';

describe('mutate-error-with-ref', () => {
  it('Mutate', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error);
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
  });

  it('Mutate, prefix ref in message', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error, {
      prefixWithRef: true,
    });
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError));
  });

  it('Mutate with empty message', () => {
    const error = new Error('');
    const mutateError = mutateErrorWithRef(error, {
      prefixWithRef: true,
    });
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError));
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
    assert.ok(mutateError.message.startsWith(mutateError.refError));
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
    assert.ok(mutateError.message.startsWith(mutateError.refError));
  });
});
