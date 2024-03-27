import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param profileLink {@link profileLink}
 */
export interface ISocialProfile<User extends IID> extends IID {
  profileLink: string;
  user:User
}
