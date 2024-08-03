import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { IReaddirEntry } from '../node';

/**
 * Get all files from a root directory (recursively)
 *
 * @param directory Root directory
 * @param action Action for each file path (optional). Can ignore files by returning `false`.
 */
export async function readdir(
  directory: string,
  action?: (filePath: IReaddirEntry, currentList: IReaddirEntry[]) => Promise<boolean> | boolean
): Promise<IReaddirEntry[]> {
  const files: IReaddirEntry[] = [];

  const dirents = await fs.readdir(directory, {
    withFileTypes: true,
  });

  let curPath;
  let entry: IReaddirEntry;

  for (const fileOrDir of dirents) {
    curPath = path.join(directory, fileOrDir.name);
    if (fileOrDir.isDirectory()) {
      files.push(...(await readdir(curPath, action)));
    } else {
      entry = {
        name: fileOrDir.name,
        path: curPath,
      };
      if (!action || (await action(entry, files)) !== false) {
        files.push(entry);
      }
    }
  }

  return files;
}
