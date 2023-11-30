/* eslint-disable @typescript-eslint/no-explicit-any */
export type StringifyOptions = {
  type: 'string' | 'number' | 'date' | 'boolean' | 'object';
  isArray?: boolean;
  value: any;
};

function toStringString(str: string) {
  return `'${str}'`;
}

function toDateString(date: Date) {
  return `new Date('${date.toLocaleString()}')`;
}

function toBooleanString(bool: boolean) {
  return `${bool}`;
}

function getOptions(value: any): StringifyOptions {
  if (typeof value === 'string') {
    return { value, type: 'string' };
  } else if (typeof value === 'number') {
    return { value, type: 'number' };
  } else if (typeof value === 'boolean') {
    return { value, type: 'boolean' };
  } else if (typeof value === 'object') {
    if ((value as Date).toLocaleDateString) {
      return { value, type: 'date' };
    }
    if (Array.isArray(value)) {
      return { type: getOptions(value[0]).type, value, isArray: true };
    }
    return { value, type: 'object' };
  }

  return { type: 'string', value };
}

export function stringifyByOptions(options: StringifyOptions): string {
  const type = options.type;
  const isArray = options.isArray;
  const mainValue = options.value;

  if (type === 'string') {
    if (isArray) {
      const fValue = (mainValue as string[]).map(toStringString).join(', ');
      return `[ ${fValue} ]`;
    }
    return toStringString(mainValue);
  } else if (type === 'boolean' || type === 'number') {
    if (isArray) {
      const fValue = (mainValue as boolean[]).map(toBooleanString).join(', ');
      return `[ ${fValue} ]`;
    }
    return toBooleanString(mainValue);
  } else if (type === 'date') {
    if (isArray) {
      const fValue = (mainValue as Date[]).map(toDateString).join(', ');
      return `[ ${fValue} ]`;
    }
    return toDateString(mainValue);
  } else if (type === 'object') {
    if (isArray) {
      const fValue = (mainValue as [])
        .map((e) => stringifyByOptions(getOptions(e)))
        .join(', ');
      return `[ ${fValue} ]`;
    }

    const entries = Object.entries(mainValue);

    const fvalue = entries
      .map(([key, value]) => {
        return `${[key]}: ${stringifyByOptions(getOptions(value))}`;
      })
      .join(',');
    return `{ ${fvalue} }`;
  }

  return '';
}

export function stringify(value: any): string {
  return stringifyByOptions(getOptions(value));
}
