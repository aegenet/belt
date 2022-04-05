/** String to base64 */
export function toBase64(text: string): string {
  if (text != null) {
    return Buffer.from(text).toString('base64');
  } else {
    return '';
  }
}
