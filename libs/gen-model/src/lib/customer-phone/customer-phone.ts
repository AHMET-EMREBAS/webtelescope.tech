import { IID } from '@webpackages/common';
export interface ICustomerPhone<TCustomer> {
  email?: string;
  ownwer: TCustomer;
}
