import { IID } from '@webpackages/common';
export interface IUserEmail<TUser = IID> {
  email?: string;
  user: TUser;
}
