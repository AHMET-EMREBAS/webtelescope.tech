import { IID } from '@webpackages/common';
export interface IUpdateUserAddressDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  user?: IID;
}
