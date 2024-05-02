import { IID } from '@webpackages/common';
export interface ICustomerPhone<TCustomer = IID> {
  phone?: string;
  customer: TCustomer;
}
