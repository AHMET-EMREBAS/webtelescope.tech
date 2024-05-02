import { IID } from '@webpackages/common';
export interface ICustomerProfile<TCustomer> {
  firstName?: string;
  lastName?: string;
  customer: TCustomer;
}
