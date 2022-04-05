/** Revert base64 */
export function fromBase64(b64: string): string {
  if (b64 != null) {
    return Buffer.from(b64, 'base64').toString('utf-8');
  } else {
    return '';
  }
}
