import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param email {@link email}
 * @param user {@link User}
 */
export interface IEmail<User extends IID> {
  /**
   * Email address that belongs to the user
   */
  email: string;

  /**
   * The user who owns the email address.
   */
  user: User;
}
