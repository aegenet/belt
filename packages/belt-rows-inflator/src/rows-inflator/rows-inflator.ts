/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ERowsInflatorAssociation } from './e-rows-inflator-association';
import type { IRowsInflatorMapper } from './i-rows-inflator-mapper';
import type { IRowsInflatorOptions } from './i-rows-inflator-options';

/** Faster than array.join() */
function rejoin(array: string[], endInclusive: number) {
  let str = '';
  for (let i = 0; i <= endInclusive; i++) {
    str += array[i];
  }
  return str;
}

/** Good to know: Symbol is ignored in JSON serialization */
const symHydrate: unique symbol = Symbol('__h');

export function rowsInflator<I = any, O = any>(raws: I[], schema: IRowsInflatorOptions): O[] {
  if (!raws || raws.length === 0) {
    return [];
  }

  /** Le rows mapper va nous permettre de savoir comment nous allons parser chaque ligne */
  const rowsMapper = _createJITRowMapper([], '', schema);

  // Tableau principal
  const mainCollection: O[] = [];
  let assocUUID: string;
  let raw: I, rowPathValues: any[], rowPathUUID: string[], rowMapper, depth, cache, map: <I>(row: I) => { value: any; uuid: string }, cachedData, formated;

  for (let i = 0; i < raws.length; i++) {
    raw = raws[i];
    // Permet de savoir qui est le parent
    rowPathValues = [];
    rowPathUUID = [];

    /** Nous dépilons tous les expands/associations/includes possibles */
    for (let y = 0; y < rowsMapper.length; y++) {
      ({ depth, cache, map } = rowMapper = rowsMapper[y]);

      // Nous scannons que si nous avons le parent, sinon cela ne sert à rien
      if (rowPathValues.length >= depth) {
        formated = map<I>(raw);
        if (formated) {
          assocUUID = rejoin(rowPathUUID, depth) + formated.uuid;

          cachedData = cache.get(assocUUID);

          // Si elle n'existe pas on la crée et on l'ajoute au tableau et à la map
          if (!cachedData) {
            cachedData = formated.value;
            cache.set(assocUUID, cachedData);

            // Lors du setValue il y aussi l'hydratation
            rowMapper.setValue(mainCollection, rowPathValues, cachedData);
          }

          // Important
          if (depth === 0) {
            // Si le record root est null il ne peut pas y avoir d'enfant
            rowPathValues = [cachedData];
            rowPathUUID = [formated.uuid];
          } else {
            rowPathValues[depth] = cachedData;
            // On ne fait pas la ligne en dessous car ça provoque la réécriture du tableau, ce qui plombe les performances
            // Il ne faut jamais utiliser la taille du rowPathValues, mais toujours la profondeur de l'association pour ne pas à avoir à faire cela
            // rowPathValues.length = rowMapper.depth + 1;

            rowPathUUID[depth] = formated.uuid;
          }
        }
      }
    }
  }

  return mainCollection;
}

/** Nous créeons le parcours à effectuer par row pour parser tous les éléments */
function _createJITRowMapper(rowMappers: IRowsInflatorMapper[], actualPath: string, levelSchema: IRowsInflatorOptions, depth: number = 0): Array<IRowsInflatorMapper> {
  if (levelSchema) {
    const formatedPathWithU = actualPath ? `${actualPath}__` : '';

    let mapFunction: ((row: unknown) => { value: unknown; uuid: string }) | undefined;
    if (levelSchema.fields) {
      const fields = Object.keys(levelSchema.fields);
      const pks = levelSchema.primaryKeys?.length ? levelSchema.primaryKeys.filter(f => f in levelSchema.fields) : [];
      const hasPKFields = !!pks.length;
      // Nous créeons un closure dédié à cette chaine pour ne pas garder toute la fonction en doublon dans la mémoire (ici et dans la Function)
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

    rowMappers.push({
      cache: new Map<string, any>(),
      depth,
      map: (mapFunction as any) ?? (row => null),
      setValue: (mainCollection, rowPathValues, value) => {
        if (depth === 0) {
          mainCollection.push(value);
        } else {
          const parent = rowPathValues[depth - 1];
          // <= permet de prendre le hasOne & le belongsTo
          if (levelSchema.associationType != null && levelSchema.associationType <= ERowsInflatorAssociation.belongsTo) {
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
          /** Le code ci-dessous détruit les performances */
          /** Nous mettons l'hydrated en non enumerable et non writable */
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
