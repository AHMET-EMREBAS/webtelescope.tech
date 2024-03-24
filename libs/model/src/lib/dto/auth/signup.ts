import { ICredentials } from './credentials';

/**
 * Users send the information to the server to create an organization. Organization is an entity that stores all subscription details
 *
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param organization
 */
export interface ISignup extends ICredentials {
  /**
   * Name of the organization that the user belongs to. It is unique and in name format, 3 to 30 characters.
   */
  organization: string;
}
