export interface IStringSplitOptions {
  /** Split Separator */
  separator: string | string[];
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
  /**
   * If true, the separator will be added
   * eg: ['Something', ' ', 'Else'] instead of ['Something', 'Else']
   * @default false
   */
  includeSep?: boolean;
}
