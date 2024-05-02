import { Model, ShortTextProperty } from './core';

export function CreateDepartmentFor(modelName: string): Model {
  return {
    modelName,
    properties: {
      name: ShortTextProperty({ unique: true, required: true }),
    },
  };
}
