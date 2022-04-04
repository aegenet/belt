let _isNodeJS: boolean;

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
