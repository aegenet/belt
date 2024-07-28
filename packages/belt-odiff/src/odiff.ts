/**
 * Returns the difference between two objects.
 *
 * For performance and memory reasons:
 *  - The list of fields is mandatory
 *  - The return is basic, table of table in the form:
 * @return [field, before, after][]
 */
export function odiff<T = Record<string, unknown>>(
  oldData: T,
  newData: T,
  options: {
    fields: string[] | Array<{ name: string; type: 'date' | 'number' | 'string' | 'object' | 'array' }>;
  }
): [string, unknown, unknown][] {
  const diff: [string, unknown, unknown][] = [];
  const secOldData: Record<string, unknown> = oldData || {};
  const secNewData: Record<string, unknown> = newData || {};
  const fields = options.fields;
  if (fields?.length) {
    let before, after;
    if (typeof fields[0] === 'string') {
      let field: string;
      for (let i = 0; i < fields.length; i++) {
        field = fields[i] as string;
        before = secOldData[field as string];
        after = secNewData[field as string];
        if (before !== after) {
          diff.push([field as string, before, after]);
        }
      }
    } else {
      let field: { name: string; type: string };
      for (let i = 0; i < fields.length; i++) {
        field = fields[i] as { name: string; type: string };
        before = secOldData[field.name];
        after = secNewData[field.name];
        switch (field.type) {
          case 'string':
          case 'number':
            if (before !== after) {
              diff.push([field.name, before, after]);
            }
            break;
          case 'date':
            if (
              before instanceof Date && after instanceof Date ? before.getTime() !== after.getTime() : before !== after
            ) {
              diff.push([field.name, before, after]);
            }
            break;
          case 'array':
          case 'object':
            if (JSON.stringify(before) !== JSON.stringify(after)) {
              diff.push([field.name, before, after]);
            }
            break;
          default:
            if (before !== after) {
              diff.push([field.name, before, after]);
            }
        }
      }
    }
    return diff;
  } else {
    throw new Error('Invalid usage of odiff: fields property is mandatory.');
  }
}
