/**
 * If you want to trace the user who updates this entity, then implements this interface
 * @param updatedBy {@link updatedBy}
 */
export interface IUpdatedBy {
  /**
   * Store the id of the user who updated this entity
   */
  updatedBy: number;
}
