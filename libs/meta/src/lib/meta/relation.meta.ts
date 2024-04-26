export enum RelationType {
  Many = 'Many',
  One = 'One',
  Owner = 'Owner',
}

export type RelationOptions<T extends string = string, Model = unknown> = {
  /**
   * Type of the relation {@link RelationType}
   */
  type: RelationType;

  /**
   * Relation class name. For example, Category, Department
   */
  target: T;

  required?: boolean;

  /**
   * Model options of the relation class
   * @internal
   */
  model?: Model;
};
