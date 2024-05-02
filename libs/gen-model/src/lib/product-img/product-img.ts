import { IID } from '@webpackages/common';
export interface IProductImg<TProduct = IID> {
  /**
   * Image url
   */
  url: string;
  description?: string;
  product: TProduct;
}
