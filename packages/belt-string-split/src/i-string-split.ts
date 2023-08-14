/**
 * String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags'
 *
 * eg: Something Else (Ignore me) => ['Something', 'Else', '(Ignore Me)']
 */
export interface IStringSplit {
  /** Split the string */
  split(str: string): string[];
}
