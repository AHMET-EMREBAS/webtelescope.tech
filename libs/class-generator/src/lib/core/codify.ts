/* eslint-disable @typescript-eslint/no-explicit-any */

export function codify(obj: any): string {
  const objectType = typeof obj;
  if (objectType === 'string') {
    return `'${obj}'`;
  } else if (objectType === 'number') {
    return `${obj}`;
  } else if (objectType === 'function') {
    return obj.name;
  } else {
    const result = Object.entries(obj)
      .map(([key, value]) => `${key}:${codify(value)}`)
      .join(',');
    return `{${result}}`;
  }
}
