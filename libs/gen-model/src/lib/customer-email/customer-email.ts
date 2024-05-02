import { IID } from '@webpackages/common';
export interface ICustomerEmail<TCustomer = IID> extends IID {
  email?: string;
  customer: TCustomer;
}
