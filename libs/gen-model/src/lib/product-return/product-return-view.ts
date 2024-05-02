import { IID } from '@webpackages/common';
export interface IProductReturnView extends IID {
  description: string;
  quantity: number;
  orderQuantity: number;
  orderDiscount: number;
  orderTotal: number;
  orderSubTotal: number;
  orderTax: number;
  orderDescription: string;
  userUsername: string;
}
