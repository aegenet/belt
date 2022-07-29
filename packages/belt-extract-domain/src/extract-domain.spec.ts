import * as assert from 'assert';
import { extractDomain, IDomain } from './index';

describe('extract-domain', function () {
  it('undefined', () => {
    assert.strictEqual(extractDomain(undefined), null);
  });
  it('null', () => {
    assert.strictEqual(extractDomain(undefined), null);
  });
  it('zzz.com', () => {
    assert.deepStrictEqual(extractDomain('zzz.com'), {
      domain: 'zzz.com',
      subdomains: [],
    });
  });
  it('aaa.zzz.com', () => {
    assert.deepStrictEqual(extractDomain('aaa.zzz.com'), {
      domain: 'zzz.com',
      subdomains: ['aaa'],
    } as IDomain);
  });
  it('deeper.aaa.zzz.com', () => {
    assert.deepStrictEqual(extractDomain('deeper.aaa.zzz.com'), {
      domain: 'zzz.com',
      subdomains: ['aaa', 'deeper'],
    } as IDomain);
  });
});
