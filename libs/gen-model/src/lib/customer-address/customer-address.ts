import { IID } from '@webpackages/common';
export interface ICustomerAddress<TCustomer> {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  customer: TCustomer;
}