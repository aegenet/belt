/** Revert base64 */
export function fromBase64(b64: string): string {
  if (b64 != null) {
    return decodeURIComponent(escape(atob(b64)));
  } else {
    return '';
  }
}
