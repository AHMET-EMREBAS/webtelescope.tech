import { Model } from '../common-imp';
import { DescriptionProperty, UniqueNameProperty } from './properties';

export function NameModel(modelName: string): Model {
  return {
    modelName,
    properties: {
      name: UniqueNameProperty(),
    },
  };
}

export function NameAndDescriptionModel(modelName: string): Model {
  return {
    modelName,
    properties: {
      name: UniqueNameProperty(),
      description: DescriptionProperty(),
    },
  };
}




