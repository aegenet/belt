import { IReaddirEntry } from '../browser';

/**
 * NodeJS ONLY.
 *
 * Get all files from a root directory (recursively)
 *
 * @param directory Root directory
 * @param action Action for each file path (optional). Can ignore files by returning `false`.
 */
export async function readdir(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  directory: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action?: (filePath: IReaddirEntry, currentList: IReaddirEntry[]) => Promise<boolean> | boolean
): Promise<IReaddirEntry[]> {
  throw new Error('Not implemented for browser.');
}
