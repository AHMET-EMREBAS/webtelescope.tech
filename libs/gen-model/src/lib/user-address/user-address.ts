import { IID } from '@webpackages/common';
export interface IUserAddress<TUser> {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  user: TUser;
}
