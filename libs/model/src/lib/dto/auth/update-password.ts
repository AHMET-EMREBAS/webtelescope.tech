import { ICredentials } from './credentials';

/**
 * Users send the information to the server to update their password
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param newPassword
 *
 */
export interface IUpdatePassword
  extends Pick<ICredentials, 'username' | 'password'> {
  /**
   * Updated password the password constraints are the same as the password.
   */
  newPassword: string;
}
