import { IID } from '@webpackages/common';
export interface IUserProfile<TUser = IID> extends IID {
  firstName?: string;
  lastName?: string;
  user: TUser;
}
