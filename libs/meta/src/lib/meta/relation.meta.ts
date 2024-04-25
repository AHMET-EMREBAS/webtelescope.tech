export type RelationType = 'Many' | 'One' | 'Owner';

export type RelationOptions<T extends string = string, Model = unknown> = {
  type: RelationType;
  target: T;
  requried?: boolean;
  model?: Model;
};
