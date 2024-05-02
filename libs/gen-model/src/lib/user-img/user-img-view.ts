import { IID } from '@webpackages/common';
export interface IUserImgView extends IID {
  /**
   * Image url
   */
  url: string;
  description: string;
  userUsername: string;
}
