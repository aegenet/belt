/** Sequentially calls of functions */
export async function collectSequentially<O = unknown[]>(...fns: Array<() => Promise<unknown> | Record<string, unknown> | void>): Promise<O> {
  const ouputs: unknown[] = [];
  for (const prom of fns) {
    ouputs.push(await Promise.resolve(prom()));
  }
  return ouputs as unknown as Promise<O>;
}
