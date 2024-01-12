/**
 * Returns a list of object properties.
 *
 * For performance and memory reasons:
 *  - The list of fields is mandatory
 *  - The return is basic, table of table in the form:
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
