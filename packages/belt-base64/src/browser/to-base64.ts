/** String to base64 */
export function toBase64(text: string): string {
  if (text != null) {
    return btoa(unescape(encodeURIComponent(text)));
  } else {
    return '';
  }
}
