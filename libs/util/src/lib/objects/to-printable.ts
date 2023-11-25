/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Convert any value to printable code
 * @param value
 * @returns {string}
 */
export function toPrintable(value: any): string {
  if (value === undefined) {
    return '';
  }
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'bigint':
    case 'number':
    case 'boolean':
      return `${value}`;
  }

  if (value instanceof Date) {
    return `new Date('${value.toLocaleString()}')`;
  }

  if (Array.isArray(value)) {
    const result = value.map((e) => toPrintable(e)).join(',');

    return `[${result}]`;
  }

  if (typeof value === 'object') {
    const result = Object.entries(value)
      .map(([key, value]) => {
        return `${key}:${toPrintable(value)}`;
      })
      .join(',');
    return `{${result}}`;
  }

  return '';
}
