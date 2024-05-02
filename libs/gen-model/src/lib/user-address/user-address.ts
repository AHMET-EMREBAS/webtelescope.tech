import { IID } from '@webpackages/common';
export interface IUserAddress<TUser = IID> extends IID {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  user: TUser;
}
