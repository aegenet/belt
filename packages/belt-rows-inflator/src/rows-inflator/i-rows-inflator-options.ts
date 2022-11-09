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
  /** Allows to hydrate the value after the mapping */
  hydrate?: (value: Record<PropertyKey, unknown>) => void;
}
