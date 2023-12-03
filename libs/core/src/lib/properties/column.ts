import { Column } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function TextColumn() {
  return applyDecorators(
    ApiProperty({ type: 'string' }),
    Column({ type: 'varchar', nullable: true, default: '' })
  );
}

export function UniqueTextColumn() {
  return applyDecorators(
    ApiProperty({ type: 'string' }),
    Column({ type: 'varchar', unique: true })
  );
}

export function NumberColumn() {
  return applyDecorators(
    ApiProperty({ type: 'number' }),
    Column({ type: 'numeric', default: 0 })
  );
}

export function PasswordColumn() {
  return applyDecorators(
    ApiProperty({ type: 'string' }),
    Column({
      type: 'varchar',
      transformer: {
        to(value) {
          return hashSync(value, genSaltSync(8));
        },

        from(value) {
          return value;
        },
      },
    })
  );
}

export function DateColumn() {
  return applyDecorators(
    ApiProperty({ type: 'date' }),
    Column({
      type: 'date',
      nullable: true,
    })
  );
}

export function BooleanColumn() {
  return applyDecorators(
    ApiProperty({ type: 'boolean' }),
    Column({ type: 'boolean', default: false })
  );
}
