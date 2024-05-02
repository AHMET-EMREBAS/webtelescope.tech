import { IID } from '@webpackages/common';
export interface IUserContact {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  owner: TUser;
}
