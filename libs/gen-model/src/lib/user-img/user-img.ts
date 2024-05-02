import { IID } from '@webpackages/common';
export interface IUserImg {
  /**
   * Image url
   */ url: string;
  description?: string;
  owner: TUser;
}
