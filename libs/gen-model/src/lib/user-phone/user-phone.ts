import { IID } from '@webpackages/common';
export interface IUserPhone<TUser = IID> {
  phone?: string;
  user: TUser;
}
