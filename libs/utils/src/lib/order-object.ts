export function orderObject<T extends object>(
  object: T,
  order: (keyof T)[]
): T {
  const newObject: T = {} as T;

  for (const o of order) {
    if (object[o] != undefined) {
      newObject[o] = object[o];
    }
  }

  return { ...newObject, ...object };
}