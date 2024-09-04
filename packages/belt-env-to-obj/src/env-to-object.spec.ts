import { envToObject } from './index';
import { describe, it, expect } from 'vitest';

describe('envToObject', () => {
  it('Env to an object', () => {
    expect(
      envToObject(
        {
          NAME: 'John',
          AGE: '25',
          level: '0',
          something: undefined,
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({ name: 'John', age: 25, level: 0 });
  });

  it('Env to an object - keep undefined', () => {
    expect(
      envToObject(
        {
          NAME: 'John',
          AGE: '25',
          level: '0',
          something: undefined,
        },
        {
          convertKey: key => key.toLowerCase(),
          keepUndefined: true,
        }
      )
    ).deep.equals({ name: 'John', age: 25, level: 0, something: undefined });
  });

  it('Env to an object - keep undefined - fallback', () => {
    const defaultValue: Record<string, unknown> = {
      something: 'else',
    };
    expect(
      envToObject(
        {
          NAME: 'John',
          AGE: '25',
          level: '0',
          something: undefined,
        },
        {
          convertKey: key => key.toLowerCase(),
          convertValue(value, key) {
            if (value == null) {
              return defaultValue[key];
            } else {
              return value;
            }
          },
          keepUndefined: true,
        }
      )
    ).deep.equals({ name: 'John', age: 25, level: 0, something: 'else' });
  });

  it('With quotes', () => {
    expect(
      envToObject(
        {
          NAME: "'John'",
          AGE: "'25'",
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({ name: 'John', age: '25' });
  });

  it('Double quotes', () => {
    expect(
      envToObject(
        {
          NAME: '"John"',
          AGE: '"25"',
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({ name: 'John', age: '25' });
  });

  it('should handle empty arguments', () => {
    expect(
      envToObject(
        {},
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({});
  });

  it('Should ignore empty env var', () => {
    expect(
      envToObject(
        {
          NAME: '',
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({});
  });

  it('Boolean value "false"', () => {
    expect(
      envToObject(
        {
          IS_OK: 'false',
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({
      is_ok: false,
    });
  });

  it('Boolean value "true"', () => {
    expect(
      envToObject(
        {
          IS_OK: 'true',
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({
      is_ok: true,
    });
  });

  it('Pattern', () => {
    expect(
      envToObject(
        {
          IS_OK: 'true',
          BELT_IS_OK: 'true',
        },
        {
          pattern: /^BELT_/,
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({
      belt_is_ok: true,
    });
  });

  it('Convert value', () => {
    expect(
      envToObject(
        {
          IS_OK: '1',
        },
        {
          convertKey: key => key.toLowerCase(),
          convertValue: value => (value == '1' ? true : false),
        }
      )
    ).deep.equals({
      is_ok: true,
    });
  });

  it('Nested', () => {
    expect(
      envToObject(
        {
          BELT__CONTACT__NAME: 'John',
          BELT__CONTACT__AGE: '25',
        },
        {
          convertKey: key => key.toLowerCase(),
        }
      )
    ).deep.equals({ belt: { contact: { name: 'John', age: 25 } } });
  });

  it('Nested - custom delimiter - dot', () => {
    expect(
      envToObject(
        {
          'BELT.CONTACT.NAME': 'John',
          'BELT.CONTACT.AGE': '25',
        },
        {
          convertKey: key => key.toLowerCase(),
          nestedDelimiter: '.',
        }
      )
    ).deep.equals({ belt: { contact: { name: 'John', age: 25 } } });
  });

  it('Nested - custom delimiter - RegExp', () => {
    expect(
      envToObject(
        {
          'BELT.CONTACT_NAME': 'John',
          'BELT.CONTACT@AGE': '25',
        },
        {
          convertKey: key => key.toLowerCase(),
          // Every non-alphanumeric character
          nestedDelimiter: /[^a-zA-Z0-9]/,
        }
      )
    ).deep.equals({ belt: { contact: { name: 'John', age: 25 } } });
  });
});
