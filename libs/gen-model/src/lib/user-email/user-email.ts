import { IID } from '@webpackages/common';
export interface IUserEmail<TUser> {
  email?: string;
  ownwer: TUser;
}
