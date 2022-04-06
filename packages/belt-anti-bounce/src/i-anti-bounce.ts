/**
 * Anti-bounce
 */
export interface IAntiBounce {
  /** Call with an anti-bounce :-) */
  call(...params: unknown[]): void;

  /**
   * Dispose, the future call will not be launched
   */
  dispose(): void;
}
