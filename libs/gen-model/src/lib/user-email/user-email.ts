import { IID } from '@webpackages/common';
export interface IUserEmail<TUser = IID> extends IID {
  email?: string;
  user: TUser;
}
