import { IID } from '@webpackages/common';
export interface ICreateSaleDto {
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
  cart: IID;
  customer: IID;
}
