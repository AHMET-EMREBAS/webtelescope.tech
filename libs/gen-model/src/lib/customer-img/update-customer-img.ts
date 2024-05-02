import { IID } from '@webpackages/common';
export interface IUpdateCustomerImgDto {
  /**
   * Image url
   */
  url?: string;
  description?: string;
  customer?: IID;
}
