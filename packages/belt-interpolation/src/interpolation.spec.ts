/**
 * @vitest-environment node
 */
import { assert, describe, it } from 'vitest';
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

    it('$value', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${$value}', {
          $value: 'David',
        }),
        'Hello David'
      );
    });

    it('$value and space', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${$value}  ', {
          $value: 'David',
        }),
        'Hello David  '
      );
    });

    it('Skippy', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello \\${name}', {
          name: 'David',
        }),
        'Hello \\${name}'
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
          // eslint-disable-next-line no-useless-escape
          spider: /(\\{0,1})¤¤([\w\._\-]{1,})¤¤/,
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

  describe('Override default getValue', () => {
    it('Deep path', () => {
      const interpolation = new Interpolation({
        getValue: (ctx, propPath) => {
          const props = propPath.split('.');
          return String(
            props.reduce((prev: any, curr) => {
              return prev[curr];
            }, ctx)
          );
        },
      });

      assert.strictEqual(
        interpolation.transform('Hello ${person.firstName} ${person.lastName}', {
          person: {
            firstName: 'David',
            lastName: 'Goodenough',
          },
        }),
        'Hello David Goodenough'
      );
    });
  });

  describe('Case Sensitivity', () => {
    it('Case sensitive', () => {
      const interpolation = new Interpolation();
      assert.strictEqual(
        interpolation.transform('Hello ${NaMe}', {
          name: 'David',
        }),
        'Hello '
      );
    });

    it('Ignore case', () => {
      const interpolation = new Interpolation({ ignoreCase: true });
      assert.strictEqual(
        interpolation.transform('Hello ${NaMe}', {
          name: 'David',
        }),
        'Hello David'
      );
    });
  });
  // describe.only('RawTransform', () => {
  //   it('Simple', () => {
  //     const interpolation = new Interpolation();
  //     assert.strictEqual(
  //       interpolation.rawTransform('Hello ${name}', {
  //         name: 'David',
  //       }),
  //       'Hello David'
  //     );
  //   });
  // });
});
