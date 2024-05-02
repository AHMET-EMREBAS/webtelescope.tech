import { IID } from '@webpackages/common';
export interface ICreateOrderDto {
  quantity: number;
  discount?: number;
  total: number;
  subTotal: number;
  tax: number;
  /**
   * Order description or notes
   */
  description?: string;
  sku: IID;
  cart: IID;
}
