import { Column } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';


export function TextColumn() {
  return Column({ type: 'varchar', nullable: true, default: '' });
}

export function UniqueTextColumn() {
  return Column({ type: 'varchar', unique: true });
}

export function NumberColumn() {
  return Column({ type: 'numeric', default: 0 });
}

export function PasswordColumn() {
  return Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return hashSync(value, genSaltSync(8));
      },

      from(value) {
        return value;
      },
    },
  });
}

export function DateColumn() {
  return Column({
    type: 'date',
    nullable: true,
  });
}

export function BooleanColumn() {
  return Column({ type: 'boolean', default: false });
}
