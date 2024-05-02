import { IID } from '@webpackages/common';
export interface ICreateUserAddressDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  user: IID;
}
