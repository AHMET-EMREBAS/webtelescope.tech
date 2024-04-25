import { Model } from '../meta';
import { CategoryModel } from './builtin-models';
import {
  DateOfBirthProperty,
  DefaultBooleanProperty,
  PositiveNumberProperty,
  ShortString,
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
      text: ShortString(),
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
