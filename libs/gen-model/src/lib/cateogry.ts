import { Model, UniqueNameProperty } from '@webpackages/meta';

export function Category(): Model {
  return {
    modelName: 'Category',
    properties: {
      name: UniqueNameProperty(),
    },
  };
}
