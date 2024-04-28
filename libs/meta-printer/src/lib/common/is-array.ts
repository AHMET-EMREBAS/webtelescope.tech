import {
  ColumnOptions,
  PropertyOptions,
  RelationOptions,
  RelationType,
} from '@webpackages/meta';

export function isPropertyArray(options: PropertyOptions) {
  return options.isArray ? true : false;
}

export function isRelationArray(options: RelationOptions) {
  return options.type === RelationType.Many ? true : false;
}

export function isColumnArray(options: ColumnOptions) {
  return options.isArray ? true : false;
}
