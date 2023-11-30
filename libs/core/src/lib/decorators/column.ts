import { ColumnPropertyMeta } from '@webpackages/meta';
import { ColumnType, Column as __Column } from 'typeorm';

export function Column(options: ColumnPropertyMeta) {
  const type: ColumnType =
    options.type === 'number'
      ? 'numeric'
      : options.type === 'string'
      ? 'varchar'
      : options.type === 'date'
      ? 'date'
      : options.type === 'object'
      ? 'varchar'
      : options.type === 'boolean'
      ? 'boolean'
      : 'varchar';

  const { required, unique } = options;
  
  return __Column({
    type,
    nullable: required === true ? false : true,
    unique: !!unique,
  });
}
