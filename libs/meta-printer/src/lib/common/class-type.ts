/**
 * A database entity has 3 or 4 major classes, entity, view, and data-transfer objects, maybe subscribers.
 * The main goal of this enum is to determine the printer context.
 */
export enum ClassType {
  /**
   * Entity class
   */
  Entity = '#',

  /**
   * View class
   */
  View = '#View',

  /**
   *  Data transfer object for create
   */
  Create = 'Create#Dto',
  /**
   *  Data transfer object for update
   */
  Update = 'Update#Dto',
  /**
   *  Query object of the entity
   */
  Query = 'Query#Dto',

  /**
   * Entity interface for frontend usage
   */
  IEntity = 'I#',
  /**
   * View interface for frontend usage
   */
  IView = 'I#View',

  /**
   * Create-Dto interface for frontend usage
   */
  ICreate = 'ICreate#Dto',
  /**
   * Update-Dto interface for frontend usage
   */
  IUpdate = 'IUpdate#Dto',
  /**
   * Query-Dto interface for frontend usage
   */
  IQuery = 'IQuery#Dto',
}
