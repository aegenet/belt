import type { IAntiBounce } from './i-anti-bounce';

/**
 * Anti-bounce
 */
export class AntiBounce implements IAntiBounce {
  private _token?: unknown;

  constructor(
    private fn: (...params: unknown[]) => void,
    private duration: number = 100,
    private checker?: () => boolean
  ) {}

  /** Call with an anti-bounce :-) */
  public call(...params: unknown[]): void {
    this.dispose();

    if (this.checker && this.checker() === true) {
      if (this.fn) {
        this.fn(...params);
      }
    } else {
      this._token = setTimeout(() => {
        if (this.fn) {
          this.fn(...params);
          this._token = undefined;
        }
      }, this.duration);
    }
  }

  /**
   * Dispose, the future call will not be launched
   */
  public dispose(): void {
    if (this._token) {
      clearTimeout(this._token as any);
      this._token = undefined;
    }
  }
}
