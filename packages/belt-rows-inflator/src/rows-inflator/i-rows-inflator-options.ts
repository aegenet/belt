import type { ERowsInflatorAssociation } from './e-rows-inflator-association';

export interface IRowsInflatorOptions {
  /** Name of the association (nothing if it is the root) */
  as?: string;
  /** Fields (without association) */
  fields: {
    [fieldName: string]: unknown;
  };
  /** Associations (expands, includes) */
  associations?: {
    [as: string]: IRowsInflatorOptions;
  };
  /** Type of association */
  associationType?: ERowsInflatorAssociation;
  /** Primary keys (if specified, otherwise we create a key from the retrieved fields) */
  primaryKeys?: string[];
  /**
   * When an **association** level maps to nothing (typical of an outer join, `LEFT JOIN`, that matched no
   * child row), still expose the association on its parent instead of leaving the key out:
   * `null` for a singular association (`hasOne` / `belongsTo`), `[]` for a plural one
   * (`hasMany` / `belongsToMany`).
   *
   * Without this option the key is simply never created, which forces every consumer to test
   * `'association' in row` instead of reading the value. Ignored on the root level (a root row that maps
   * to nothing is not a row), and never written over an ancestor that already missed on the same row.
   */
  emptyWhenAbsent?: boolean;
  /** Allows to hydrate the value after the mapping */
  hydrate?: (value: Record<PropertyKey, unknown>) => void;
}
