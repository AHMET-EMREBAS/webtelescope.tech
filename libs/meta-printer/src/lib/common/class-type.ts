/**
 * A database entity has 3 or 4 major classes, entity, view, and data-transfer objects, maybe subscribers.
 * The main goal of this enum is to determine the printer context.
 */
export enum ClassType {
  /**
   * Entity class
   */
  Entity,

  /**
   * View class
   */
  View,

  /**
   *  Data transfer object for create
   */
  Create,
  /**
   *  Data transfer object for update
   */
  Update,
  /**
   *  Query object of the entity
   */
  Query,

  /**
   * Entity interface for frontend usage
   */
  IEntity,
  /**
   * View interface for frontend usage
   */
  IView,

  /**
   * Create-Dto interface for frontend usage
   */
  ICreate,
  /**
   * Update-Dto interface for frontend usage
   */
  IUpdate,
  /**
   * Query-Dto interface for frontend usage
   */
  IQuery,
}
