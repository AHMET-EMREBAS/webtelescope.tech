import { IID, ITimestamp } from '../../common';

/**
 * User session
 * Upon successful login, a session is created for the user.
 * - User can access allowed resources by the session.
 * - Session does not contain any user data except permissions.
 * - A user might have multiple sessions
 * User
 */
export interface ISession extends IID, ITimestamp {
  /**
   * Generated device id
   */
  deviceId: string;

  /**
   * A set of permission strings
   */
  permissions: string[];
}
