import { IID } from '@webpackages/common';
export interface ICustomerImgView extends IID {
  /**
   * Image url
   */
  url: string;
  description: string;
  customerUsername: string;
}
