import { names } from '@webpackages/utils';
import { Model, OwnerRelation, ShortTextProperty } from './core';

export function CreateProfileModelFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Profile`,
    properties: {
      firstName: ShortTextProperty(),
      lastName: ShortTextProperty(),
    },
    relations: {
      [names(model.modelName).propertyName]: OwnerRelation(model),
    },
  };
}
