import { IID } from '@webpackages/common';
export interface IUserProfile<TUser = IID> {
  firstName?: string;
  lastName?: string;
  user: TUser;
}
