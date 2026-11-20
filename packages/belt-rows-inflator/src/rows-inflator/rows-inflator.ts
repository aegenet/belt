import { ERowsInflatorAssociation } from './e-rows-inflator-association';
import type { IRowsInflatorMapper } from './i-rows-inflator-mapper';
import type { IRowsInflatorOptions } from './i-rows-inflator-options';

/** Faster than array.join() */
function rejoin(array: string[], endInclusive: number) {
  let str = '';
  for (let i = 0; i < endInclusive; i++) {
    str += array[i];
  }
  return str;
}

/** Good to know: Symbol is ignored in JSON serialization */
const symHydrate: unique symbol = Symbol('__h');

/**
 * Handed to `setValue` when an association level mapped to nothing on this row (`emptyWhenAbsent`).
 * Never exposed: consumers only ever see the `null` / `[]` it produces on the parent.
 */
const symAbsent: unique symbol = Symbol('__absent');

export function rowsInflator<I = any, O = any>(raws: I[], schema: IRowsInflatorOptions): O[] {
  if (!raws || raws.length === 0) {
    return [];
  }

  /** The rows mapper lets us know how we are going to parse each line. */
  const rowsMapper = _createJITRowMapper([], '', schema);

  /** Main collection */
  const mainCollection: O[] = [];
  let assocUUID: string;
  let raw: I,
    rowPathValues: any[],
    rowPathUUID: string[],
    rowMapper,
    depth,
    cache,
    map: <I>(row: I) => { value: any; uuid: string },
    cachedData,
    formated;

  for (let i = 0; i < raws.length; i++) {
    raw = raws[i];
    // Allows us to find out who the parent is
    rowPathValues = [];
    rowPathUUID = [];

    /** We expands all possible associations/includes */
    for (let y = 0; y < rowsMapper.length; y++) {
      ({ depth, cache, map } = rowMapper = rowsMapper[y]);

      // We only scan if we have the parent, otherwise skip
      if (rowPathValues.length >= depth) {
        formated = map<I>(raw);
        if (formated) {
          assocUUID = rejoin(rowPathUUID, depth) + formated.uuid;
          cachedData = cache.get(assocUUID);

          // If it doesn't exist, we create it and add it to the table and map.
          if (!cachedData) {
            cachedData = formated.value;
            cache.set(assocUUID, cachedData);

            // The setValue also includes hydration
            rowMapper.setValue(mainCollection, rowPathValues, cachedData);
          }

          // Important
          if (depth === 0) {
            // If record root is null => no children
            rowPathValues = [cachedData];
            rowPathUUID = [formated.uuid];
          } else {
            rowPathValues[depth] = cachedData;
            // We don't do the line bellow (`rowPathValues.length = rowMapper.depth + 1`) because this causes the table to be rewritten, which reduces performance.
            // Never use the size of rowPathValues, but always the depth of the association, so you don't have to.
            // rowPathValues.length = rowMapper.depth + 1;

            rowPathUUID[depth] = formated.uuid;
          }
        } else if (rowMapper.emptyWhenAbsent) {
          // The association matched nothing on this row: the parent still gets the key (`null` or `[]`).
          rowMapper.setValue(mainCollection, rowPathValues, symAbsent);
          if (depth > 0) {
            // Deeper levels of this same row must not attach to the parent this row just left behind.
            rowPathValues[depth] = null;
            rowPathUUID[depth] = '';
          }
        }
      }
    }
  }

  return mainCollection;
}

/** We create the path to be taken by row (JIT) to parse all the elements */
function _createJITRowMapper(
  rowMappers: IRowsInflatorMapper[],
  actualPath: string,
  levelSchema: IRowsInflatorOptions,
  depth: number = 0
): Array<IRowsInflatorMapper> {
  if (levelSchema) {
    const formatedPathWithU = actualPath ? `${actualPath}__` : '';

    let mapFunction: ((row: unknown) => { value: unknown; uuid: string }) | undefined;
    if (levelSchema.fields) {
      const fields = Object.keys(levelSchema.fields);
      const pks = levelSchema.primaryKeys?.length
        ? levelSchema.primaryKeys.filter(f => levelSchema.fields[f] != null)
        : [];
      const hasPKFields = !!pks.length;
      // We create a closure dedicated to this string so as not to keep the entire function in memory (here and in the Function).
      let mapFuncStr = `
const rowed = {};
let hasValue = ${fields.length};
let uuid = '';
let val;`;

      for (let fi = 0; fi < fields.length; fi++) {
        const f = fields[fi];
        mapFuncStr += `
val = rowed['${f}'] = row['${formatedPathWithU}${f}'];
if (val == null) {
  hasValue--;
}
${hasPKFields ? '' : `uuid += \`_\${val}\`;`}`;
      }

      // mapFuncStr += `rowed.__uuid = ${hasPKFields ?
      //   levelSchema.primaryKeys.map(f => `rowed['${f}']`).join(' + ') :
      //   'uuid'};
      mapFuncStr += `
      return hasValue ? { value: rowed, uuid: ${hasPKFields ? pks.map(f => `rowed['${f}']`).join(' + ') : 'uuid'} } : null;`;

      mapFunction = new Function('row', mapFuncStr) as (row: unknown) => { value: unknown; uuid: string };
    }

    // `<= belongsTo` is the singular side of the enum (hasOne & belongsTo), the plural side being
    // hasMany & belongsToMany. Computed once per level, reused by the `emptyWhenAbsent` marker.
    const isSingularAssociation =
      levelSchema.associationType != null && levelSchema.associationType <= ERowsInflatorAssociation.belongsTo;

    rowMappers.push({
      cache: new Map<string, any>(),
      depth,
      // A root level that maps to nothing is not a row: the option only applies to associations.
      emptyWhenAbsent: depth > 0 && levelSchema.emptyWhenAbsent === true,
      map: (mapFunction as any) ?? (() => null),
      setValue: (mainCollection, rowPathValues, value) => {
        if (value === symAbsent) {
          // Only reached through `emptyWhenAbsent`. Singular -> null, plural -> [].
          if (depth === 0) {
            return;
          }
          const absentParent = rowPathValues[depth - 1];
          if (absentParent == null) {
            // An ancestor already missed on this row: there is nothing to hang the key on.
            return;
          }
          // Singular association -> `null`, plural one -> `[]`.
          absentParent[levelSchema.as!] = isSingularAssociation ? null : [];
          return;
        }

        if (depth === 0) {
          mainCollection.push(value);
        } else {
          const parent = rowPathValues[depth - 1];
          // <= to take the hasOne & belongsTo
          if (
            levelSchema.associationType != null &&
            levelSchema.associationType <= ERowsInflatorAssociation.belongsTo
          ) {
            parent[levelSchema.as!] = value;
          } else {
            if (!parent[levelSchema.as!]) {
              parent[levelSchema.as!] = [value];
            } else {
              parent[levelSchema.as!].push(value);
            }
          }
        }

        if (levelSchema.hydrate && !value[symHydrate]) {
          levelSchema.hydrate(value);
          value[symHydrate] = 1;
          /** The following code destroys performance */
          /** We set hydrated to non enumerable and non writable */
          // Object.defineProperty(cachedData, '__h', {
          //   value: true,
          //   enumerable: false,
          //   writable: false
          // });
        }
      },
    });

    if (levelSchema.associations) {
      for (const assocKey in levelSchema.associations) {
        const assoc = levelSchema.associations[assocKey];
        const assocPath = `${formatedPathWithU}${assocKey}`;

        _createJITRowMapper(rowMappers, assocPath, assoc, depth + 1);
      }
    }
  }
  return rowMappers;
}
