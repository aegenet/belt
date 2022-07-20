import * as assert from 'assert';
import * as path from 'path';
import { readdir } from '../node';
import { IReaddirEntry } from '../node';

describe('readdir/node', () => {
  it('simple', async () => {
    const files: IReaddirEntry[] = await readdir(path.join(__dirname, '..'));
    assert.strictEqual(files.length, 7);
    assert.strictEqual(files[0].name, 'readdir.spec.ts');
    assert.ok(files[0].path.endsWith('readdir.spec.ts'));
  });

  it('With action', async () => {
    const files: IReaddirEntry[] = await readdir(path.join(__dirname, '..'), file => !file.name.endsWith('.spec.ts'));
    assert.strictEqual(files.length, 5);
    assert.strictEqual(files[0].name, 'readdir.ts');
    assert.ok(files[0].path.endsWith('readdir.ts'));
  });

  it('With async action', async () => {
    const files: IReaddirEntry[] = await readdir(path.join(__dirname, '..'), async file => !file.name.endsWith('.spec.ts'));
    assert.strictEqual(files.length, 5);
    assert.strictEqual(files[0].name, 'readdir.ts');
    assert.ok(files[0].path.endsWith('readdir.ts'));
  });
});
