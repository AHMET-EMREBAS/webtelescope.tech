import { IID } from '@webpackages/common';
export interface ICustomerPhone<TCustomer = IID> extends IID {
  phone?: string;
  customer: TCustomer;
}
