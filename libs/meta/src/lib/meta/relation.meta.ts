export enum RelationType {
  Many = 'Many',
  One = 'One',
  Owner = 'Owner',
}

export type RelationOptions<T extends string = string, Model = unknown> = {
  type: RelationType;
  target: T;
  required?: boolean;
  model?: Model;
};
