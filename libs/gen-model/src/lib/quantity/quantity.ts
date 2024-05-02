import { IID } from '@webpackages/common';
export interface IQuantity<TSku, TStore> {
  /**
   * Quantity of the Product-Sku in the store.
   */ quanitty: number;
  sku: TSku;
  store: TStore;
}
