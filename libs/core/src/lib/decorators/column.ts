import { ColumnOptions, DatabaseType, Column as __Column } from 'typeorm';

import { hashSync, genSaltSync } from 'bcrypt';

type ColumnType =
  | 'string'
  | 'number'
  | 'int'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'json'
  | 'hash';

interface __ColumnOptions<T extends ColumnType = ColumnType> {
  type: T;
  unique?: true;
  nullable?: true;
  default?: unknown;
}

export function databaseType(): DatabaseType {
  return process.env['DATABASE_TYPE'] as DatabaseType;
}

export function Column(options: __ColumnOptions = { type: 'string' }) {
  const { type, unique, nullable } = options;

  const commonOptions: Pick<ColumnOptions, 'unique' | 'nullable' | 'default'> =
    {
      unique: !!unique,
      nullable: !!nullable,
    };

  if (options.default != undefined) {
    commonOptions.default = options.default;
  }

  if (type === 'string') {
    return __Column({ type: 'varchar', ...commonOptions });
  } else if (type === 'datetime') {
    if (databaseType() === 'better-sqlite3') {
      return __Column({ type: 'datetime', ...commonOptions });
    } else {
      return __Column({ type: 'timestamp', ...commonOptions });
    }
  } else if (type == 'date') {
    return __Column({ type: 'date', ...commonOptions });
  } else if (type === 'number') {
    return __Column({ type: 'real', ...commonOptions });
  } else if (type === 'int') {
    return __Column({ type: 'integer', ...commonOptions });
  } else if (type === 'boolean') {
    return __Column({ type: 'boolean', ...commonOptions });
  } else if (type === 'hash') {
    return __Column({
      type: 'varchar',
      transformer: {
        to: (value) => (value ? hashSync(value, genSaltSync(8)) : ''),
        from: (value) => value,
      },
      ...commonOptions,
    });
  } else if (type === 'json') {
    if (databaseType() === 'postgres') {
      return __Column({ type: 'json' });
    } else {
      return __Column({
        type: 'varchar',
        transformer: {
          to: (value) => (value ? JSON.stringify(value) : value),
          from: (value) => (value ? JSON.parse(value) : value),
        },
        ...commonOptions,
      });
    }
  }

  throw new Error(`Column type ${type} is not defined or not compatible`);
}
