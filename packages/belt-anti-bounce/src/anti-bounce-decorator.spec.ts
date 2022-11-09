import * as assert from 'assert';
import { AntiBounce } from './index';
import { antiBounce, disposeAntiBounces, IAntiBounceSupport } from './anti-bounce-decorator';
import { delay } from './../../belt-promise/src/delay';

class Sample implements IAntiBounceSupport {
  public $antiBounces?: Map<string, AntiBounce>;
  private _i = 0;

  @antiBounce({ duration: 300 })
  public inc(): void {
    this._i++;
  }

  @antiBounce({ duration: 300, checker: 'bypasser' })
  public incCheated(): void {
    this._i++;
  }

  @antiBounce(undefined as any)
  public incDefault(): void {
    this._i++;
  }

  public bypasser(): boolean {
    return this.i === 0;
  }

  public main() {
    this.inc();
    this.inc();
    this.inc();
    // this._i => 1
  }

  public get i() {
    return this._i;
  }
}

describe('anti-bounce-decorator', () => {
  it('Inc !', async () => {
    const sample = new Sample();
    assert.strictEqual(sample.i, 0);
    // Go !
    sample.main();
    // ? Must be 0
    assert.strictEqual(sample.i, 0);
    await delay(300);
    assert.strictEqual(sample.i, 1);
  });

  it('Inc default', async () => {
    const sample = new Sample();
    assert.strictEqual(sample.i, 0);
    // Go !
    sample.incDefault();
    sample.incDefault();
    sample.incDefault();
    // ? Must be 0
    assert.strictEqual(sample.i, 0);
    await delay(300);
    assert.strictEqual(sample.i, 1);
  });

  it('Inc cheated!', async () => {
    const sample = new Sample();
    assert.strictEqual(sample.i, 0);
    // Go !
    sample.incCheated();
    sample.incCheated();
    sample.incCheated();
    // ? Must be 1
    assert.strictEqual(sample.i, 1);
    await delay(300);
    assert.strictEqual(sample.i, 2);
  });

  it('Lifecycle', async () => {
    const sample = new Sample();
    assert.strictEqual(sample.i, 0);
    // Go !
    sample.main();
    // ? Must be 0
    assert.strictEqual(sample.i, 0);
    // We dispose all ! Thus, the method cannot be called
    disposeAntiBounces(sample);
    await delay(300);
    assert.strictEqual(sample.i, 0);
  });

  it('Dispose nothing', async () => {
    disposeAntiBounces(null as any);
    // This must not failed
  });
});
