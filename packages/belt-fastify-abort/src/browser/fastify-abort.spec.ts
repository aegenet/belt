/**
 * @vitest-environment jsdom
 */
import { describe, it, assert } from 'vitest';
import { fastifyAbortRegister } from '../browser';

describe('fastify-abort/browser', () => {
  it('simple', async () => {
    try {
      // Must failed
      await fastifyAbortRegister(undefined);
      throw new Error('Must failed');
    } catch (error) {
      assert.strictEqual((error as Error).message, 'Not implemented for browser.');
    }
  });
});
