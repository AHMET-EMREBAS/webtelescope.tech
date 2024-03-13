/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnOptions } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

/**
 * Save date value as string and read as Date object
 * @returns
 */
export function DateTransformer(): Pick<ColumnOptions, 'transformer'> {
  return {
    transformer: {
      from(value: string) {
        return value && new Date(value);
      },
      to(value: Date) {
        return value && value.toISOString();
      },
    },
  };
}

/**
 * Save object value as JSON string and read as Object
 * @returns
 */
export function ObjectTransformer(): Pick<ColumnOptions, 'transformer'> {
  return {
    transformer: {
      from(value) {
        return value && JSON.parse(value);
      },
      to(value: Record<string, any>) {
        return value && JSON.stringify(value);
      },
    },
  };
}

/**
 * Save column value as hash
 * @returns
 */
export function HashTransformer(): Pick<ColumnOptions, 'transformer'> {
  return {
    transformer: {
      from(value) {
        return value;
      },
      to(value: string) {
        return value && hashSync(value, genSaltSync(8));
      },
    },
  };
}

/**
 * Do not do anything
 * @returns
 */
export function NoneTransformer(): Pick<ColumnOptions, 'transformer'> {
  return {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value;
      },
    },
  };
}
