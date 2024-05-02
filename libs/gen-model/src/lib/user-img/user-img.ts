import { IID } from '@webpackages/common';
export interface IUserImg<TUser = IID> {
  /**
   * Image url
   */
  url: string;
  description?: string;
  user: TUser;
}
