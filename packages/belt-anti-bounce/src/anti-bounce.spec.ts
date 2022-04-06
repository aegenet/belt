import * as assert from 'assert';
import { AntiBounce } from './index';
import { delay } from '../../belt-promise/src/delay';

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
    await delay(300);
    assert.strictEqual(i, 1);
    diposable.dispose();
  });
});
