import { names } from '@webpackages/utils';
import {
  DescriptionProperty,
  LongTextProperty,
  Model,
  OwnerRelation,
} from './core';

export function CreateImageModelFor(model: Model): Model {
  return {
    modelName: `${model.modelName}Img`,
    properties: {
      url: LongTextProperty({
        format: 'url',
        required: true,
        description: 'Image url',
        icon: 'url',
        inputType: 'url',
      }),
      description: DescriptionProperty(),
    },
    relations: {
      [names(model.modelName).propertyName]: OwnerRelation(model),
    },
  };
}
