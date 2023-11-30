import { UniqueNameProperty } from '../common';
import { ModelMeta } from '../meta';

export const SampleModel: ModelMeta = {
  name: 'Sample',
  properties: {
    name: UniqueNameProperty(),
  },
  relations: {
    category: {
      name: 'category',
      target: 'Category',
      type: 'sub',
      views: {
        name: 'category',
      },
    },
  },
};
