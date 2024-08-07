/**
 * @vitest-environment jsdom
 */
import { describe, it, assert } from 'vitest';
import * as path from 'node:path';
import { readdir } from '../browser';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IReaddirEntry } from '../browser';

describe('readdir/browser', () => {
  it('simple', async () => {
    try {
      // Must failed
      await readdir(path.join(__dirname, '..'));
      throw new Error('Must failed');
    } catch (error) {
      assert.strictEqual((error as Error).message, 'Not implemented for browser.');
    }
  });
});
