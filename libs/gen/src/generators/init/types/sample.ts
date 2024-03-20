import { Model } from './model';

export const Sample: Model = {
  type: 'Entity',
  properties: {
    name: {
      ui: {
        inputType: 'text',
      },
      validation: {
        type: 'string',
        format: 'ean',
      },
    },
  },
  relations: {
    name: {
      type: 'Many',
      target: 'Category',
    },
  },

  required: ['name', 'category'],
  array: [],
  unique: ['name'],
};
