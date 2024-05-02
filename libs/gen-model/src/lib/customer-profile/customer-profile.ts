import { IID } from '@webpackages/common';
export interface ICustomerProfile<TCustomer = IID> {
  firstName?: string;
  lastName?: string;
  customer: TCustomer;
}
