/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stringify object as code
 * @param obj
 * @returns
 */
export function stringify(obj: Record<string, any> | string): string {
  if (typeof obj === 'string') {
    return `'${obj}'`;
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  } else if (typeof obj === 'object') {
    const code = Object.entries(obj)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        if (key === 'target' || key === 'objectType') {
          return `${key}: ${value}`;
        }
        return `${key}: ${stringify(value)}`;
      })
      .join(', ');

    return `{ ${code} }`;
  }
  return '';
}
