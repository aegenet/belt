/**
 * Renvoie la différence entre deux objets.
 *
 * Pour des raisons de performances et de mémoire:
 *  - La liste des champs est obligatoire.
 *  - Le retour est précaire, tableau de tableau sous la forme @return
 * @return [field, before, after][]
 */
export function odiff<T = Record<string, unknown>>(
  oldData: T,
  newData: T,
  options: {
    fields: string[];
  }
): any[][] {
  const diff: any[][] = [];
  const secOldData: any = oldData || {};
  const secNewData: any = newData || {};
  const fields: string[] = options.fields;
  if (fields?.length) {
    let before, after, field;
    for (let i = 0; i < fields.length; i++) {
      field = fields[i];
      before = secOldData[field];
      after = secNewData[field];
      if (before !== after) {
        diff.push([field, before, after]);
      }
    }
    return diff;
  } else {
    throw new Error('Invalid usage of odiff: fields property is mandatory.');
  }
}
