import { RelationProperty } from '../meta';

export function OwnerRelation<T extends string>(target: T): RelationProperty {
  return {
    type: 'Owner',
    target,
  };
}

export function OneRelation<T extends string>(target: T): RelationProperty {
  return {
    type: 'One',
    target,
  };
}

export function ManyRelation<T extends string>(target: T): RelationProperty {
  return {
    type: 'Many',
    target,
  };
}
