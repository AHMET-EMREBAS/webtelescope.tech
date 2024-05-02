/**
 * Exclude undefined values from record.
 * @param obj Record
 * @returns
 */
export function excludeUndefined<T extends object, R = T>(obj: T): R {
  const m = Object.entries(obj)
    .filter(([, value]) => value != undefined)
    .map(([key, value]) => ({ [key]: value }));

  if (m.length > 0) {
    return m.reduce((p, c) => ({ ...p, ...c })) as R;
  }
  return {} as R;
}
