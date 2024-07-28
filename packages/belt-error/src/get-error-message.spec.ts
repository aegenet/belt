// tslint:disable:no-big-function
/**
 * @vitest-environment node
 */
import { describe, it } from 'vitest';
import { getErrorMessage } from './index';

describe('get-error-message', () => {
  it('Error', () => {
    expect(getErrorMessage(new Error('Toto'))).toBe('Toto');
    expect(getErrorMessage(new Error(''))).toBe('');
    expect(getErrorMessage(new Error())).toBe('');
  });

  it('Undefined & Null', () => {
    expect(getErrorMessage(null)).toBe(null);
    expect(getErrorMessage(undefined)).toBe(null);
  });

  it('Empty object', () => {
    expect(getErrorMessage({})).toBe(null);
  });

  it('Object, but not standard fields', () => {
    expect(
      getErrorMessage({
        a: 'ok',
      })
    ).toBe(null);
  });

  it('Object, with not standard fields, but specified', () => {
    expect(
      getErrorMessage(
        {
          a: 'ok',
        },
        'a'
      )
    ).toBe('ok');
  });

  it('Deep object, with standard fields', () => {
    expect(
      getErrorMessage(
        {
          error: {
            message: 'ok',
          },
        },
        'error'
      )
    ).toBe('ok');

    expect(
      getErrorMessage(
        {
          a: {
            message: 'ok',
          },
        },
        'a'
      )
    ).toBe('ok');
  });

  it('Deep object, with not standard fields, but specified', () => {
    expect(
      getErrorMessage(
        {
          a: {
            message: 'ok',
          },
        },
        'a'
      )
    ).toBe('ok');

    // We don't look deeper the altMsgFields
    expect(
      getErrorMessage(
        {
          a: {
            a: 'ok',
          },
        },
        'a'
      )
    ).toBe(null);
  });
});
