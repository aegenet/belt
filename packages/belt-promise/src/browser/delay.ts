/** Delay operation */
export function delay(duration: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}
