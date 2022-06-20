let currentTZ: string;

/**
 * Get the current timezone with format +/-XXXX
 * @returns string
 */
export function getCurrentTimezone(): string {
  if (currentTZ) {
    return currentTZ;
  }

  currentTZ = timezoneOffsetToISO(new Date().getTimezoneOffset());

  return currentTZ;
}

/**
 * Convert the timezone offset to ISO format, like +0200
 *
 * @remarks Maybe use `getCurrentTimezone()` instead, no?
 *
 * @param timezoneOffset -120, +330
 * @returns string
 */
export function timezoneOffsetToISO(tzOffset: number): string {
  const rawHours = Math.abs(tzOffset / -60);

  // hour
  const hour = Math.floor(rawHours);
  // minutes
  const minutes = (rawHours % 1) * 60;

  // +/-[hh24][mm]
  return (tzOffset > 0 ? '-' : '+') + hour.toString().padStart(2, '0') + minutes.toString().padStart(2, '0');

  // const _tzDte = date.toString();
  // const idx = _tzDte.indexOf(' GMT');

  // if (idx !== -1) {
  //   return _tzDte.slice(idx + 4, idx + 9);
  // } else {
  //   return 'Z';
  // }
}
