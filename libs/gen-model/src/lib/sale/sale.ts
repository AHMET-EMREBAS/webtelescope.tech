import { IID } from '@webpackages/common';
export interface ISale {
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
  cart: TCart;
  customer: TCustomer;
}
