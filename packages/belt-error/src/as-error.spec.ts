// tslint:disable:no-big-function
import { asError } from './index';

describe('asError', () => {
  it('Same', () => {
    const error = new Error('Toto');
    expect(error).toBe(asError(error));
  });

  it('Enhance', () => {
    const error = new Error('Toto');
    const errorEnhanced = asError({ message: 'Toto', statusText: 'Yolo' });
    expect(error.message).toBe(errorEnhanced.message);
    expect(errorEnhanced.statusText).toBe('Yolo');
  });
});
