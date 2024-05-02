import { IID } from '@webpackages/common';
export interface IUserImg<TUser> {
  /**
   * Image url
   */
  url: string;
  description?: string;
  user: TUser;
}
