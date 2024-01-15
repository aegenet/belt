import { setTimeout } from 'node:timers/promises';

/** Delay operation */
export async function delay(duration: number): Promise<void> {
  await setTimeout(duration);
}
