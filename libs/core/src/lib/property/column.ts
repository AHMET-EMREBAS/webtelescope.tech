import {
  Column as Clm,
  ColumnOptions as CO,
  ColumnType,
  ValueTransformer,
} from 'typeorm';
import { InputType } from './input-type';

export type ColumnOptions = {
  type: InputType;
  requried?: boolean;
  unique?: boolean;
};

export function JSONTransformer(): ValueTransformer {
  return {
    to(value) {
      return value && JSON.stringify(value);
    },
    from(value) {
      return value && JSON.parse(value);
    },
  };
}
export function Column(options: ColumnOptions) {
  const { type, requried, unique } = options;

  const columnType: ColumnType =
    type === 'string'
      ? 'varchar'
      : type === 'boolean'
      ? 'boolean'
      : type === 'date'
      ? 'date'
      : type === 'number'
      ? 'numeric'
      : type === 'object'
      ? 'varchar'
      : 'varchar';

  const columnOptions: CO = {
    type: columnType,
    unique: !!unique,
    nullable: requried === true ? false : true,
  };

  if (type === 'object') {
    columnOptions.transformer = JSONTransformer();
  }

  return Clm(columnOptions);
}
