import { IID } from '@webpackages/common';
export interface IUserProfile<TUser> {
  firstName?: string;
  lastName?: string;
  user: TUser;
}
