import { IID } from '../../common';
import { IUser } from '../../model';

/**
 * The User' manager is able to create new users. After creating user, an invitation email/text is sent to the user.
 * Then the user updates his password and profile.
 * The organization name is gotten from the manager's account, so it should not be included here.
 * @param username {@link ICredentials.username}
 * @param roles  {@link roles}
 */
export interface ICreateUserDto<Organization extends IID, Role extends IID>
  extends Pick<IUser<Organization, Role>, 'username' | 'roles'> {}
