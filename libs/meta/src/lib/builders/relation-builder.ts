import { RelationOptions } from '../meta';

export function OwnerRelation<T extends string>(target: T): RelationOptions {
  return {
    type: 'Owner',
    target,
  };
}

export function OneRelation<T extends string>(target: T): RelationOptions {
  return {
    type: 'One',
    target,
  };
}

export function ManyRelation<T extends string>(target: T): RelationOptions {
  return {
    type: 'Many',
    target,
  };
}
