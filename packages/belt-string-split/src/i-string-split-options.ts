export interface IStringSplitOptions {
  /** Split Separator */
  separator: string;
  /**
   * Ignore tags
   *
   * { [Open]: [Close] }
   * { '(': ')' }
   * { '(': ')', '[': ']' }
   * { '"': '"' }
   *
   * @default {}
   */
  ignoreTags?: Record<string, string>;
  /**
   * Ignore empty
   *
   * @default false
   */
  ignoreEmpty?: boolean;
}
