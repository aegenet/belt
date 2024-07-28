/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { symbolsIsBalanced } from './index';

describe('verify-balanced-symbols', () => {
  describe('standard', () => {
    it('( { [ () [] ] } )', () => {
      assert.strictEqual(symbolsIsBalanced('( { [ () [] ] } )'), true);
    });

    it('(a{b[c(d)e[f]g]h}i)', () => {
      assert.strictEqual(symbolsIsBalanced('(a{b[c(d)e[f]g]h}i)'), true);
    });

    it('( ]', () => {
      assert.strictEqual(symbolsIsBalanced('( ]'), false);
    });

    it(')(', () => {
      assert.strictEqual(symbolsIsBalanced(')('), false);
    });

    it('( [ ) ]', () => {
      assert.strictEqual(symbolsIsBalanced('( [ ) ]'), false);
    });

    it('{ /* ) */ }', () => {
      assert.strictEqual(symbolsIsBalanced('{ /* ) */ }'), true);
    });

    it('{ /*/ ) */ }', () => {
      assert.strictEqual(symbolsIsBalanced('{ /*/ ) */ }'), true);
    });

    it('X/**', () => {
      assert.strictEqual(symbolsIsBalanced('X/**'), false);
    });

    it('x', () => {
      assert.strictEqual(symbolsIsBalanced('X/**'), false);
    });
  });

  describe('basic', () => {
    it('x', () => {
      assert.strictEqual(symbolsIsBalanced('x'), true);
    });

    it('abc<def', () => {
      assert.strictEqual(symbolsIsBalanced('abc<def'), true);
    });

    it('()', () => {
      assert.strictEqual(symbolsIsBalanced('()'), true);
    });

    it('{}', () => {
      assert.strictEqual(symbolsIsBalanced('{}'), true);
    });

    it('[]', () => {
      assert.strictEqual(symbolsIsBalanced('[]'), true);
    });

    it('()()()', () => {
      assert.strictEqual(symbolsIsBalanced('()()()'), true);
    });

    it('[][][]', () => {
      assert.strictEqual(symbolsIsBalanced('[][][]'), true);
    });

    it('{}{}{}', () => {
      assert.strictEqual(symbolsIsBalanced('{}{}{}'), true);
    });
  });

  describe('comments', () => {
    it('abcd /* efgh */ ijkl', () => {
      assert.strictEqual(symbolsIsBalanced('abcd /* efgh */ ijkl'), true);
    });

    it('(([[{{()[/* ( { [  */]{}}}]]))', () => {
      assert.strictEqual(symbolsIsBalanced('(([[{{()[/* ( { [  */]{}}}]]))'), true);
    });

    it('(/* ) */', () => {
      assert.strictEqual(symbolsIsBalanced('(/* ) */'), false);
    });
  });

  describe('weird', () => {
    it('null', () => {
      assert.strictEqual(symbolsIsBalanced(null as any), true);
    });

    it('undefined', () => {
      assert.strictEqual(symbolsIsBalanced(undefined as any), true);
    });

    it('""', () => {
      assert.strictEqual(symbolsIsBalanced(''), true);
    });

    it('/', () => {
      assert.strictEqual(symbolsIsBalanced('/'), true);
    });

    it('XX/', () => {
      assert.strictEqual(symbolsIsBalanced('XX/'), true);
    });

    it('()/', () => {
      assert.strictEqual(symbolsIsBalanced('()/'), true);
    });

    it('*/', () => {
      assert.strictEqual(symbolsIsBalanced('*/'), true);
    });

    it('/* /**/', () => {
      assert.strictEqual(symbolsIsBalanced('/* /**/'), true);
    });

    it('/* /*/', () => {
      assert.strictEqual(symbolsIsBalanced('/* /*/'), true);
    });
  });
});
