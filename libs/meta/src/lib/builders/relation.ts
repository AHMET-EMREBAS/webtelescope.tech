import { Model, RelationOptions, RelationType } from '../common-imp';

export function OwnerRelation(model: Model): RelationOptions {
  return { relationType: RelationType.Owner, model, required: true };
}

export function OneRelation(model: Model): RelationOptions {
  return { relationType: RelationType.One, model };
}

export function ManyRelation(model: Model): RelationOptions {
  return { relationType: RelationType.Many, model };
}
