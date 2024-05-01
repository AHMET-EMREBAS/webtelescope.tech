/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stringify as code
 * @param obj
 * @returns
 */
export function stringify(obj: any): any {
  if (typeof obj === 'string') {
    return `'${obj}'`;
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  } else if (typeof obj === 'object') {
    const code = Object.entries(obj)
      .map(([key, value]) => {
        if (key === 'objectType' || key === 'target') {
          return `${key}: ${value}`;
        }
        return `${key}: ${stringify(value)},`;
      })
      .join(' ');

    const wrap = (__content: string) => `{ ${__content} }`;

    return wrap(code.replace(/,$/, ''));
  }
  return '';
}
