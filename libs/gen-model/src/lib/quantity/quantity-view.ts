import { IID } from '@webpackages/common';
export interface IQuantityView extends IID {
  /**
   * Quantity of the Product-Sku in the store.
   */
  quanitty: number;
  skuBarcode: string;
  skuSku: string;
  skuName: string;
  skuDescription: string;
  storeName: string;
}
