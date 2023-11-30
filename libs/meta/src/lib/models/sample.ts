import { ModelMeta } from '../meta';

export const SampleModel: ModelMeta = {
  name: 'Sample',
  properties: {
    name: {
      name: 'name',
      type: 'string',
      icon: 'info',
      label: 'Name',
      inputType: 'text-input',
      minLength: 3,
      maxLength: 50,
      unique: true,
      required: true,
    },
  },
  relations: {},
};
