import {
  Column as C,
  ColumnOptions,
  CreateDateColumn,
  DeleteDateColumn,
  Entity as E,
  EntityOptions,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn as PG,
  UpdateDateColumn,
} from 'typeorm';
import { ClassConstructor } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';

export function Primary() {
  return PG();
}

export function Column(options: ColumnOptions = {}) {
  return C(options);
}

export function Entity(options: EntityOptions = {}) {
  return E(options);
}

export class BaseEntity {
  @PG()
  id!: number;
}

export class TimestampEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export type RelationType = 'one' | 'many' | 'owner';

export function One<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (e) => e.id,
      {
        eager: true,
        nullable: true,
        onDelete: 'SET NULL',
      }
    ),
    JoinColumn()
  );
}

export function Many<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (e) => e.id,
      {
        eager: true,
        nullable: true,
        onDelete: 'SET NULL',
      }
    ),
    JoinTable()
  );
}

export function Owner<T extends BaseEntity>(target: ClassConstructor<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (e) => e.id,
      { onDelete: 'CASCADE' }
    ),
    JoinColumn()
  );
}
export type RelationOptions<T> = {
  type: RelationType;
  target: ClassConstructor<T>;
};

export function Relation<T extends BaseEntity>(options: RelationOptions<T>) {
  const { type, target } = options;
  return type === 'one'
    ? One(target)
    : type === 'many'
    ? Many(target)
    : Owner(target);
}
