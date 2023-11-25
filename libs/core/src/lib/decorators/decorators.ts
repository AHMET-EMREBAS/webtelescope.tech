/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassType, combinePropertyDecorators } from '@webpackages/util';
import {
  Column as __Column,
  ColumnOptions,
  EntityOptions,
  Entity as __Entity,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

export function Entity(options?: EntityOptions) {
  return __Entity(options);
}

export function Column(options: ColumnOptions) {
  return __Column(options);
}

export type RelationOptions = {
  type: 'owner' | 'sub' | 'subs';
  target: ClassType<any>;
};

export function Relation(options: RelationOptions) {
  const decorators: PropertyDecorator[] = [];

  const { target, type } = options;

  if (type === 'owner' || type === 'sub') {
    decorators.push(JoinColumn());
  } else {
    decorators.push(JoinTable());
  }

  if (type === 'owner') {
    decorators.push(
      ManyToOne(
        () => target,
        (d) => d.id,
        { onDelete: 'CASCADE' }
      )
    );
  } else if (type === 'sub') {
    decorators.push(
      ManyToOne(
        () => target,
        (d) => d.id,
        { eager: true }
      )
    );
  } else if (type === 'subs') {
    decorators.push(
      ManyToMany(
        () => target,
        (d) => d.id,
        { eager: true }
      )
    );
  }

  return combinePropertyDecorators(...decorators);
}
