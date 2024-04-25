export type RelationType = 'Many' | 'One' | 'Owner';

export type RelationProperty<T extends string = string> = {
  type: RelationType;
  target: T;
};
