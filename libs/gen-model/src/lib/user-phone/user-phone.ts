import { IID } from '@webpackages/common';
export interface IUserPhone<TUser> {
  email?: string;
  ownwer: TUser;
}
