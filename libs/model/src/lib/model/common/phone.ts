import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param phone {@link phone}
 * @param user {@link User}
 */
export interface IPhone<User extends IID> {
  phone: string;
  user: User;
}
