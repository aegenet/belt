// tslint:disable:no-big-function
/**
 * @vitest-environment node
 */
import { describe, it } from 'vitest';
import { asError } from './index';

describe('asError', () => {
  it('Same', () => {
    const error = new Error('Toto');
    const errorTwo = asError(error);
    expect(errorTwo.message).toBe('Toto');
    expect(error).toBe(errorTwo);
  });

  it('Enhance', () => {
    const error = new Error('Toto');
    const errorEnhanced = asError({ message: 'Toto', statusText: 'Yolo' });
    expect(error.message).toBe('Toto');
    expect(error.message).toBe(errorEnhanced.message);
    expect(errorEnhanced.statusText).toBe('Yolo');
  });

  it('From string', () => {
    const errorEnhanced = asError('Toto');
    expect(errorEnhanced.message).toBe('Toto');
  });

  it('Transform into Error', () => {
    const error = { message: 'Toto' };
    const errorEnhanced = asError({ message: 'Toto', statusText: 'Yolo' });
    expect(error.message).toBe('Toto');
    expect(error.message).toBe(errorEnhanced.message);
    expect(errorEnhanced.statusText).toBe('Yolo');
  });
});
