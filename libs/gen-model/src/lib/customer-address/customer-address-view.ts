import { IID } from '@webpackages/common';
export interface ICustomerAddressView extends IID {
  state: string;
  city: string;
  street: string;
  zip: string;
  customerUsername: string;
}
