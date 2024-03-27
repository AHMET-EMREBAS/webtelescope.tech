/**
 * If you want to control the status of an entity (active|passive), then implement this interface.
 *
 * @param active {@link active}
 */
export interface IActive {
  /**
   * Is entity active?
   */
  active: boolean;
}
