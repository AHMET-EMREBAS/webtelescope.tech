import { IID } from '@webpackages/common';
export interface IUpdateCustomerAddressDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  customer?: IID;
}
