import { BooleanProperty, Model, OwnerRelation } from './core';

export function CreateLikeModelFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Like`,
    properties: {
      like: BooleanProperty({ inputType: 'like-button' }),
    },
    relations: {
      owner: OwnerRelation(model),
    },
  };
}
