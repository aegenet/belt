let _isNodeJS: boolean;
let _isMobileDevice: boolean;

/**
 * Is NodeJS ? (result is cached)
 */
export function isNodeJS() {
  if (_isNodeJS !== undefined) {
    return _isNodeJS;
  } else {
    return (_isNodeJS = typeof process === 'object');
  }
}

/** Is Mobile Device ? */
export function isMobileDevice() {
  if (_isMobileDevice === undefined) {
    _isMobileDevice = !isNodeJS() && window.matchMedia('(any-hover: none)').matches;
  }
  return _isMobileDevice;
}
