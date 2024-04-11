import { ICredentials, IID } from '../../common';
import { IOrg } from './org';
import { IPermission } from './permission';
import { IRole } from './role';

/**
 * The user interface contains the user information, credentials, permissions.
 * The user interface allows us to establish a policy and procedures across the application
 * @param id {@link IID.id}
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param organization {@link Org}
 * @param roles {@link Role}
 */
export interface IUser<Org = IOrg, Role = IRole<IPermission>>
  extends ICredentials,
    IID {
  /**
   * The organization to which the user belongs
   */
  organization: Org;

  /**
   * Assigned roles for the user
   */
  roles: Role[];
}
