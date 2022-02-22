/** Sequentially run functions */
export async function runSequentially(...fns: Array<() => Promise<unknown> | Record<string, unknown> | void>): Promise<void> {
  for (const prom of fns) {
    await Promise.resolve(prom());
  }
}
