import { UniqueNameProperty } from '../common';
import { ModelMeta } from '../meta';

export const CategoryModel: ModelMeta = {
  name: 'Category',
  properties: {
    name: UniqueNameProperty(),
  },
};
