import { IID } from '@webpackages/common';
export interface ICustomerProfile<TCustomer = IID> extends IID {
  firstName?: string;
  lastName?: string;
  customer: TCustomer;
}
