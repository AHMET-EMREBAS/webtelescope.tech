import { IID } from '@webpackages/common';
export interface ICreateCustomerAddressDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  customer: IID;
}
