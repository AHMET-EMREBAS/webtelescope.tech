/**
 * If you want to trace the user who created this entity, then implements this interface
 * @param createdBy {@link createdBy}
 */
export interface ICreatedBy {
  /**
   * Store the id of the user who created this entity
   */
  createdBy: number;
}
