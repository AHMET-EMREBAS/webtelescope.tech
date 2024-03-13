/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnOptions } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

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
