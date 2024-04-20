/**
 * @goal create, update, and delete relations of an entity
 * @example considering the product and category table, entityId is the product id, relationName is category, and relationId is the category id.
 */
export interface IRelationDto {
  /**
   * The entity id
   */
  entityId: number;
  /**
   * The associated relation property in the entity such as category, department etc.
   */
  relationName: string;
  /**
   * The id of the associated relation entity
   */
  relationId: number;
}
