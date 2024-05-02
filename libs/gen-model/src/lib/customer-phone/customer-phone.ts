import { IID } from '@webpackages/common';
export interface ICustomerPhone<TCustomer> {
  phone?: string;
  customer: TCustomer;
}
