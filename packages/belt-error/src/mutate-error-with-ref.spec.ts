import assert from 'assert';
import { mutateErrorWithRef } from './index';

describe('mutate-error-with-ref', () => {
  it('Mutate', () => {
    const error = new Error('Toto');
    const mutateError = mutateErrorWithRef(error);
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError));
  });

  it('Mutate with empty message', () => {
    const error = new Error('');
    const mutateError = mutateErrorWithRef(error);
    assert.strictEqual(mutateError, error);
    assert.ok(mutateError.refError);
    assert.ok(mutateError.message.startsWith(mutateError.refError));
  });
});
