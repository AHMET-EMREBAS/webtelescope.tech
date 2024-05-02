import { IID } from '@webpackages/common';
export interface ISku<TProduct = IID> extends IID {
  barcode: string;
  sku: string;
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
  product: TProduct;
}
