// tslint:disable:no-big-function
import { isSyntaxError, asError } from './index';

describe('isSyntaxError', () => {
  it('Not a syntax error', () => {
    expect(isSyntaxError(new Error('Toto'))).toBe(false);
  });

  it('A syntax error', () => {
    expect(isSyntaxError(new SyntaxError('Toto'))).toBe(true);
  });

  it('A syntax error - another way', () => {
    expect(isSyntaxError(asError({ message: 'toto', statusText: 'SyntaxError' }))).toBe(true);
  });
});
