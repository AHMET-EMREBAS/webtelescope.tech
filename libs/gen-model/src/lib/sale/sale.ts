import { IID } from '@webpackages/common';
export interface ISale<TCart = IID, TCustomer = IID> {
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
  cart: TCart;
  customer: TCustomer;
}
