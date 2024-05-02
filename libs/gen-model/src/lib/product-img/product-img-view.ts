import { IID } from '@webpackages/common';
export interface IProductImgView extends IID {
  /**
   * Image url
   */
  url: string;
  description: string;
  productBarcode: string;
  productName: string;
  productDescription: string;
}
