import { IID } from '@webpackages/common';
export interface IOrder<TSku, TCart> {
  quantity: number;
  discount?: number;
  total: number;
  subTotal: number;
  tax: number;
  /**
   * Order description or notes
   */
  description?: string;
  sku: TSku;
  cart: TCart;
}
