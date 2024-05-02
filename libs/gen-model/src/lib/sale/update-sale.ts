import { IID } from '@webpackages/common';
export interface IUpdateSaleDto {
  total?: number;
  subtotal?: number;
  tax?: number;
  discount?: number;
  cart?: IID;
  customer?: IID;
}
