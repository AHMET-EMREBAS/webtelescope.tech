import {
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export class IDDto {
  id!: number;
}

export class BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
}

export type ColumnOptions = {
  required?: boolean;
  unique?: boolean;
};

export function TextColumn(options?: ColumnOptions) {
  return Column({
    type: 'varchar',
    unique: options?.unique === true,
    nullable: options?.required !== true,
  });
}

export function NumberColumn(options?: ColumnOptions) {
  return Column({
    type: 'varchar',
    unique: options?.unique === true,
    nullable: options?.required !== true,
    transformer: {
      to(value: number) {
        value?.toString();
      },
      from(value) {
        return parseFloat(value);
      },
    },
  });
}

export function DateColumn(options?: ColumnOptions) {
  return Column({
    type: 'varchar',

    nullable: options?.required !== true,
    unique: options?.unique === true,
    transformer: {
      to: (value: Date) => value.toISOString(),
      from: (value) => new Date(value),
    },
  });
}

export function BooleanColumn() {
  return Column({
    type: 'varchar',
    default: '0',
    transformer: {
      to(value: boolean) {
        return value === true ? '1' : value === false ? '-1' : '0';
      },
      from(value: '-1' | '1' | '0') {
        return value == '-1'
          ? false
          : value === '0'
          ? undefined
          : value === '1'
          ? true
          : undefined;
      },
    },
  });
}

export function RecordColumn(options?: ColumnOptions) {
  return Column({
    type: 'varchar',
    nullable: options?.required !== true,
    unique: options?.unique === true,
    transformer: {
      to(value: Record<string, unknown>) {
        return JSON.stringify(value);
      },
      from(value: string) {
        return value && JSON.parse(value);
      },
    },
  });
}

export function One<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { nullable: true, eager: true }
    ),
    JoinColumn()
  );
}

export function Many<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      { nullable: true, eager: true }
    ),
    JoinTable()
  );
}

export function Owner<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { onDelete: 'CASCADE' }
    ),
    JoinColumn()
  );
}
