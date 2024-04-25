import { DescriptionProperty, UniqueNameProperty } from './property-builder';
import { Model } from '../meta/model.meta';

/**
 * Model with a single property name
 * @param modelName
 * @param extending
 * @returns
 */
export function NameModel<T extends string>(
  modelName: T,
  extending?: Model['properties']
): Model {
  return {
    modelName,
    properties: {
      name: UniqueNameProperty(),
      ...extending,
    },
  };
}

/**
 * Model with name and description properties
 * @param modelName
 * @returns
 */
export function NameAndDescriptionModel<T extends string>(modelName: T): Model {
  return NameModel(modelName, { description: DescriptionProperty() });
}
