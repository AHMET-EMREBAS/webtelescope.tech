import { Model, ShortTextProperty } from './core';

export function CreateProfileModelFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Profile`,
    properties: {
      firstName: ShortTextProperty(),
      lastName: ShortTextProperty(),
    },
  };
}
