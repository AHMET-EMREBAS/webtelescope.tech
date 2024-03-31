import { Column, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Type, applyDecorators } from '@nestjs/common';
import { hashSync, genSaltSync } from 'bcrypt';
import { v4 } from 'uuid';
import { IID } from './types';

/**
 * Unique name column
 * @returns PropertyDecorator {@link Column}
 */
export function NameColumn(nullable = false): PropertyDecorator {
  return Column({ type: 'varchar', unique: true, nullable });
}

export function UniqueTextColumn(nullable = true): PropertyDecorator {
  return Column({ type: 'varchar', unique: true, nullable });
}

/**
 * Nullable text column
 * @returns PropertyDecorator {@link Column}
 */
export function TextColumn(nullable = true): PropertyDecorator {
  return Column({ type: 'varchar', nullable });
}

/**
 * Number column.
 * Nullable by default.
 * @param nullable boolean
 * @returns
 */
export function NumberColumn(nullable = true) {
  return Column({ type: 'numeric', nullable });
}

export function BooleanColumn(defaultValue = false) {
  return Column({ type: 'boolean', nullable: true, default: defaultValue });
}

/**
 * JSON column.
 * Save data as JSON string, and read as Object
 * @param nullable
 * @returns
 */
export function ObjectColumn(nullable = true) {
  return Column({
    type: 'varchar',
    nullable,
    transformer: {
      to(value) {
        return value && JSON.stringify(value);
      },
      from(value) {
        return value && JSON.parse(value);
      },
    },
  });
}

export function DateColumn(nullable = true) {
  return Column({
    type: 'varchar',
    nullable,
    transformer: {
      to(value: Date) {
        return value.toISOString();
      },
      from(value: string) {
        return new Date(value);
      },
    },
  });
}

/**
 * Transform data to hash, and read as hash
 * @returns
 */
export function PasswordColumn() {
  return Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return value && hashSync(value, genSaltSync(8));
      },
      from(value) {
        return value;
      },
    },
  });
}

/**
 * Generate and save uuid
 * @returns
 */
export function UUIDColumn() {
  return Column({
    type: 'varchar',
    transformer: {
      to() {
        return v4();
      },
      from(value) {
        return value;
      },
    },
  });
}

/**
 * Owner relation is the owner of the entity.
 * If any entity have an owner relation, the owner must exist.
 * When the owner is deleted, the entity is deleted as well.
 * @param target {@link T}
 * @returns
 */
export function OwnerRelation<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
      }
    ),
    JoinColumn()
  );
}

/**
 * An entity to store an extra information about the entity like category, department, etc.
 * When this relation is deleted, the entity is not affected.
 * @param target
 * @returns
 */
export function OneRelation<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      { eager: true, nullable: true }
    ),
    JoinColumn()
  );
}
/**
 * Many entities to store an extra information about the entity like category, department, assinees, or any.
 * When this relation is deleted, the entity is not affected.
 * @param target
 * @returns
 */
export function ManyRelation<T extends IID>(target: Type<T>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      { eager: true, nullable: true }
    ),
    JoinTable()
  );
}
