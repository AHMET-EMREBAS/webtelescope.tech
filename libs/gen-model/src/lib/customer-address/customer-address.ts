import { IID } from '@webpackages/common';
export interface ICustomerAddress<TCustomer = IID> extends IID {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  customer: TCustomer;
}
