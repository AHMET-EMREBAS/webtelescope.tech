import { IID } from '@webpackages/common';
export interface ISku {
  barcode: string;
  sku: string;
  /**
   * Required unique short text
   */ name: string;
  description?: string;
  product: TProduct;
}
