import { Model } from '@webpackages/meta';

export const CategoryMeta: Model = {
  modelName: 'Category',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
      required: true,
      inputType: 'text',
      unique: true,
    },
  },
};
