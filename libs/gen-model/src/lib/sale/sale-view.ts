import { IID } from '@webpackages/common';
export interface ISaleView extends IID {
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  cartDescription: string;
  cartChecked: boolean;
  customerUsername: string;
}
