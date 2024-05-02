import { IID } from '@webpackages/common';
export interface IProductImg<TProduct> {
  /**
   * Image url
   */
  url: string;
  description?: string;
  owner: TProduct;
}
