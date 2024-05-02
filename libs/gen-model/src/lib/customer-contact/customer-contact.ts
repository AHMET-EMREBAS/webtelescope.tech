import { IID } from '@webpackages/common';
export interface ICustomerContact {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  owner: TCustomer;
}
