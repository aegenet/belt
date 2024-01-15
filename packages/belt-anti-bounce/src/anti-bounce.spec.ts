import * as assert from 'node:assert';
import { AntiBounce } from './index';
import { setTimeout } from 'node:timers/promises';

describe('anti-bounce', () => {
  it('Inc !', async () => {
    let i = 0;
    const diposable = new AntiBounce(() => i++, 300);
    assert.strictEqual(i, 0);
    // Go !
    diposable.call();
    diposable.call();
    diposable.call();
    diposable.call();
    // ? Must be 0
    assert.strictEqual(i, 0);
    await setTimeout(300);
    assert.strictEqual(i, 1);
    diposable.dispose();
  });
});
