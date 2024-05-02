import { names } from '@webpackages/utils';
import { BooleanProperty, Model, OwnerRelation } from './core';

export function CreateLikeModelFor(model: Model, target: Model): Model {
  return {
    modelName: `${model.modelName}Like`,
    properties: {
      like: BooleanProperty({ inputType: 'like-button' }),
    },
    relations: {
      [names(model.modelName).propertyName]: OwnerRelation(model),
      [names(target.modelName).propertyName]: OwnerRelation(target),
    },
  };
}
