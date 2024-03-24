/**
 * If you want to trace the user who read this entity, then implements this interface
 * @param readBy {@link readBy}
 */
export interface IReadBy {
  /**
   * Store the id of the user who created this entity
   */
  readBy: number;
}
