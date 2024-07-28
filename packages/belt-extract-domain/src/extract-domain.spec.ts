/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { extractDomain, IDomain } from './index';

describe('extract-domain', function () {
  it('undefined', () => {
    assert.strictEqual(extractDomain(undefined as any), null);
  });
  it('null', () => {
    assert.strictEqual(extractDomain(undefined as any), null);
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
