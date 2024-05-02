import { IID } from '@webpackages/common';
export interface ICustomerEmail<TCustomer> {
  email?: string;
  ownwer: TCustomer;
}
