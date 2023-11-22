import { Column as __Column } from 'typeorm';
import { hash } from '../bcrypt';

export type ColumnOptions = {
  type: 'varchar' | 'numeric' | 'date' | 'boolean' | 'json';
  required?: true;
  unique?: true;
};

export function Column(options: ColumnOptions) {
  const { type, required, unique } = options;
  return __Column({
    type,
    nullable: required == true ? false : true,
    unique: !!unique,
    transformer: {
      from(value) {
        if (type === 'json') {
          return value && JSON.parse(value);
        }
        return value;
      },
      to(value) {
        if (type === 'json') {
          return value && JSON.stringify(value);
        }
        return value;
      },
    },
  });
}

export function PasswordColumn() {
  return __Column({
    type: 'varchar',
    nullable: false,
    transformer: {
      to(value) {
        return hash(value);
      },
      from(value) {
        return value;
      },
    },
  });
}
