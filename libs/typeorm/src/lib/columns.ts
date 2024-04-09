/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Column as Col,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Type, applyDecorators } from '@nestjs/common';
import { hashSync, genSaltSync } from 'bcrypt';
import { v4 } from 'uuid';
import { IID } from './types';

import { ApiProperty } from '@nestjs/swagger';

export type ColumnOptions = {
  type: 'string' | 'number' | 'boolean' | 'date' | 'object';
  required?: boolean;
  unique?: boolean;
  defaultValue?: any;
  isArray?: boolean;
};

export function Column(options: ColumnOptions) {
  const { type, required, unique, defaultValue, isArray: __isArray } = options;
  const colType =
    type === 'string' || type === 'date' || type === 'object'
      ? 'varchar'
      : type === 'boolean'
      ? 'boolean'
      : type === 'number'
      ? 'numeric'
      : 'varchar';

  const isNullable = required === false ? true : false;
  const isUnique = unique === true ? true : false;

  return applyDecorators(
    ApiProperty({ type: options.type }),
    Col({
      type: colType,
      unique: isUnique,
      nullable: isNullable,
      default: defaultValue,
      transformer: {
        from(value) {
          if (value) {
            if (type === 'date') {
              if (value)
                if (__isArray) {
                  return JSON.parse(value).map((e: string) => new Date(e));
                } else {
                  return new Date(value);
                }
            } else if (type === 'object') {
              return JSON.parse(value);
            }

            if (__isArray) {
              return JSON.parse(value);
            }
          }
          return value;
        },
        to(value) {
          if (value) {
            if (type === 'date') {
              if (__isArray) {
                return JSON.stringify(value.map((e: Date) => e.toISOString()));
              }
              return (value as Date).toISOString();
            } else if (type === 'object') {
              return JSON.stringify(value);
            }

            if (__isArray) {
              return JSON.stringify(value);
            }
          }
          return value;
        },
      },
    })
  );
}

export function StringColumn(
  options: Partial<Omit<ColumnOptions, 'type'>> = {}
): PropertyDecorator {
  return Column({ type: 'string', ...options });
}

export function UniqueNameColumn() {
  return Column({ type: 'string', unique: true });
}

export function NumberColumn(
  options: Partial<Omit<ColumnOptions, 'type'>> = {}
) {
  return Column({ type: 'number', ...options });
}

export function BooleanColumn(
  options: Partial<Omit<ColumnOptions, 'type'>> = {}
) {
  return Column({ type: 'boolean', ...options });
}
export function ObjectColumn(
  options: Partial<Omit<ColumnOptions, 'type'>> = {}
) {
  return Column({ type: 'object', ...options });
}

export function DateColumn(options: Partial<Omit<ColumnOptions, 'type'>> = {}) {
  return Column({ type: 'object', ...options });
}

/**
 * Transform data to hash, and read as hash
 * @returns
 */
export function PasswordColumn(
  options: Partial<Omit<ColumnOptions, 'type'>> = {}
) {
  return Col({
    type: 'varchar',
    ...options,
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
export function UUIDColumn(options: Partial<Omit<ColumnOptions, 'type'>> = {}) {
  return Col({
    type: 'varchar',
    ...options,
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
