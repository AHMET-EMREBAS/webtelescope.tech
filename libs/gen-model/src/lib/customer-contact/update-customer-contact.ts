import { IID } from '@webpackages/common';
export interface IUpdateCustomerContactDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  customer?: IID;
}