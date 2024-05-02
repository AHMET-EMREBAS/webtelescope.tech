import { IID } from '@webpackages/common';
export interface IUserPhone<TUser = IID> extends IID {
  phone?: string;
  user: TUser;
}
