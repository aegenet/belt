const RE_ENV_SENSITIVE = /(^|[\-_ ])(pwd|password|passw|paswd|pass|secret|key)($|[\-_ ])/i;

/*
 * Hide sensitive
 */
export function createHideSensitiveFunction(env: Record<string, string>, sensitiveRegex: RegExp = RE_ENV_SENSITIVE): (input: string) => string {
  const envToHide = Object.keys(env || {}).filter(f => sensitiveRegex.test(f) && env[f]);
  if (envToHide.length) {
    const regexReplacer = new RegExp(envToHide.map(f => env[f]).join('|'), 'gm');

    function hideFunction(input: string) {
      return input?.replace(regexReplacer, '***');
    }
    return hideFunction;
  } else {
    return a => a;
  }
}
