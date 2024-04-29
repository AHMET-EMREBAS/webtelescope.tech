/**
 * Exclude undefined values from record.
 * @param obj Record
 * @returns
 */
export function excludeUndefined<T extends object, R = T>(obj: T): R {
  return Object.entries(obj)
    .filter(([, value]) => value != undefined)
    .map(([key, value]) => ({ [key]: value }))
    .reduce((p, c) => ({ ...p, ...c })) as R;
}
