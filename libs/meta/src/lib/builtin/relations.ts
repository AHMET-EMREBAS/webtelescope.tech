import { Model, RelationOptions } from '../common-imp';

export function CreateOwnerRelation(model: Model): RelationOptions {
  return {
    model,
    relationType: 'Owner',
    required: true,
  };
}
