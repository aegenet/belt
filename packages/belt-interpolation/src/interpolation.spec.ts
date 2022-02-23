import * as assert from 'assert';
import { Interpolation, transform } from './index';

describe('interpolation', function () {
  describe('With constructor', () => {
    it('Simple', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${name}', {
          name: 'David',
        }),
        'Hello David'
      );
    });

    it('Multiple', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${firstName} ${lastName}', {
          firstName: 'David',
          lastName: 'Goodenough',
        }),
        'Hello David Goodenough'
      );
    });

    it('Null context property', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${firstName} ${lastName}', {
          firstName: 'David',
          lastName: null,
        }),
        'Hello David '
      );
    });

    it('Missing context property', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${firstName} ${lastName}', {
          firstName: 'David',
        }),
        'Hello David '
      );
    });

    it('Custom language', () => {
      const interpolation = new Interpolation({
        customDialects: {
          spider: /(\\{0,1})¤¤([a-zA-Z0-9_\-]{1,})¤¤/,
        },
      });
      assert.strictEqual(
        interpolation.transform(
          'Hello ¤¤firstName¤¤ ¤¤lastName¤¤',
          {
            firstName: 'David',
            lastName: 'Goodenough',
          },
          { dialect: 'spider' }
        ),
        'Hello David Goodenough'
      );
    });
  });

  describe('With constructor', () => {
    it('Simple', () => {
      assert.strictEqual(
        transform('Hello ${name}', {
          name: 'David',
        }),
        'Hello David'
      );
    });

    it('Multiple', () => {
      assert.strictEqual(
        transform('Hello ${firstName} ${lastName}', {
          firstName: 'David',
          lastName: 'Goodenough',
        }),
        'Hello David Goodenough'
      );
    });
  });
});
