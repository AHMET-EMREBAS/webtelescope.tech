import { Model, RelationType } from '../meta';

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
      text: { type: 'string', required: true },
      num: { type: 'number', required: true },
      bool: { type: 'boolean', required: true },
      date: { type: 'date', required: true },
      list: { type: 'string', isArray: true },
      enumValue: { type: 'string', enums: ['first', 'second'] },
    },
    relations: {
      category: {
        type: RelationType.Many,
        model: {
          modelName: 'Category',
          properties: { name: { type: 'string' } },
        },
      },
    },
  };
}