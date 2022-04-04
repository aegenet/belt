/** Error is a SyntaxError ? */
export function isSyntaxError(error: Error & { statusText?: string }): boolean {
  return !!(error instanceof SyntaxError || error.statusText?.startsWith('SyntaxError'));
}
