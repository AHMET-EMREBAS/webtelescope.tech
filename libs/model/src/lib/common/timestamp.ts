/**
 * Implements this interface whenever the entity needs timestamps properties
 * @param createdAt {@link createdAt}
 * @param updatedAt {@link updatedAt}
 * @param deletedAt {@link deletedAt}
 */
export interface ITimestamp {
  /**
   * Generated property on create
   */
  createdAt: Date;
  /**
   * Generated property on update
   */
  updatedAt: Date;
  /**
   * Generated property on soft-delete
   */
  deletedAt: Date;
}
