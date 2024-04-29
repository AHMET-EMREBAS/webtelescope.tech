import { Model } from './model.meta';

/**
 * Relation type of of Many, One, Owner
 */
export enum RelationType {
  Many = 'Many',
  One = 'One',
  Owner = 'Owner',
}

export type RelationOptions = {
  name?: string;
  /**
   * Type of the relation {@link RelationType}
   */
  type: RelationType;

  required?: boolean;

  /**
   * Model options of the relation class
   * @internal
   */
  model: Model;

  description?: string;
};
