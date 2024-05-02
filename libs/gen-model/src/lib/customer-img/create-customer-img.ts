import { IID } from '@webpackages/common';
export interface ICreateCustomerImgDto {
  /**
   * Image url
   */
  url: string;
  description?: string;
  owner: IID;
}
