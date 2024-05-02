import { IID } from '@webpackages/common';
export interface ICreateQuantityDto {
  /**
   * Quantity of the Product-Sku in the store.
   */
  quanitty: number;
  sku: IID;
  store: IID;
}
