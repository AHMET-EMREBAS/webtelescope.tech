import { IID } from '../../common';
import { ICredentials } from '../../dto/auth';

/**
 * The user interface contains the user information, credentials, permissions.
 * The user interface allows us to establish a policy and procedures across the application
 * @param id {@link IID.id}
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param organization {@link Organization}
 * @param roles {@link Role}
 */
export interface IUser<Organization, Role> extends ICredentials, IID {
  /**
   * The organization to which the user belongs
   */
  organization: Organization;

  /**
   * Assigned roles for the user
   */
  roles: Role[];
}
