import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param user {@link User}
 * @param resumeName {@link resumeName}
 */
export interface IResume<User extends IID> {
  resumeName: string;
  user: User;
}
