import { argvToObject } from './index';
import { describe, it, expect } from 'vitest';

describe('argvToObject', () => {
  it('should convert command line arguments to an object', () => {
    const argv = ['--name', 'John', '--age', '25'];
    const result = argvToObject(argv);
    const expected = { name: 'John', age: 25 };
    expect(result).toEqual(expected);
  });

  it('equals syntax', () => {
    const argv = ['--name=John', '--age=25'];
    const result = argvToObject(argv);
    const expected = { name: 'John', age: 25 };
    expect(result).toEqual(expected);
  });

  it('equals syntax with quotes', () => {
    const argv = ["--name='John'", "--age='25'"];
    const result = argvToObject(argv);
    const expected = { name: 'John', age: '25' };
    expect(result).toEqual(expected);
  });

  it('equals syntax with double quotes', () => {
    const argv = ['--name="John"', '--age="25"'];
    const result = argvToObject(argv);
    const expected = { name: 'John', age: '25' };
    expect(result).toEqual(expected);
  });

  it('should handle empty arguments', () => {
    const argv: string[] = [];
    const result = argvToObject(argv);
    const expected = {};
    expect(result).toEqual(expected);
  });

  it('should handle arguments with no values', () => {
    const argv = ['--verbose', '--debug'];
    const result = argvToObject(argv);
    const expected = { verbose: true, debug: true };
    expect(result).toEqual(expected);
  });

  it('should handle boolean arguments', () => {
    const argv = ['--verbose=true', '--debug=false'];
    const result = argvToObject(argv);
    const expected = { verbose: true, debug: false };
    expect(result).toEqual(expected);
  });
});
