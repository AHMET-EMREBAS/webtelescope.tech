import { IID } from '@webpackages/common';
export interface ICreateProductImgDto {
  /**
   * Image url
   */
  url: string;
  description?: string;
  product: IID;
}
