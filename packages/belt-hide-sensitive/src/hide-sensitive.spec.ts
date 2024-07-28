/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { createHideSensitiveFunction } from './index';

describe('hide-sensitive', () => {
  it('Ok', () => {
    const hidenFunction = createHideSensitiveFunction({ pwd: 'djdke' });
    assert.equal(hidenFunction('Your password is djdke'), 'Your password is ***');
  });

  it('Multiple', () => {
    const hidenFunction = createHideSensitiveFunction({ pwd: 'djdke', ok: 'Your', ok_secret: 'Yolo' });
    assert.equal(hidenFunction('Your password is djdke Yolo'), 'Your password is *** ***');
  });

  it('Multiple', () => {
    const hidenFunction = createHideSensitiveFunction({ pwd: '', ok: 'Your', ok_secret: 'Yolo' });
    assert.equal(hidenFunction('Your password is djdke Yolo'), 'Your password is djdke ***');
  });

  it('Null', () => {
    const hidenFunction = createHideSensitiveFunction(null as any);
    assert.equal(hidenFunction('Your password is djdke'), 'Your password is djdke');
  });

  it('Empty', () => {
    const hidenFunction = createHideSensitiveFunction({});
    assert.equal(hidenFunction('Your password is djdke'), 'Your password is djdke');
  });

  it('Empty input', () => {
    const hidenFunction = createHideSensitiveFunction({ pwd: '', ok: 'Your', ok_secret: 'Yolo' });
    assert.equal(hidenFunction(''), '');
  });

  it('Null input', () => {
    const hidenFunction = createHideSensitiveFunction({ pwd: '', ok: 'Your', ok_secret: 'Yolo' });
    assert.equal(hidenFunction(null as any), null);
  });
});
