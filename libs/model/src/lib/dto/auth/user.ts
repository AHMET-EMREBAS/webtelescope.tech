import { IID } from '../../common';
import { IUser } from '../../model';

/**
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param isAdmin {@link isAdmin}
 * @param isRoot {@link isRoot}
 * @param organization {@link organization}
 * @param roles  {@link roles}
 */
export interface ICreateUserDto<Organization extends IID, Role extends IID>
  extends Pick<
    IUser<Organization, Role>,
    'username' | 'roles' | 'organization' | 'password'
  > {}
