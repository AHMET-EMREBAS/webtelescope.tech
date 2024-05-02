import { IID } from '@webpackages/common';
export interface IUserAddressView extends IID {
  state: string;
  city: string;
  street: string;
  zip: string;
  userUsername: string;
}
