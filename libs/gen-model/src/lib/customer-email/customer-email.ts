import { IID } from '@webpackages/common';
export interface ICustomerEmail<TCustomer = IID> {
  email?: string;
  customer: TCustomer;
}
