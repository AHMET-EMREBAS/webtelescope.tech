import { IID } from '@webpackages/common';
export interface ICustomerEmail<TCustomer> {
  email?: string;
  customer: TCustomer;
}
