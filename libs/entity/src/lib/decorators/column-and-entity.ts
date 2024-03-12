/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entity as __Entity,
  Column as __Column,
  ColumnType as __ColumnType,
  ColumnOptions as __ColumnOptions,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import {
  DateTransformer,
  HashTransformer,
  NoneTransformer,
  ObjectTransformer,
} from './column-transformers';
import { PropertyType } from '@webpackages/common';

export function Entity(): ClassDecorator {
  return __Entity();
}

export type ColumnOptions = {
  type: PropertyType;
  required?: boolean;
  unique?: boolean;
  default?: any;
  hash?: boolean;
};

/**
 * Convert column type into compatible column type.
 * @param type
 * @returns
 */
export function parseColumnType(type: PropertyType): __ColumnType {
  return type === 'string'
    ? 'varchar'
    : type === 'boolean'
    ? 'boolean'
    : type === 'date'
    ? 'varchar'
    : type === 'number'
    ? 'real'
    : type === 'object'
    ? 'varchar'
    : 'varchar';
}

export function parseCommonColumnOptions(
  options: ColumnOptions
): __ColumnOptions {
  const columnOptions: __ColumnOptions = {
    ...options,
    type: parseColumnType(options.type),
    nullable: !options.required,
    unique: !!options.unique,
    transformer: options.hash
      ? HashTransformer().transformer
      : NoneTransformer().transformer,
  };

  return columnOptions;
}

export function TextColumn(options: Omit<ColumnOptions, 'type'>) {
  return __Column(parseCommonColumnOptions({ ...options, type: 'string' }));
}

export function NumberColumn(options: Omit<ColumnOptions, 'type'>) {
  return __Column(parseCommonColumnOptions({ ...options, type: 'number' }));
}

export function BooleanColumn(options: Omit<ColumnOptions, 'type'>) {
  return __Column(parseCommonColumnOptions({ ...options, type: 'boolean' }));
}

export function DateColumn(options: Omit<ColumnOptions, 'type'>) {
  return __Column(
    parseCommonColumnOptions({ ...options, ...DateTransformer(), type: 'date' })
  );
}

export function ObjectColumn(options: Omit<ColumnOptions, 'type'>) {
  return __Column(
    parseCommonColumnOptions({
      ...options,
      ...ObjectTransformer(),
      type: 'object',
    })
  );
}

export function Column(
  options: ColumnOptions = { type: 'string' }
): PropertyDecorator {
  return options.type === 'string'
    ? TextColumn(options)
    : options.type === 'boolean'
    ? BooleanColumn(options)
    : options.type === 'date'
    ? DateColumn(options)
    : options.type === 'number'
    ? NumberColumn(options)
    : options.type === 'object'
    ? ObjectColumn(options)
    : TextColumn(options);
}

export type RelationOptions = {
  type: 'Owner' | 'One' | 'Many';
  target: ClassConstructor<any>;
};

export function One(target: ClassConstructor<any>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      {
        eager: true,
        nullable: true,
      }
    ),
    JoinColumn()
  );
}

export function Many(target: ClassConstructor<any>) {
  return applyDecorators(
    ManyToMany(
      () => target,
      (t) => t.id,
      {
        eager: true,
        nullable: true,
      }
    ),
    JoinTable()
  );
}

export function Owner(target: ClassConstructor<any>) {
  return applyDecorators(
    ManyToOne(
      () => target,
      (t) => t.id,
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    ),
    JoinColumn()
  );
}

export function Relation(options: RelationOptions) {
  return options.type === 'Many'
    ? Many(options.target)
    : options.type === 'One'
    ? One(options.target)
    : Owner(options.target);
}
