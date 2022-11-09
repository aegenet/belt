/**
 * Renvoie la liste des propriétés d'un objet.
 *
 * Pour des raisons de performances et de mémoire:
 *  - La liste des champs est obligatoire.
 *  - Le retour est précaire, tableau de tableau sous la forme @return
 * @return [field, value][]
 */
export function ofields<T = Record<string, unknown>>(
  data: T,
  options: {
    fields: string[];
  }
): any[][] {
  data = data || ({} as unknown as T);
  const rowsFields: any[][] = [];
  const fields: string[] = options.fields;
  if (fields?.length) {
    let value, field;
    for (let i = 0; i < fields.length; i++) {
      field = fields[i];
      value = (data as any)[field];
      rowsFields.push([field, value]);
    }
    return rowsFields;
  } else {
    throw new Error('Invalid usage of ofields: fields property is mandatory.');
  }
}
