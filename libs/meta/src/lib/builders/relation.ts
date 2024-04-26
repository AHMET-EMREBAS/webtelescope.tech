import { Model, RelationOptions, RelationType } from '../meta';

export function OwnerRelation(model: Model): RelationOptions {
  return { type: RelationType.Owner, required: true, model };
}

export function OneRelation(model: Model): RelationOptions {
  return { type: RelationType.One, model };
}

export function ManyRelation(model: Model): RelationOptions {
  return { type: RelationType.Many, model };
}
