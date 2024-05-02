import { names } from '@webpackages/utils';
import { LongTextProperty, Model, OwnerRelation } from './core';

export function CreateCommentModelFor(userModel: Model, target: Model): Model {
  return {
    modelName: `${target.modelName}Comment`,
    properties: {
      comment: LongTextProperty({
        description: `${target.modelName} comment`,
        icon: 'comment',
      }),
    },
    relations: {
      [names(userModel.modelName).propertyName]: OwnerRelation(userModel),
      [names(target.modelName).propertyName]: OwnerRelation(target),
    },
  };
}
