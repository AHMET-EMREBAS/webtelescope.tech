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
      owner: OwnerRelation(userModel),
      target: OwnerRelation(target),
    },
  };
}
