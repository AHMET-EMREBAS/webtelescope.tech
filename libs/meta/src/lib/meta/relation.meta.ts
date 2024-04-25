export type RelationType = 'Many' | 'One' | 'Owner';

export type RelationProperty<T extends string = string, Model = unknown> = {
  type: RelationType;
  target: T;
  requried?: boolean;
  model?: Model;
};
