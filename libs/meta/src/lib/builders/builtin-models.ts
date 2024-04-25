import { Model } from '../meta';
import {
  DateOfBirthProperty,
  DefaultBooleanProperty,
  PositiveNumberProperty,
  ShortString,
  UniqueNameProperty,
} from './property-builder';
/**
 * @param text
 * @param num
 * @param bool
 * @param date
 * @param list
 * @param enumValue
 * @param category
 * @param modelName
 * @returns
 */
export function TestModel(modelName = 'Category'): Model {
  return {
    modelName,
    properties: {
      text: ShortString({ required: true }),
      num: PositiveNumberProperty(),
      bool: DefaultBooleanProperty(),
      date: DateOfBirthProperty(),
      list: { type: 'string', isArray: true },
      enumValue: { type: 'string', enums: ['first', 'second'] },
    },
    relations: {
      category: {
        target: 'Category',
        type: 'Many',
        model: CategoryModel(),
      },
    },
  };
}

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
