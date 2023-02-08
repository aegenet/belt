/**
 * Get an error message
 *
 * You can specify alternative fields
 *
 * Look at: `error.message`, `error.error`, `error.error.message`, (n) => `error[altMsgFields[n]]`
 */
export function getErrorMessage(error: any, ...altMsgFields: string[]): string | null {
  if (error == null) {
    // ?
    return null;
  }

  if (typeof error === 'string') {
    return error;
  }

  if ('message' in error) {
    return error.message;
  }

  if (altMsgFields) {
    let altMsg;
    for (let i = 0; i < altMsgFields.length; i++) {
      altMsg = getErrorMessage(error[altMsgFields[i]]);
      if (altMsg != null) {
        return altMsg;
      }
    }
  }

  return null;
}
