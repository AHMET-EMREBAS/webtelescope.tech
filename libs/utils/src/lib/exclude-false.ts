/* eslint-disable @typescript-eslint/no-explicit-any */
export function excludeFalse<T extends object, R = T>(object: T): R {
  return Object.entries(object)
    .filter(([, value]) => value !== false || value == undefined)
    .map(([key, value]) => {
      return { [key]: value };
    })
    .reduce((p, c) => ({ ...p, ...c })) as R;
}
