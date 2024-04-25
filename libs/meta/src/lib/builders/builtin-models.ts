import { Model } from '../meta';
import { UniqueNameProperty } from './property-builder';

export function CategoryModel(modelName = 'Category'): Model {
  return {
    modelName,
    properties: {
      name: UniqueNameProperty(),
    },
  };
}

export function DepartmentModel(): Model {
  return CategoryModel('Department');
}

export function PriceLevelModel(): Model {
  return CategoryModel('PriceLevel');
}

export function StoreModel(): Model {
  return CategoryModel('Store');
}

export function LikeModel<T extends string>(
  target: T,
  modelName = 'Like'
): Model {
  return {
    modelName,
    relations: {
      target: {
        type: 'Owner',
        target,
      },
    },
  };
}

export function DislikeModel<T extends string>(
  target: T,
  modelName = 'Like'
): Model {
  return {
    modelName,
    relations: {
      target: {
        type: 'Owner',
        target,
      },
    },
  };
}
