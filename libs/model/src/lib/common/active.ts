/**
 * If you want to control the status of an entity (active|passive), then implement this interface.
 */
export interface IActive {
  /**
   * Is entity active?
   */
  active: boolean;
}
